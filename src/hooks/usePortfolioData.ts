import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useHeroSettings = () =>
  useQuery({
    queryKey: ["hero_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("hero_settings").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

export const useAboutContent = () =>
  useQuery({
    queryKey: ["about_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_content").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

export const useAboutPoints = () =>
  useQuery({
    queryKey: ["about_points"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_points").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useSkillCategories = () =>
  useQuery({
    queryKey: ["skill_categories_with_skills"],
    queryFn: async () => {
      const { data: categories, error: catErr } = await supabase
        .from("skill_categories")
        .select("*")
        .order("sort_order");
      if (catErr) throw catErr;

      const { data: skills, error: skillErr } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order");
      if (skillErr) throw skillErr;

      return categories.map((cat) => ({
        ...cat,
        skills: skills.filter((s) => s.category_id === cat.id).map((s) => s.name),
      }));
    },
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useExperiences = () =>
  useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase.from("experiences").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useEducation = () =>
  useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data, error } = await supabase.from("education").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useCertifications = () =>
  useQuery({
    queryKey: ["certifications"],
    queryFn: async () => {
      const { data, error } = await supabase.from("certifications").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useAwards = () =>
  useQuery({
    queryKey: ["awards"],
    queryFn: async () => {
      const { data, error } = await supabase.from("awards").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useContactInfo = () =>
  useQuery({
    queryKey: ["contact_info"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_info").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useContactMessages = () =>
  useQuery({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
