import type { ProductWithRating } from "@/lib/queries";
import { compactCount, formatPrice } from "@/lib/format";
import { amazonLink } from "@/lib/amazon";
import { StarRating } from "./star-rating";

export function ProductCard({ product }: { product: ProductWithRating }) {
  const url = amazonLink(product.amazonUrl);
  const discount = product.compareAtPrice
    ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-950/40">
      <a
        href={url}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="relative aspect-[4/3] overflow-hidden bg-zinc-900"
        aria-label={`${product.name} on Amazon (opens in new tab)`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.badge && (
            <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-cyan-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow">
              -{discount}%
            </span>
          )}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-400">
          {product.category}
        </p>
        <a
          href={url}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="mt-1"
        >
          <h3 className="font-display text-base font-bold leading-snug text-white transition group-hover:text-violet-200">
            {product.name}
          </h3>
        </a>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-zinc-500">
            {product.rating.toFixed(1)} ({compactCount(product.ratingCount)}) on
            Amazon
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-lg font-bold text-white">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-xs text-zinc-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : (
              <p className="text-xs text-zinc-600">Price on Amazon</p>
            )}
          </div>
          <a
            href={url}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 active:scale-95"
          >
            Buy on Amazon ↗
          </a>
        </div>
      </div>
    </div>
  );
}
