import { supabase } from "@/integrations/supabase/client";
import { useContactMessages } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Mail, MailOpen } from "lucide-react";

const MessagesManager = () => {
  const { data: messages } = useContactMessages();
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["contact_messages"] });

  const toggleRead = async (id: string, currentRead: boolean) => {
    await supabase.from("contact_messages").update({ read: !currentRead }).eq("id", id);
    invalidate();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    invalidate();
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
        Messages {messages?.length ? `(${messages.filter((m) => !m.read).length} unread)` : ""}
      </h2>

      {!messages?.length && (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      )}

      <div className="space-y-3 max-w-2xl">
        {messages?.map((msg) => (
          <div key={msg.id} className={`glass-card rounded-xl p-5 ${!msg.read ? "border-accent/30" : "opacity-70"}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-foreground">{msg.name}</p>
                <p className="text-xs text-accent">{msg.email}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
                <button onClick={() => toggleRead(msg.id, msg.read || false)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg" title={msg.read ? "Mark unread" : "Mark read"}>
                  {msg.read ? <MailOpen size={14} /> : <Mail size={14} />}
                </button>
                <button onClick={() => handleDelete(msg.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesManager;
