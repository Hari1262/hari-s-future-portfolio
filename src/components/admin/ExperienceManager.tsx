import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useExperiences } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, Loader2, Edit2, X } from "lucide-react";

const ExperienceManager = () => {
  const { data: experiences } = useExperiences();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ role: "", company: "", year: "", details: "" });
  const [saving, setSaving] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["experiences"] });

  const startEdit = (exp: any) => {
    setEditing(exp.id);
    setForm({ role: exp.role, company: exp.company, year: exp.year, details: (exp.details || []).join("\n") });
  };

  const startNew = () => { setEditing("new"); setForm({ role: "", company: "", year: "", details: "" }); };

  const handleSave = async () => {
    setSaving(true);
    const details = form.details.split("\n").map((d) => d.trim()).filter(Boolean);
    if (editing === "new") {
      await supabase.from("experiences").insert({ role: form.role, company: form.company, year: form.year, details, sort_order: (experiences?.length || 0) });
    } else {
      await supabase.from("experiences").update({ role: form.role, company: form.company, year: form.year, details }).eq("id", editing!);
    }
    invalidate();
    setEditing(null);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("experiences").delete().eq("id", id);
    invalidate();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-medium text-foreground">Experience</h2>
        <button onClick={startNew} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2"><Plus size={14} /> Add</button>
      </div>

      {editing && (
        <div className="glass-card-elevated rounded-2xl p-6 mb-6 max-w-xl space-y-4">
          <div className="flex justify-between"><h3 className="font-medium text-foreground">{editing === "new" ? "New" : "Edit"}</h3><button onClick={() => setEditing(null)}><X size={16} /></button></div>
          <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className={inputClass} />
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className={inputClass} />
          <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="Year" className={inputClass} />
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Details (one per line)</label>
            <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
          </div>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </button>
        </div>
      )}

      <div className="space-y-3 max-w-2xl">
        {experiences?.map((exp) => (
          <div key={exp.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground text-sm">{exp.role}</h4>
              <p className="text-xs text-muted-foreground">{exp.company} • {exp.year}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(exp)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(exp.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;
