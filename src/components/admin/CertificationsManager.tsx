import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCertifications, useAwards } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import ImageUpload from "./ImageUpload";
import { Plus, Trash2, Save, Loader2, Edit2, X } from "lucide-react";

const CertificationsManager = () => {
  const { data: certs } = useCertifications();
  const { data: awards } = useAwards();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", icon: "📜", drive_url: "", image_url: "" });
  const [saving, setSaving] = useState(false);
  const [editingAward, setEditingAward] = useState<string | null>(null);
  const [awardForm, setAwardForm] = useState({ title: "", subtitle: "" });

  const invalidateCerts = () => queryClient.invalidateQueries({ queryKey: ["certifications"] });
  const invalidateAwards = () => queryClient.invalidateQueries({ queryKey: ["awards"] });

  const startEdit = (c: any) => {
    setEditing(c.id);
    setForm({ name: c.name, icon: c.icon || "📜", drive_url: c.drive_url || "", image_url: c.image_url || "" });
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing === "new") {
      await supabase.from("certifications").insert({ ...form, sort_order: (certs?.length || 0) });
    } else {
      await supabase.from("certifications").update(form).eq("id", editing!);
    }
    invalidateCerts();
    setEditing(null);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("certifications").delete().eq("id", id);
    invalidateCerts();
  };

  const saveAward = async () => {
    setSaving(true);
    if (editingAward === "new") {
      await supabase.from("awards").insert({ ...awardForm, sort_order: (awards?.length || 0) });
    } else {
      await supabase.from("awards").update(awardForm).eq("id", editingAward!);
    }
    invalidateAwards();
    setEditingAward(null);
    setSaving(false);
  };

  const deleteAward = async (id: string) => {
    await supabase.from("awards").delete().eq("id", id);
    invalidateAwards();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-medium text-foreground">Certifications</h2>
        <button onClick={() => { setEditing("new"); setForm({ name: "", icon: "📜", drive_url: "", image_url: "" }); }} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2"><Plus size={14} /> Add</button>
      </div>

      {editing && (
        <div className="glass-card-elevated rounded-2xl p-6 mb-6 max-w-xl space-y-4">
          <div className="flex justify-between"><h3 className="font-medium text-foreground">{editing === "new" ? "New" : "Edit"}</h3><button onClick={() => setEditing(null)}><X size={16} /></button></div>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Certification name" className={inputClass} />
          <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Emoji icon" className={`${inputClass} w-24`} />
          <input value={form.drive_url} onChange={(e) => setForm({ ...form, drive_url: e.target.value })} placeholder="Google Drive / View certificate URL" className={inputClass} />
          <ImageUpload currentUrl={form.image_url} onUpload={(url) => setForm({ ...form, image_url: url })} folder="certifications" />
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </button>
        </div>
      )}

      <div className="space-y-3 max-w-2xl mb-10">
        {certs?.map((c) => (
          <div key={c.id} className="glass-card rounded-xl p-4 flex items-center gap-3">
            <span className="text-lg">{c.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              {c.drive_url && <a href={c.drive_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">View Certificate →</a>}
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(c)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(c.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Awards section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-medium text-foreground">Awards</h3>
        <button onClick={() => { setEditingAward("new"); setAwardForm({ title: "", subtitle: "" }); }} className="px-3 py-1.5 bg-accent/10 text-accent rounded-xl text-xs flex items-center gap-1"><Plus size={12} /> Add</button>
      </div>

      {editingAward && (
        <div className="glass-card-elevated rounded-2xl p-6 mb-4 max-w-xl space-y-4">
          <input value={awardForm.title} onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })} placeholder="Award title" className={inputClass} />
          <input value={awardForm.subtitle} onChange={(e) => setAwardForm({ ...awardForm, subtitle: e.target.value })} placeholder="Subtitle" className={inputClass} />
          <div className="flex gap-2">
            <button onClick={saveAward} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm"><Save size={14} /></button>
            <button onClick={() => setEditingAward(null)} className="px-4 py-2 border border-border rounded-xl text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3 max-w-2xl">
        {awards?.map((a) => (
          <div key={a.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.subtitle}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setEditingAward(a.id); setAwardForm({ title: a.title, subtitle: a.subtitle || "" }); }} className="p-2 text-muted-foreground hover:text-foreground rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => deleteAward(a.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsManager;
