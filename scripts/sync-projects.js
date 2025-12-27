import admin from "firebase-admin";
import axios from "axios";
import { allProjects } from "../src/data/projects.js";

// TODO: Set up your service account key
// Option 1: Set GOOGLE_APPLICATION_CREDENTIALS environment variable
// Option 2: Import a service account JSON file and pass it to credential.cert()
// For this script, we'll assume standard Application Default Credentials or manual setup.

// Placeholder for Service Account - User needs to replace this!
// const serviceAccount = require("./serviceActions.json"); 

const PROJECT_ID = "portfolio-projects-580c6";
const GITHUB_USERNAME = "TejasRanjith";

async function initializeFirebase() {
    // Check if initialized
    if (admin.apps.length === 0) {
        let credential;

        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            // Used in GitHub Actions
            const serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            credential = admin.credential.cert(serviceAccountKey);
        } else {
            // Local development or ADC
            credential = admin.credential.applicationDefault();
        }

        admin.initializeApp({
            credential,
            projectId: PROJECT_ID
        });
    }
    return admin.firestore();
}

async function fetchGitHubRepos() {
    try {
        console.log(`Fetching repositories for ${GITHUB_USERNAME}...`);
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        return response.data;
    } catch (error) {
        console.error("Error fetching GitHub repos:", error.message);
        return [];
    }
}

async function syncProjects() {
    const db = await initializeFirebase();
    const repos = await fetchGitHubRepos();
    const batch = db.batch();
    const projectsRef = db.collection("projects");

    console.log(`Found ${repos.length} repos on GitHub.`);
    console.log(`Found ${allProjects.length} locally defined projects for enrichment.`);

    for (const repo of repos) {
        // Try to find matching local project to preserve custom data
        // Matching by normalized name or exact name
        // The local data has 'githubLink' which is the best identifier
        const localProject = allProjects.find(p =>
            p.githubLink?.toLowerCase() === repo.html_url.toLowerCase() ||
            p.title.toLowerCase() === repo.name.toLowerCase() ||
            repo.name.toLowerCase().includes(p.title.toLowerCase().replace(/\s+/g, '-'))
        );

        const projectData = {
            title: repo.name, // Default to repo name, override if local exists
            description: repo.description || "",
            githubLink: repo.html_url,
            updatedAt: admin.firestore.Timestamp.fromDate(new Date(repo.updated_at)),
            pushedAt: admin.firestore.Timestamp.fromDate(new Date(repo.pushed_at)),
            stars: repo.stargazers_count,
            language: repo.language,
            topics: repo.topics || [], // GitHub topics

            // Default fields if not present
            featured: false,
            category: "Other",
            tags: repo.topics || [],
            details: {},
            fileStructure: ""
        };

        if (localProject) {
            console.log(`Enriching ${repo.name} with local data...`);
            projectData.title = localProject.title; // Keep the pretty title
            projectData.description = localProject.description || repo.description; // Prefer local description if detailed
            projectData.featured = localProject.featured || false;
            projectData.category = localProject.category || "Other";
            projectData.fileStructure = localProject.fileStructure || "";
            projectData.details = localProject.details || {};

            // Merge tags: GitHub topics + Local tags
            const uniqueTags = new Set([...(localProject.tags || []), ...(repo.topics || [])]);
            projectData.tags = Array.from(uniqueTags);
        }

        const docRef = projectsRef.doc(repo.name); // Use repo name as ID
        batch.set(docRef, projectData, { merge: true });
    }

    await batch.commit();
    console.log("Successfully synced projects to Firestore.");
}

syncProjects().catch(console.error);
