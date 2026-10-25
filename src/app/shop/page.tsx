import { Suspense } from "react";
import { getCategories, getProducts, type SortOption } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import { ShopControls } from "@/components/shop-controls";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Armory — Shop All Gear | Nexus Arsenal",
};

type SearchParams = Promise<{
  category?: string;
  sort?: string;
  price?: string;
  q?: string;
}>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  if (params.price) {
    const [min, max] = params.price.split("-");
    if (min) minPrice = parseInt(min, 10) * 100;
    if (max) maxPrice = parseInt(max, 10) * 100;
  }

  const validSorts: SortOption[] = ["featured", "price-asc", "price-desc", "rating", "newest"];
  const sort = validSorts.includes(params.sort as SortOption)
    ? (params.sort as SortOption)
    : "featured";

  const [items, categories] = await Promise.all([
    getProducts({
      category: params.category,
      minPrice,
      maxPrice,
      q: params.q,
      sort,
    }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
          The Armory
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
          Shop All Gear
        </h1>
        <p className="mt-3 max-w-xl text-sm text-zinc-400">
          Every pick links directly to its Amazon listing — live pricing, Prime
          shipping, and Amazon&apos;s return policy. Filter down to your next
          upgrade.
        </p>
      </div>

      <Suspense>
        <ShopControls categories={categories} resultCount={items.length} />
      </Suspense>

      {items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10 text-4xl">
            🔍
          </div>
          <h2 className="font-display text-xl font-bold text-white">
            No loot found
          </h2>
          <p className="max-w-sm text-sm text-zinc-400">
            Nothing matches those filters. Try widening the price range or
            clearing the search.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
