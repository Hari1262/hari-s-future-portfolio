export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          description: string | null
          heading: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          heading?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          heading?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      about_points: {
        Row: {
          created_at: string | null
          description: string
          icon_name: string
          id: string
          sort_order: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          icon_name?: string
          id?: string
          sort_order?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          icon_name?: string
          id?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      awards: {
        Row: {
          created_at: string | null
          id: string
          sort_order: number | null
          subtitle: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          sort_order?: number | null
          subtitle?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          sort_order?: number | null
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string | null
          drive_url: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          drive_url?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          drive_url?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          href: string
          icon_type: string
          id: string
          is_external: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          href: string
          icon_type?: string
          id?: string
          is_external?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          href?: string
          icon_type?: string
          id?: string
          is_external?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string | null
          degree: string
          detail: string | null
          id: string
          institution: string
          is_current: boolean | null
          sort_order: number | null
          year: string
        }
        Insert: {
          created_at?: string | null
          degree: string
          detail?: string | null
          id?: string
          institution: string
          is_current?: boolean | null
          sort_order?: number | null
          year: string
        }
        Update: {
          created_at?: string | null
          degree?: string
          detail?: string | null
          id?: string
          institution?: string
          is_current?: boolean | null
          sort_order?: number | null
          year?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string | null
          details: string[] | null
          id: string
          role: string
          sort_order: number | null
          year: string
        }
        Insert: {
          company: string
          created_at?: string | null
          details?: string[] | null
          id?: string
          role: string
          sort_order?: number | null
          year: string
        }
        Update: {
          company?: string
          created_at?: string | null
          details?: string[] | null
          id?: string
          role?: string
          sort_order?: number | null
          year?: string
        }
        Relationships: []
      }
      hero_settings: {
        Row: {
          email: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          name: string
          profile_image_url: string | null
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          profile_image_url?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          profile_image_url?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          color: string | null
          created_at: string | null
          demo_url: string | null
          description: string
          github_url: string | null
          id: string
          image_url: string | null
          sort_order: number | null
          subtitle: string
          tags: string[] | null
          title: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string
          github_url?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number | null
          subtitle?: string
          tags?: string[] | null
          title: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string
          github_url?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number | null
          subtitle?: string
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          created_at: string | null
          id: string
          sort_order: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          sort_order?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: string
          id: string
          name: string
          sort_order: number | null
        }
        Insert: {
          category_id: string
          id?: string
          name: string
          sort_order?: number | null
        }
        Update: {
          category_id?: string
          id?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
