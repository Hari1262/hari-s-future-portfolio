import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useEducation } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, Loader2, Edit2, X } from "lucide-react";

const EducationManager = () => {
  const { data: education } = useEducation();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ degree: "", institution: "", year: "", detail: "", is_current: false });
  const [saving, setSaving] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["education"] });

  const startEdit = (ed: any) => {
    setEditing(ed.id);
    setForm({ degree: ed.degree, institution: ed.institution, year: ed.year, detail: ed.detail || "", is_current: ed.is_current || false });
  };

  const startNew = () => { setEditing("new"); setForm({ degree: "", institution: "", year: "", detail: "", is_current: false }); };

  const handleSave = async () => {
    setSaving(true);
    if (editing === "new") {
      await supabase.from("education").insert({ ...form, sort_order: (education?.length || 0) });
    } else {
      await supabase.from("education").update(form).eq("id", editing!);
    }
    invalidate();
    setEditing(null);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("education").delete().eq("id", id);
    invalidate();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-medium text-foreground">Education</h2>
        <button onClick={startNew} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2"><Plus size={14} /> Add</button>
      </div>

      {editing && (
        <div className="glass-card-elevated rounded-2xl p-6 mb-6 max-w-xl space-y-4">
          <div className="flex justify-between"><h3 className="font-medium text-foreground">{editing === "new" ? "New" : "Edit"}</h3><button onClick={() => setEditing(null)}><X size={16} /></button></div>
          <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} placeholder="Degree" className={inputClass} />
          <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} placeholder="Institution" className={inputClass} />
          <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="Year" className={inputClass} />
          <input value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="Detail" className={inputClass} />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={form.is_current} onChange={(e) => setForm({ ...form, is_current: e.target.checked })} className="rounded" />
            Currently studying
          </label>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </button>
        </div>
      )}

      <div className="space-y-3 max-w-2xl">
        {education?.map((ed) => (
          <div key={ed.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground text-sm">{ed.degree}</h4>
              <p className="text-xs text-muted-foreground">{ed.institution} • {ed.year}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(ed)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(ed.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManager;
