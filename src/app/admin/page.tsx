"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  BookOpen,
  Bell,
  ArrowRight,
  Phone,
  MessageCircle,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { getLeadsAction, LeadRecord } from "@/app/actions/leadActions";
import { getBlogPostsAction, BlogRecord } from "@/app/actions/blogActions";
import { getAnnouncementsAction, AnnouncementRecord } from "@/app/actions/announcementActions";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, blogsData, annData] = await Promise.all([
        getLeadsAction(),
        getBlogPostsAction(),
        getAnnouncementsAction(),
      ]);
      setLeads(leadsData);
      setBlogs(blogsData);
      setAnnouncements(annData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "Yeni").length;
  const inProgressLeads = leads.filter((l) => l.status === "İletişime Geçildi" || l.status === "Görüşme Yapıldı").length;
  const totalBlogs = blogs.length;
  const totalAnnouncements = announcements.length;

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">
            Hoş Geldiniz, {SITE_CONFIG.personName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Hepsen Sigorta Acente Yönetim Paneli — Güncel Teklif ve İçerik Özeti
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Verileri Yenile</span>
          </button>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Users className="w-4 h-4" />
            <span>Tüm Teklifleri İncele</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Toplam Teklif</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#0B1F3A]">{totalLeads}</div>
          <span className="text-[11px] text-emerald-600 font-medium">Kayıtlı başvuru</span>
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold">Yeni Talepler</span>
            <Clock className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-emerald-900">{newLeads}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Geri dönüş bekliyor</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Görüşülenler</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-[#0B1F3A]">{inProgressLeads}</div>
          <span className="text-[11px] text-blue-600 font-medium">Poliçe aşamasında</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Yayınlanan Blog</span>
            <BookOpen className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-black text-[#0B1F3A]">{totalBlogs}</div>
          <span className="text-[11px] text-slate-500 font-medium">Rehber içeriği</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Aktif Duyuru</span>
            <Bell className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-[#0B1F3A]">{totalAnnouncements}</div>
          <span className="text-[11px] text-amber-600 font-medium">Yayında olan</span>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">Son Gelen Teklif Talepleri</h2>
            <p className="text-xs text-slate-500">Müşterilerinizin ilettiği en son başvurular</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400">Veriler yükleniyor...</div>
        ) : recentLeads.length === 0 ? (
          <div className="py-16 text-center px-4 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#0B1F3A]">Henüz Gelen Teklif Talebi Yok</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Müşteriler web sitenizdeki formları doldurduğunda burada otomatik görünecektir.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Ad Soyad</th>
                  <th className="p-4">Hizmet</th>
                  <th className="p-4">Şehir</th>
                  <th className="p-4">Tarih</th>
                  <th className="p-4">Durum</th>
                  <th className="p-4 text-right">Hızlı İletişim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/\D/g, "");
                  const waUrl = `https://wa.me/90${cleanPhone.startsWith("0") ? cleanPhone.slice(1) : cleanPhone}`;
                  const formattedDate = new Date(lead.created_at).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-bold text-[#0B1F3A]">{lead.full_name}</td>
                      <td className="p-4 text-slate-700">{lead.service}</td>
                      <td className="p-4 text-slate-500">{lead.city || "—"}</td>
                      <td className="p-4 text-slate-400">{formattedDate}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            lead.status === "Yeni"
                              ? "bg-emerald-100 text-emerald-800"
                              : lead.status === "İletişime Geçildi"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0B1F3A] hover:text-white transition-colors"
                            title="Telefonla Ara"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-[#25D366] hover:text-white transition-colors"
                            title="WhatsApp Mesajı At"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
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
    </div>
  );
}
