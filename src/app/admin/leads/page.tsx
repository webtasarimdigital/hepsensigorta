"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Phone,
  MessageCircle,
  Download,
  Search,
  Filter,
  Eye,
  X,
  RefreshCw,
  Trash2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getLeadsAction,
  updateLeadStatusAction,
  updateLeadNoteAction,
  deleteLeadAction,
  LeadRecord,
} from "@/app/actions/leadActions";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Tümü");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeadsAction();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "Tümü" || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as any } : null));
    }
    await updateLeadStatusAction(id, newStatus);
  };

  const handleSaveNote = async (id: string, note: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, admin_note: note } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, admin_note: note } : null));
    }
    await updateLeadNoteAction(id, note);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu teklif talebini silmek istediğinize emin misiniz?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLead?.id === id) setSelectedLead(null);
    await deleteLeadAction(id);
  };

  const exportToCsv = () => {
    if (filteredLeads.length === 0) {
      alert("İndirilecek teklif bulunmuyor.");
      return;
    }

    const headers = ["Ad Soyad", "Telefon", "E-posta", "Hizmet", "Şehir", "İletişim Tercihi", "Durum", "Tarih", "Not"];
    const rows = filteredLeads.map((l) => [
      `"${l.full_name}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.service}"`,
      `"${l.city || ""}"`,
      `"${l.preferred_contact}"`,
      `"${l.status}"`,
      `"${new Date(l.created_at).toLocaleString("tr-TR")}"`,
      `"${l.admin_note || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hepsen_sigorta_talepler_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Teklif Talepleri & Müşteri Yönetimi</h1>
          <p className="text-xs text-slate-500">
            Web sitesinden gelen başvurular burada anlık listelenir.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadLeads}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Yenile</span>
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCsv} className="gap-2">
            <Download className="w-4 h-4" />
            <span>CSV İndir</span>
          </Button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="İsim, telefon veya hizmet ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="Tümü">Tüm Durumlar ({leads.length})</option>
            <option value="Yeni">Yeni</option>
            <option value="İletişime Geçildi">İletişime Geçildi</option>
            <option value="Görüşme Yapıldı">Görüşme Yapıldı</option>
            <option value="Tamamlandı">Tamamlandı</option>
            <option value="Uygun Değil">Uygun Değil</option>
          </select>
        </div>
      </div>

      {/* Leads Table or Empty State */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-semibold">Talepler yükleniyor...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center px-4 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F3A]">Kayıtlı Teklif Talebi Bulunamadı</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm || filterStatus !== "Tümü"
                ? "Arama kriterlerinize uyan başvuru bulunamadı."
                : "Web sitesindeki formlardan gönderilen tüm başvurular anlık olarak burada listelenecektir."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Ad Soyad</th>
                  <th className="p-4">Telefon</th>
                  <th className="p-4">Hizmet</th>
                  <th className="p-4">Şehir</th>
                  <th className="p-4">Tarih</th>
                  <th className="p-4">Durum</th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/\D/g, "");
                  const waUrl = `https://wa.me/90${cleanPhone.startsWith("0") ? cleanPhone.slice(1) : cleanPhone}`;
                  const formattedDate = new Date(lead.created_at).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#0B1F3A]">{lead.full_name}</td>
                      <td className="p-4 text-slate-600 font-mono">{lead.phone}</td>
                      <td className="p-4 text-slate-800 font-medium">{lead.service}</td>
                      <td className="p-4 text-slate-500">{lead.city || "—"}</td>
                      <td className="p-4 text-slate-400 text-xs">{formattedDate}</td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border border-slate-200 focus:outline-none ${
                            lead.status === "Yeni"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : lead.status === "İletişime Geçildi"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : lead.status === "Tamamlandı"
                              ? "bg-purple-50 text-purple-800 border-purple-300"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <option value="Yeni">Yeni</option>
                          <option value="İletişime Geçildi">İletişime Geçildi</option>
                          <option value="Görüşme Yapıldı">Görüşme Yapıldı</option>
                          <option value="Tamamlandı">Tamamlandı</option>
                          <option value="Uygun Değil">Uygun Değil</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Detayları İncele"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0B1F3A] hover:text-white transition-colors"
                            title="Ara"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-[#25D366] hover:text-white transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                  {selectedLead.service}
                </span>
                <h3 className="text-xl font-bold text-[#0B1F3A] mt-1">{selectedLead.full_name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Tarih:</span>
                <span className="font-semibold text-slate-800">
                  {new Date(selectedLead.created_at).toLocaleString("tr-TR")}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Telefon:</span>
                <span className="font-semibold text-slate-800">{selectedLead.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">E-posta:</span>
                <span className="font-semibold text-slate-800">{selectedLead.email || "Belirtilmedi"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">İkamet Şehri:</span>
                <span className="font-semibold text-slate-800">{selectedLead.city || "Belirtilmedi"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">İletişim Tercihi:</span>
                <span className="font-semibold text-emerald-700">{selectedLead.preferred_contact}</span>
              </div>
              <div className="py-2 border-b border-slate-100">
                <span className="text-slate-500 block mb-1">Müşteri Talebi / Notu:</span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed text-xs">
                  {selectedLead.message || "Özel bir not iletilmedi."}
                </p>
              </div>

              {/* Admin Note Box */}
              <div className="py-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Acente / Danışman Notu
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedLead.admin_note || ""}
                  onBlur={(e) => handleSaveNote(selectedLead.id, e.target.value)}
                  placeholder="Görüşme özeti veya hatırlatıcı notlar..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">Yazdıktan sonra alandan çıkıldığında otomatik kaydedilir.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <a
                href={`tel:${selectedLead.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold hover:bg-[#15345e] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Telefonla Ara</span>
              </a>

              <a
                href={`https://wa.me/90${selectedLead.phone.replace(/\D/g, "").slice(-10)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp ile Yaz</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
