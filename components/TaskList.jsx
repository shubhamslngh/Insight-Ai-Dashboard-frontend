"use client";
import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getTasks, patchTask, deleteTask } from "../lib/api";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

export default function TaskList({ refreshTrigger, projectId, onTasksUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  async function load() {
    if (!projectId) return;
    const data = await getTasks(projectId);
    const list = data.tasks || [];
    setTasks(list);
    if (onTasksUpdate) onTasksUpdate(list);
  }

  useEffect(() => {
    load();
  }, [refreshTrigger, projectId]);

  async function toggleComplete(id, checked) {
    await patchTask(id, { status: checked ? "completed" : "pending" });
    load();
  }

  async function remove(id) {
    await deleteTask(id);
    load();
  }

  async function editText(id, newText) {
    await patchTask(id, { text: newText });
    load();
  }

  async function editPriority(id, newPriority) {
    await patchTask(id, { priority: newPriority });
    load();
  }

  // ---------- Filtering ----------
  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const statusOk = filterStatus === "all" || t.status === filterStatus;
      const priorityOk =
        filterPriority === "all" || t.priority === filterPriority;
      return statusOk && priorityOk;
    });
  }, [tasks, filterStatus, filterPriority]);

  // ---------- Sorting ----------
  const sorted = useMemo(() => {
    const sortedList = [...filtered];
    sortedList.sort((a, b) => {
      let valA, valB;
      switch (sortKey) {
        case "priority":
          const order = { High: 3, Medium: 2, Low: 1, null: 0 };
          valA = order[a.priority] || 0;
          valB = order[b.priority] || 0;
          break;
        case "status":
          valA = a.status === "completed" ? 1 : 0;
          valB = b.status === "completed" ? 1 : 0;
          break;
        default:
          valA = new Date(a.created_at || a.createdAt);
          valB = new Date(b.created_at || b.createdAt);
      }
      return sortDir === "asc" ? valA - valB : valB - valA;
    });
    return sortedList;
  }, [filtered, sortKey, sortDir]);

  const badgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {/* ---------- Controls ---------- */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortKey} onValueChange={setSortKey}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Creation Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}>
          <ArrowUpDown className="w-4 h-4 mr-1" />
          {sortDir === "asc" ? "Asc" : "Desc"}
        </Button>
      </div>

      {/* ---------- Task List ---------- */}
      {sorted.length === 0 && (
        <p className="text-neutral-400 italic">
          No tasks found for this filter.
        </p>
      )}

      {sorted.map((t) => (
        <div
          key={t.id}
          className={`flex items-start justify-between rounded-xl border p-3 transition-all ${
            t.status === "completed"
              ? "bg-green-50 border-green-200"
              : "bg-white hover:bg-gray-50"
          }`}>
          <div className="flex gap-3 items-start">
            <Checkbox
              checked={t.status === "completed"}
              onCheckedChange={(c) => toggleComplete(t.id, c)}
            />
            <div>
              <p
                className={`font-medium ${
                  t.status === "completed"
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}>
                {t.text}
              </p>

              {/* Inline editable priority dropdown */}
              <Select
                value={t.priority || "None"}
                onValueChange={(val) =>
                  editPriority(t.id, val === "None" ? null : val)
                }>
                <SelectTrigger
                  className={`h-7 w-[110px] mt-1 text-xs ${badgeColor(
                    t.priority
                  )}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newText = prompt("Edit task:", t.text);
                if (newText && newText.trim() !== t.text)
                  editText(t.id, newText);
              }}>
              <Pencil size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => remove(t.id)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
