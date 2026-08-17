"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export function FollowUpTaskForm({ tasks, leadId }: { tasks: any[]; leadId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const pendingTasks = tasks.filter(t => t.status === "pending");
  const completedTasks = tasks.filter(t => t.status === "completed" || t.status === "cancelled");

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_task", title, dueAt }),
      });
      if (res.ok) {
        setTitle("");
        setDueAt("");
        router.refresh();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_task", taskId, status: "completed" }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white p-6 border border-[var(--line)] shadow-sm">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-4 border-b border-[var(--line)] pb-4">Follow-up Tasks</h3>
      
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-3">Pending Tasks</h4>
        <div className="space-y-3">
          {pendingTasks.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)]">No pending tasks.</p>
          ) : (
            pendingTasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 p-3 border border-[var(--line)] bg-gray-50/50">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 text-sentinel-navy focus:ring-sentinel-navy cursor-pointer" 
                  onChange={() => completeTask(task.id)}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">Due: {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : "No date set"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-6 pt-6 border-t border-[var(--line)]">
        <h4 className="text-sm font-semibold mb-3">Create Task</h4>
        <form onSubmit={addTask} className="space-y-3">
          <div>
            <Input 
              placeholder="Task description"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
              required
            />
          </div>
          <div className="flex gap-3">
            <Input 
              type="date"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              disabled={isSaving}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!title.trim() || isSaving}
              className="bg-sentinel-navy hover:bg-sentinel-navy/90 text-white whitespace-nowrap"
            >
              Add Task
            </Button>
          </div>
        </form>
      </div>

      {completedTasks.length > 0 && (
        <div className="pt-6 border-t border-[var(--line)]">
           <h4 className="text-sm font-semibold mb-3 text-[var(--ink-soft)]">Completed Tasks</h4>
           <div className="space-y-2 opacity-60">
             {completedTasks.map(task => (
               <div key={task.id} className="flex items-start gap-2 text-sm line-through">
                 <span className="text-[var(--ink-soft)]">&bull;</span>
                 <span>{task.title}</span>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
