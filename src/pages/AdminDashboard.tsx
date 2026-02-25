import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, User, Code2, FolderOpen, Briefcase, GraduationCap,
  Award, Mail, LogOut, Settings, MessageSquare, Image,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import HeroManager from "@/components/admin/HeroManager";
import AboutManager from "@/components/admin/AboutManager";
import SkillsManager from "@/components/admin/SkillsManager";
import ProjectsManager from "@/components/admin/ProjectsManager";
import ExperienceManager from "@/components/admin/ExperienceManager";
import EducationManager from "@/components/admin/EducationManager";
import CertificationsManager from "@/components/admin/CertificationsManager";
import ContactManager from "@/components/admin/ContactManager";
import MessagesManager from "@/components/admin/MessagesManager";

const tabs = [
  { id: "hero", label: "Hero", icon: User },
  { id: "about", label: "About", icon: LayoutDashboard },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Settings },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="glass-card-elevated rounded-3xl p-8 text-center max-w-md">
          <h2 className="font-serif text-xl font-medium text-foreground mb-2">Access Denied</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You don't have admin privileges. Contact the administrator to get access.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate("/")} className="px-4 py-2 text-xs rounded-lg border border-border hover:bg-secondary transition-colors">
              Back to Portfolio
            </button>
            <button onClick={signOut} className="px-4 py-2 text-xs rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "hero": return <HeroManager />;
      case "about": return <AboutManager />;
      case "skills": return <SkillsManager />;
      case "projects": return <ProjectsManager />;
      case "experience": return <ExperienceManager />;
      case "education": return <EducationManager />;
      case "certifications": return <CertificationsManager />;
      case "contact": return <ContactManager />;
      case "messages": return <MessagesManager />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <h1 className="font-serif text-lg font-medium text-foreground">Admin Panel</h1>
          <p className="text-xs text-muted-foreground mt-1 truncate">{user?.email}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <Image size={16} />
            View Portfolio
          </a>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
