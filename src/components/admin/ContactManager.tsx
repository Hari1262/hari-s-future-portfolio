import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useContactInfo } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, Loader2, Edit2, X } from "lucide-react";

const ContactManager = () => {
  const { data: contacts } = useContactInfo();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "", value: "", href: "", icon_type: "Mail", is_external: false });
  const [saving, setSaving] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["contact_info"] });

  const startEdit = (c: any) => {
    setEditing(c.id);
    setForm({ label: c.label, value: c.value, href: c.href, icon_type: c.icon_type, is_external: c.is_external || false });
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing === "new") {
      await supabase.from("contact_info").insert({ ...form, sort_order: (contacts?.length || 0) });
    } else {
      await supabase.from("contact_info").update(form).eq("id", editing!);
    }
    invalidate();
    setEditing(null);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_info").delete().eq("id", id);
    invalidate();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-medium text-foreground">Contact Info</h2>
        <button onClick={() => { setEditing("new"); setForm({ label: "", value: "", href: "", icon_type: "Mail", is_external: false }); }} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2"><Plus size={14} /> Add</button>
      </div>

      {editing && (
        <div className="glass-card-elevated rounded-2xl p-6 mb-6 max-w-xl space-y-4">
          <div className="flex justify-between"><h3 className="font-medium text-foreground">{editing === "new" ? "New" : "Edit"}</h3><button onClick={() => setEditing(null)}><X size={16} /></button></div>
          <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Label (e.g. Email)" className={inputClass} />
          <input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="Display value" className={inputClass} />
          <input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} placeholder="Link (e.g. mailto:...)" className={inputClass} />
          <select value={form.icon_type} onChange={(e) => setForm({ ...form, icon_type: e.target.value })} className={inputClass}>
            <option value="Mail">Mail</option>
            <option value="Phone">Phone</option>
            <option value="Linkedin">LinkedIn</option>
            <option value="Github">GitHub</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={form.is_external} onChange={(e) => setForm({ ...form, is_external: e.target.checked })} />
            Opens in new tab
          </label>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </button>
        </div>
      )}

      <div className="space-y-3 max-w-2xl">
        {contacts?.map((c) => (
          <div key={c.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{c.label}: {c.value}</p>
              <p className="text-xs text-muted-foreground">{c.href}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(c)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(c.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactManager;
