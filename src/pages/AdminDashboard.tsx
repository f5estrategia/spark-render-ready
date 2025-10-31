import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { LogOut, Download, Loader2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Lead = Database['public']['Tables']['leads']['Row'];

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndRole();
  }, []);

  const checkAuthAndRole = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (error || !roles) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    loadLeads();
  };

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      toast({
        title: "Erro ao carregar leads",
        description: "Não foi possível carregar os dados",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ['Nome', 'Email', 'Telefone', 'Instagram', 'Data', 'Dispositivo', 'UTM Source', 'UTM Medium', 'UTM Campaign'];
    const rows = leads.map(lead => [
      lead.nome,
      lead.email,
      lead.telefone,
      (lead.campos_personalizado as any)?.instagram_clinica || '',
      new Date(lead.created_at).toLocaleString('pt-BR'),
      lead.dispositivo || '',
      lead.utm_source || '',
      lead.utm_medium || '',
      lead.utm_campaign || ''
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isAdmin || isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--luxury-black))] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[hsl(var(--f5-orange))] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--luxury-black))] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          <div className="flex gap-4">
            <Button
              onClick={exportToCSV}
              variant="outline"
              disabled={leads.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        <div className="bg-[hsl(var(--luxury-dark))] border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Leads Capturados</h2>
            <p className="text-[hsl(var(--text-secondary))]">
              Total: {leads.length} lead{leads.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[hsl(var(--text-secondary))]">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[hsl(var(--text-secondary))]">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[hsl(var(--text-secondary))]">Telefone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[hsl(var(--text-secondary))]">Instagram</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[hsl(var(--text-secondary))]">Data</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[hsl(var(--text-secondary))]">UTM Source</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-sm text-white">{lead.nome}</td>
                    <td className="py-3 px-4 text-sm text-white">{lead.email}</td>
                    <td className="py-3 px-4 text-sm text-white">{lead.telefone}</td>
                    <td className="py-3 px-4 text-sm text-white">
                      {(lead.campos_personalizado as any)?.instagram_clinica || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-[hsl(var(--text-secondary))]">
                      {new Date(lead.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-[hsl(var(--text-secondary))]">
                      {lead.utm_source || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leads.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[hsl(var(--text-secondary))]">
                  Nenhum lead capturado ainda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
