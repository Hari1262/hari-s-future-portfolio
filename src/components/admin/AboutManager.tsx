import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAboutContent, useAboutPoints } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

const AboutManager = () => {
  const { data: content } = useAboutContent();
  const { data: points } = useAboutPoints();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ heading: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (content) setForm({ heading: content.heading || "", description: content.description || "" });
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    await supabase.from("about_content").update(form).eq("id", content!.id);
    queryClient.invalidateQueries({ queryKey: ["about_content"] });
    setMsg("Saved!");
    setSaving(false);
    setTimeout(() => setMsg(""), 2000);
  };

  const addPoint = async () => {
    await supabase.from("about_points").insert({ title: "New Point", description: "Description here", icon_name: "Brain", sort_order: (points?.length || 0) });
    queryClient.invalidateQueries({ queryKey: ["about_points"] });
  };

  const deletePoint = async (id: string) => {
    await supabase.from("about_points").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["about_points"] });
  };

  const updatePoint = async (id: string, field: string, value: string) => {
    await supabase.from("about_points").update({ [field]: value }).eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["about_points"] });
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">About Section</h2>
      <div className="space-y-4 max-w-xl mb-8">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Heading</label>
          <input value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </button>
          {msg && <span className="text-xs text-accent">{msg}</span>}
        </div>
      </div>

      <h3 className="font-serif text-lg font-medium text-foreground mb-4">About Points</h3>
      <div className="space-y-3 max-w-xl">
        {points?.map((p) => (
          <div key={p.id} className="glass-card rounded-xl p-4 space-y-2">
            <div className="flex gap-2">
              <input defaultValue={p.icon_name} onBlur={(e) => updatePoint(p.id, "icon_name", e.target.value)} placeholder="Icon name" className={`${inputClass} w-28`} />
              <input defaultValue={p.title} onBlur={(e) => updatePoint(p.id, "title", e.target.value)} placeholder="Title" className={inputClass} />
              <button onClick={() => deletePoint(p.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
            <textarea defaultValue={p.description} onBlur={(e) => updatePoint(p.id, "description", e.target.value)} rows={2} className={`${inputClass} resize-none`} />
          </div>
        ))}
        <button onClick={addPoint} className="flex items-center gap-2 text-sm text-accent hover:text-foreground transition-colors">
          <Plus size={14} /> Add Point
        </button>
      </div>
    </div>
  );
};

export default AboutManager;
