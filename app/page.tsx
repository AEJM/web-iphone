import IPhoneScroll from "@/components/IPhoneScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <IPhoneScroll />
      
      {/* Footer / Extra Content */}
      <section className="py-24 px-8 border-t border-white/10 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Pro Design</h3>
            <p className="text-white/40 text-sm">
              Aerospace-grade titanium design with a textured matte-glass back.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Pro Performance</h3>
            <p className="text-white/40 text-sm">
              A19 Pro chip with 6-core GPU. The most advanced graphics in a smartphone.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Pro Camera</h3>
            <p className="text-white/40 text-sm">
              All-new 48MP main camera for super-high-resolution photos.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
