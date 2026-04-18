interface Section { title: string; body: string }
interface Props   { title: string; updated: string; sections: Section[] }

export function LegalPage({ title, updated, sections }: Props) {
  return (
    <div className="bg-[#070B1F] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:px-8 pt-36 pb-24">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">{title}</h1>
        <p className="text-sm text-white/30 mb-12">Last updated: {updated}</p>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-lg font-bold text-white mb-3">{s.title}</h2>
              <p className="text-[15px] text-white/55 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.07]">
          <p className="text-sm text-white/30">
            Questions? Email{" "}
            <a href="mailto:legal@primemindintelligence.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              legal@primemindintelligence.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
