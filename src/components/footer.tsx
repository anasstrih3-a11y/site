import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07070d]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 font-display text-lg font-black text-white">
                N
              </span>
              <span className="font-display text-lg font-bold tracking-widest text-white">
                NEXUS<span className="text-violet-400">ARSENAL</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Pro-grade gaming gear, hand-picked and linked straight to Amazon
              for live pricing, Prime shipping, and hassle-free returns.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-white">SHOP</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/shop" className="transition hover:text-violet-300">All Products</Link></li>
              <li><Link href="/shop?category=Keyboards" className="transition hover:text-violet-300">Keyboards</Link></li>
              <li><Link href="/shop?category=Mice" className="transition hover:text-violet-300">Mice</Link></li>
              <li><Link href="/shop?category=Audio" className="transition hover:text-violet-300">Audio</Link></li>
              <li><Link href="/shop?category=Monitors" className="transition hover:text-violet-300">Monitors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-white">TOP CATEGORIES</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/shop?category=Components" className="transition hover:text-violet-300">Components</Link></li>
              <li><Link href="/shop?category=Controllers" className="transition hover:text-violet-300">Controllers</Link></li>
              <li><Link href="/shop?category=Streaming" className="transition hover:text-violet-300">Streaming</Link></li>
              <li><Link href="/shop?category=Chairs" className="transition hover:text-violet-300">Chairs</Link></li>
              <li><Link href="/shop?sort=rating" className="transition hover:text-violet-300">Top Rated</Link></li>
              <li><Link href="/admin" className="transition hover:text-violet-300">⚙ Admin — إضافة منتج</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-white">
              AFFILIATE DISCLOSURE
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
              As an Amazon Associate, Nexus Arsenal earns from qualifying
              purchases. Product prices and availability are accurate as of the
              date/time indicated and are subject to change. Any price displayed
              on Amazon at the time of purchase will apply.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Nexus Arsenal. All rights reserved. GLHF.</p>
          <div className="flex items-center gap-5">
            <span>★ Hand-tested picks</span>
            <span>🚚 Fast Prime shipping</span>
            <span>↩️ Easy Amazon returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
