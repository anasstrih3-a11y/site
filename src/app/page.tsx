import Link from "next/link";
import { getFeaturedProducts } from "@/lib/queries";
import { amazonLink } from "@/lib/amazon";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

const amzImg = (id: string) =>
  `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`;

const collections = [
  {
    name: "Keyboards",
    desc: "Optical switches, zero latency",
    href: "/shop?category=Keyboards",
    image: amzImg("41HHSRrI-fL"),
  },
  {
    name: "Mice",
    desc: "Featherweight, flawless sensors",
    href: "/shop?category=Mice",
    image: amzImg("31RniNAAGpL"),
  },
  {
    name: "Audio",
    desc: "Hear everything first",
    href: "/shop?category=Audio",
    image: amzImg("41SkA5j2l-L"),
  },
  {
    name: "Components",
    desc: "Frames for days",
    href: "/shop?category=Components",
    image: amzImg("41sqGzjx7GL"),
  },
];

const testimonials = [
  {
    quote:
      "Finally, a gear site that doesn't sell knockoffs. Every pick linked straight to the real listing on Amazon.",
    name: "Kaito • Diamond II",
  },
  {
    quote:
      "Bought the DeathAdder through their link during a 47% off drop. The deal tracking alone makes this my homepage.",
    name: "Sarah • Twitch Partner",
  },
  {
    quote:
      "No fake stores, no sketchy checkout — just the best gear with honest ratings and one click to Amazon. Perfect.",
    name: "Ty • LAN veteran",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/30469973/pexels-photo-30469973.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="RGB gaming battlestation"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070d] via-[#07070d]/85 to-[#07070d]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-[#07070d]/60" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-300">
              <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-cyan-400" />
              HAND-PICKED GEAR • LIVE ON AMAZON
            </p>
            <h1 className="animate-fade-up animation-delay-100 mt-6 font-display text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              GEAR UP.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                GAME ON.
              </span>
            </h1>
            <p className="animate-fade-up animation-delay-200 mt-6 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg">
              We test and curate the best keyboards, mice, headsets and
              components — then link you straight to Amazon for live pricing,
              Prime shipping, and easy returns. No carts, no checkout, no
              nonsense.
            </p>
            <div className="animate-fade-up animation-delay-300 mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-display text-sm font-bold tracking-wider text-white shadow-xl shadow-violet-900/50 transition hover:scale-[1.03] hover:brightness-110 active:scale-100"
              >
                SHOP THE ARMORY
              </Link>
              <Link
                href="/shop?sort=rating"
                className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-display text-sm font-bold tracking-wider text-white backdrop-blur transition hover:border-cyan-400/50 hover:bg-cyan-500/10"
              >
                TOP RATED
              </Link>
            </div>
            <div className="animate-fade-up animation-delay-400 mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm text-zinc-400">
              <div>
                <p className="font-display text-2xl font-bold text-white">12</p>
                <p>pro-approved picks</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">4.6★</p>
                <p>avg. Amazon rating</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">Prime</p>
                <p>fast shipping</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">1-click</p>
                <p>buy on Amazon</p>
              </div>
            </div>
            <p className="animate-fade-up animation-delay-400 mt-6 max-w-lg text-[11px] leading-relaxed text-zinc-500">
              As an Amazon Associate, Nexus Arsenal earns from qualifying
              purchases. Prices shown are snapshots — the live Amazon listing is
              always authoritative.
            </p>
          </div>
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              Featured Collections
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Pick Your Weapon Class
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-violet-300 transition hover:text-white sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Link
              key={c.name}
              href={c.href}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                i === 0 ? "sm:col-span-2 sm:row-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className={i === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[4/3]"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold text-white">{c.name}</h3>
                <p className="mt-1 text-sm text-zinc-300">{c.desc}</p>
                <span className="mt-3 inline-block text-xs font-bold tracking-widest text-cyan-300 opacity-0 transition duration-300 group-hover:opacity-100">
                  EXPLORE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="relative border-y border-white/5 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                The Meta Picks
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Featured Loadout
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-violet-300 transition hover:text-white sm:block"
            >
              Shop everything →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-block rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white"
            >
              Shop everything →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PROMO BANNER ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/1486294/pexels-photo-1486294.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Gaming mouse with RGB lighting"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0618]/95 via-[#0b0618]/70 to-transparent" />
          <div className="relative flex min-h-[320px] flex-col justify-center p-8 sm:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
              Deal alert on Amazon
            </p>
            <h3 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Razer DeathAdder V3 Pro —{" "}
              <span className="text-fuchsia-400">save 47%</span>
            </h3>
            <p className="mt-3 max-w-md text-sm text-zinc-300">
              64g of wireless perfection with a 30K sensor and 90-hour battery.
              Live price on Amazon right now — these drops never last.
            </p>
            <a
              href={amazonLink("https://www.amazon.com/dp/B0B6Y52YXB")}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-7 inline-block w-fit rounded-full bg-white px-7 py-3.5 font-display text-sm font-bold tracking-wider text-black transition hover:scale-[1.03]"
            >
              VIEW THE DEAL ON AMAZON ↗
            </a>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="border-t border-white/5 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              Player Reviews
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Trusted By The Lobby
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-violet-400/30"
              >
                <div className="text-amber-400">★★★★★</div>
                <blockquote className="mt-4 text-sm leading-relaxed text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-xs font-semibold tracking-wide text-violet-300">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
