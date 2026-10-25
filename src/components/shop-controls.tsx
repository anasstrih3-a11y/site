"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const PRICE_RANGES = [
  { value: "", label: "Any price" },
  { value: "0-100", label: "Under $100" },
  { value: "100-250", label: "$100 – $250" },
  { value: "250-600", label: "$250 – $600" },
  { value: "600-", label: "$600+" },
];

export function ShopControls({
  categories,
  resultCount,
}: {
  categories: string[];
  resultCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "All";
  const sort = searchParams.get("sort") ?? "featured";
  const price = searchParams.get("price") ?? "";
  const q = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(q);

  useEffect(() => setSearch(q), [q]);

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "All" && value !== "featured") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/shop${params.size ? `?${params}` : ""}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-5">
      {/* search + sort row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setParam("q", search.trim());
          }}
          className="relative w-full sm:max-w-xs"
        >
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gear…"
            className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-violet-400"
          />
        </form>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-zinc-500 md:inline">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </span>
          <select
            value={price}
            onChange={(e) => setParam("price", e.target.value)}
            className="rounded-full border border-white/15 bg-[#12121c] px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-400"
            aria-label="Filter by price"
          >
            {PRICE_RANGES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            className="rounded-full border border-white/15 bg-[#12121c] px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-400"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* category pills */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setParam("category", c)}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
              category === c
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/40"
                : "border border-white/15 bg-white/5 text-zinc-300 hover:border-violet-400/40 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
        {(category !== "All" || price || q || sort !== "featured") && (
          <button
            onClick={() => router.push("/shop", { scroll: false })}
            className="rounded-full px-4 py-2 text-xs font-semibold text-rose-300 transition hover:text-rose-200"
          >
            ✕ Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
