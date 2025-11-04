"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateTasks, saveTasks, createProject } from "../lib/api";

export default function TranscriptForm({ onNewTasks }) {
  const [text, setText] = useState("");
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!project.trim()) {
      alert("Please enter a project name before saving tasks.");
      return;
    }

    setLoading(true);

    // 1️⃣ Ensure project exists
    const { project: created } = await createProject(project);
    const project_id = created.id;

    // 2️⃣ Generate tasks via AI
    const data = await generateTasks(text);

    // 3️⃣ Save to Supabase linked to project
    if (data.tasks?.length) {
      const tasksWithProject = data.tasks.map((t) => ({ ...t, project_id }));
      await saveTasks(tasksWithProject);
      onNewTasks(project_id);
    }

    setLoading(false);
    setText("");
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Project Name (e.g., Marketing Sprint)"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      />
      <Textarea
        placeholder="Paste meeting transcript..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-32"
      />
      <Button onClick={handleSubmit} disabled={!text || loading}>
        {loading ? "Generating..." : "Generate & Save Tasks"}
      </Button>
    </div>
  );
}
