"use client";
import { useEffect, useState } from "react";
import { getProjects, getTasksByProject } from "../lib/api";
import TranscriptForm from "../components/TranscriptForm";
import TaskList from "../components/TaskList";
import ProgressPie from "../components/ProgressPie";
import PriorityBar from "../components/PriorityBar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
interface Project {
  id: string;
  name: string;
}
export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [tasks, setTasks] = useState([]);

  // ✅ Load all projects initially
  useEffect(() => {
    getProjects().then((res) => setProjects(res.projects || []));
  }, []);

  // ✅ Handle project selection
  async function handleProjectSelect(projectId: string) {
    setSelectedProject(projectId);
    if (!projectId) {
      setTasks([]);
      return;
    }

    const res = await getTasksByProject(projectId);
    setTasks(res.tasks || []);
  }


  return (
    <main className= "px-6 py-10 max-w-5xl mx-auto space-y-10" >
    {/* Header */ }
    < header className = "space-y-1" >
      <h1 className="text-3xl font-bold tracking-tight" >
        InsightAI Dashboard
          </h1>
          < p className = "text-neutral-600" >
            Generate, group, and visualize your AI tasks by project.
        </p>
              </header>

  {/* Project Selector */ }
  <div className="flex items-center gap-4" >
    <Select onValueChange={ handleProjectSelect }>
      <SelectTrigger className="w-[250px]" >
        <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
  {
    projects.map((p) => (
      <SelectItem key= { p.id } value = { p.id } >
      { p.name }
      </SelectItem>
    ))
  }
  </SelectContent>
    </Select>

  {
    selectedProject && (
      <p className="text-sm text-neutral-500" >
        Viewing tasks for{ " "}
          < span className = "font-medium" >
          { projects.find((p) => p.id === selectedProject)?.name }
          </span>
          </p>
        )}
  </div>

  {/* Transcript + Charts */ }
  <section className="grid md:grid-cols-2 gap-8" >
    {/* Transcript submission */ }
    < div className = "rounded-2xl border p-5 bg-white/70 backdrop-blur-sm" >
      <h2 className="font-semibold mb-4" > Transcript Submission </h2>
    < TranscriptForm onNewTasks = {() => handleProjectSelect(selectedProject ?? "")
} />

  </div>

{/* Charts */ }
{/* Progress Overview */ }
{
  tasks.length > 0 && (
    <div className="rounded-2xl border p-5  bg-white/70 backdrop-blur-sm" >
      <h2 className="font-semibold mb-4" > Progress Overview </h2>
        < ProgressPie tasks = { tasks } />
          <h3 className="font-medium mt-6 mb-2" > Tasks by Priority </h3>
            < PriorityBar tasks = { tasks } />
              </div>
)
}

          </section>

{/* Task List */ }
<section className="rounded-2xl border p-5 bg-white/70 backdrop-blur-sm" >
  <h2 className="font-semibold mb-4" > Tasks </h2>
    < TaskList
refreshTrigger = { selectedProject }
projectId = { selectedProject }
onTasksUpdate = { setTasks }
  />
  </section>
  </main>
  );
}
