import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useHeroSettings } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import ImageUpload from "./ImageUpload";
import { Save, Loader2 } from "lucide-react";

const HeroManager = () => {
  const { data: hero, isLoading } = useHeroSettings();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "", title: "", subtitle: "", github_url: "", linkedin_url: "", email: "", profile_image_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (hero) {
      setForm({
        name: hero.name || "",
        title: hero.title || "",
        subtitle: hero.subtitle || "",
        github_url: hero.github_url || "",
        linkedin_url: hero.linkedin_url || "",
        email: hero.email || "",
        profile_image_url: hero.profile_image_url || "",
      });
    }
  }, [hero]);

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase
      .from("hero_settings")
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq("id", hero!.id);
    if (error) setMsg("Error: " + error.message);
    else { setMsg("Saved!"); queryClient.invalidateQueries({ queryKey: ["hero_settings"] }); }
    setSaving(false);
  };

  if (isLoading) return <div className="text-muted-foreground text-sm">Loading...</div>;

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">Hero Section</h2>
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Profile Image</label>
          <ImageUpload
            currentUrl={form.profile_image_url}
            onUpload={(url) => setForm({ ...form, profile_image_url: url })}
            folder="hero"
          />
        </div>
        {[
          { key: "name", label: "Name" },
          { key: "title", label: "Title" },
          { key: "subtitle", label: "Subtitle" },
          { key: "github_url", label: "GitHub URL" },
          { key: "linkedin_url", label: "LinkedIn URL" },
          { key: "email", label: "Email" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
            <input
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className={inputClass}
            />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Changes
          </button>
          {msg && <span className={`text-xs ${msg.startsWith("Error") ? "text-destructive" : "text-accent"}`}>{msg}</span>}
        </div>
      </div>
    </div>
  );
};

export default HeroManager;
