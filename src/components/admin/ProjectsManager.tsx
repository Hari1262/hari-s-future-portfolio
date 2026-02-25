import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProjects } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import ImageUpload from "./ImageUpload";
import { Plus, Trash2, Save, Loader2, Edit2, X } from "lucide-react";

const emptyProject = { title: "", subtitle: "", description: "", tags: [] as string[], image_url: "", github_url: "", demo_url: "", color: "from-accent/20 to-accent/5" };

const ProjectsManager = () => {
  const { data: projects } = useProjects();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["projects"] });

  const startEdit = (p: any) => {
    setEditing(p.id);
    setForm({ title: p.title, subtitle: p.subtitle, description: p.description, tags: p.tags || [], image_url: p.image_url || "", github_url: p.github_url || "", demo_url: p.demo_url || "", color: p.color || "" });
    setTagsInput((p.tags || []).join(", "));
  };

  const startNew = () => {
    setEditing("new");
    setForm(emptyProject);
    setTagsInput("");
  };

  const handleSave = async () => {
    setSaving(true);
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const data = { ...form, tags };

    if (editing === "new") {
      await supabase.from("projects").insert({ ...data, sort_order: (projects?.length || 0) });
    } else {
      await supabase.from("projects").update(data).eq("id", editing!);
    }
    invalidate();
    setEditing(null);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    invalidate();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-medium text-foreground">Projects</h2>
        <button onClick={startNew} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2 hover:opacity-90">
          <Plus size={14} /> Add Project
        </button>
      </div>

      {editing && (
        <div className="glass-card-elevated rounded-2xl p-6 mb-6 max-w-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-foreground">{editing === "new" ? "New Project" : "Edit Project"}</h3>
            <button onClick={() => setEditing(null)} className="p-1 text-muted-foreground hover:text-foreground"><X size={16} /></button>
          </div>
          <ImageUpload currentUrl={form.image_url} onUpload={(url) => setForm({ ...form, image_url: url })} folder="projects" />
          {[
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle" },
            { key: "github_url", label: "GitHub URL" },
            { key: "demo_url", label: "Demo URL" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
              <input value={form[key as keyof typeof form] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass} />
            </div>
          ))}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Tags (comma-separated)</label>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className={inputClass} placeholder="React, Node.js, MongoDB" />
          </div>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </button>
        </div>
      )}

      <div className="space-y-3 max-w-2xl">
        {projects?.map((p) => (
          <div key={p.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
            {p.image_url && <img src={p.image_url} alt="" className="w-16 h-16 rounded-lg object-cover" />}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm">{p.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{p.subtitle}</p>
              {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">GitHub →</a>}
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(p)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
