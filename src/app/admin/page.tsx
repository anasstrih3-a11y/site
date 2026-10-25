import Link from "next/link";
import { getCategories, getProducts } from "@/lib/queries";
import { amazonLink } from "@/lib/amazon";
import { formatPrice } from "@/lib/format";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "لوحة التحكم — Admin | Nexus Arsenal",
};

export default async function AdminPage() {
  const [items, categories] = await Promise.all([
    getProducts({ sort: "newest" }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
        Admin Panel — لوحة التحكم
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-white">
        إدارة المنتجات
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        أضف منتجات أمازون بنفسك — تظهر في المتجر فور حفظها.{" "}
        <span className="text-zinc-500">
          Add Amazon products yourself — they go live in the shop instantly.
        </span>
      </p>

      <div className="mt-10">
        <AdminForm categories={categories} />
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-white">
            المنتجات الحالية ({items.length}){" "}
            <span className="text-base font-normal text-zinc-500">
              / Current products
            </span>
          </h2>
          <Link
            href="/shop"
            className="text-sm font-semibold text-violet-300 transition hover:text-white"
          >
            عرض المتجر ← / View shop
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-zinc-400">
            لا توجد منتجات بعد — أضف أول منتج من النموذج أعلاه.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-zinc-400">
                  <th className="px-4 py-3">الصورة / Image</th>
                  <th className="px-4 py-3">الاسم / Name</th>
                  <th className="px-4 py-3">القسم / Category</th>
                  <th className="px-4 py-3">السعر / Price</th>
                  <th className="px-4 py-3">أمازون / Amazon</th>
                  <th className="px-4 py-3">إجراء / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((p) => (
                  <tr key={p.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-12 w-12 rounded-lg border border-white/10 object-cover"
                      />
                    </td>
                    <td className="max-w-[260px] px-4 py-3">
                      <p className="truncate font-medium text-white">{p.name}</p>
                      <p className="truncate font-mono text-[11px] text-zinc-500">
                        /product/{p.slug} →
                      </p>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{p.category}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-white">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={amazonLink(p.amazonUrl)}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                      >
                        فتح ↗ / Open
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <AdminDeleteButton id={p.id} name={p.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
