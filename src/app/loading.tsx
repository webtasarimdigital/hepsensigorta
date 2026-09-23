export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-emerald-600 animate-spin" />
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        Hepsen Sigorta Yükleniyor...
      </span>
    </div>
  );
}
