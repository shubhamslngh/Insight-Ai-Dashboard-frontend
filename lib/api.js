const BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function generateTasks(transcript) {
    const res = await fetch(`${BASE}/generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, with_priority: true }),
    });
    return res.json();
}

export async function getTasks(projectId) {
    const url = projectId ? `${BASE}/tasks/?project_id=${projectId}` : `${BASE}/tasks/`;
    const res = await fetch(url);
    return res.json();
}

// app/lib/api.js
export async function createProject(name) {
    const res = await fetch(`${BASE}/projects/?name=${encodeURIComponent(name)}`, {
        method: "POST"
    });
    return res.json();
}

export async function getProjects() {
    const res = await fetch(`${BASE}/projects/`);
    return res.json();
}
export async function getTasksByProject(projectId) {
    const res = await fetch(`${BASE}/tasks/?project_id=${projectId}`);
    return res.json();
}

export async function saveTasks(tasks) {
    // Accepts an array of Task-like objects
    const res = await fetch(`${BASE}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks), // array is supported by backend
    });
    return res.json();
}

export async function addTask(task) {
    // Single create
    const res = await fetch(`${BASE}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task), // single object supported
    });
    return res.json();
}

export async function patchTask(id, updates) {
    await fetch(`${BASE}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
}

export async function deleteTask(id) {
    await fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
}

