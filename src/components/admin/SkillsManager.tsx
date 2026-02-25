import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Plus, Trash2, Save } from "lucide-react";

const SkillsManager = () => {
  const queryClient = useQueryClient();
  const [newCat, setNewCat] = useState("");
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const { data: categories } = useQuery({
    queryKey: ["admin_skill_categories"],
    queryFn: async () => {
      const { data } = await supabase.from("skill_categories").select("*").order("sort_order");
      return data || [];
    },
  });

  const { data: skills } = useQuery({
    queryKey: ["admin_skills"],
    queryFn: async () => {
      const { data } = await supabase.from("skills").select("*").order("sort_order");
      return data || [];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin_skill_categories"] });
    queryClient.invalidateQueries({ queryKey: ["admin_skills"] });
    queryClient.invalidateQueries({ queryKey: ["skill_categories_with_skills"] });
  };

  const addCategory = async () => {
    if (!newCat.trim()) return;
    await supabase.from("skill_categories").insert({ title: newCat.trim(), sort_order: (categories?.length || 0) });
    setNewCat("");
    invalidate();
  };

  const deleteCategory = async (id: string) => {
    await supabase.from("skill_categories").delete().eq("id", id);
    invalidate();
  };

  const addSkill = async (categoryId: string) => {
    const name = newSkills[categoryId]?.trim();
    if (!name) return;
    const catSkills = skills?.filter((s) => s.category_id === categoryId) || [];
    await supabase.from("skills").insert({ name, category_id: categoryId, sort_order: catSkills.length });
    setNewSkills({ ...newSkills, [categoryId]: "" });
    invalidate();
  };

  const deleteSkill = async (id: string) => {
    await supabase.from("skills").delete().eq("id", id);
    invalidate();
  };

  const inputClass = "px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">Skills</h2>

      <div className="flex gap-2 mb-6 max-w-md">
        <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category name" className={`${inputClass} flex-1`} />
        <button onClick={addCategory} className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm flex items-center gap-1">
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {categories?.map((cat) => (
          <div key={cat.id} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium tracking-widest uppercase text-accent">{cat.title}</h3>
              <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills?.filter((s) => s.category_id === cat.id).map((skill) => (
                <span key={skill.id} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/50 flex items-center gap-1.5">
                  {skill.name}
                  <button onClick={() => deleteSkill(skill.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={10} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newSkills[cat.id] || ""}
                onChange={(e) => setNewSkills({ ...newSkills, [cat.id]: e.target.value })}
                placeholder="Add skill"
                className={`${inputClass} flex-1`}
                onKeyDown={(e) => e.key === "Enter" && addSkill(cat.id)}
              />
              <button onClick={() => addSkill(cat.id)} className="px-3 py-2 bg-accent/10 text-accent rounded-xl text-xs font-medium hover:bg-accent/20">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
