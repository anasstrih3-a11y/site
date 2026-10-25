"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { amazonLink } from "@/lib/amazon";

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-violet-400";

export function AdminForm({ categories }: { categories: string[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    amazonUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          price: parseFloat(form.price),
          description: form.description.trim(),
          category: form.category.trim(),
          image: form.image.trim(),
          amazonUrl: form.amazonUrl.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Failed to save the product.");
      setSuccess(
        `✅ تمت إضافة "${data.product.name}" بنجاح — Product added and live in the shop!`
      );
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
        amazonUrl: "",
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <h2 className="font-display text-xl font-bold text-white">
        ➕ إضافة منتج جديد <span className="text-zinc-500">/ Add Product</span>
      </h2>
      <p className="mt-1 text-xs text-zinc-500">
        يُحفظ مباشرة في قاعدة البيانات الحالية (SQLite) ويظهر في المتجر فوراً —
        Saved straight to the current database and appears in the shop instantly.
      </p>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-zinc-300">
            اسم المنتج (Product Name) <span className="text-rose-400">*</span>
          </label>
          <input
            required
            minLength={3}
            maxLength={200}
            value={form.name}
            onChange={set("name")}
            placeholder="Logitech G PRO X Superlight 2"
            className={inputCls}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-zinc-300">
              السعر (Price, USD) <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                $
              </span>
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                value={form.price}
                onChange={set("price")}
                placeholder="159.99"
                className={`${inputCls} pl-8`}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-zinc-300">
              القسم / الفئة (Category) <span className="text-rose-400">*</span>
            </label>
            <input
              required
              maxLength={60}
              list="admin-category-suggestions"
              value={form.category}
              onChange={set("category")}
              placeholder="Mice — اكتب قسماً جديداً أو اختر موجوداً"
              className={inputCls}
            />
            <datalist id="admin-category-suggestions">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-zinc-300">
            الوصف (Description) <span className="text-rose-400">*</span>
          </label>
          <textarea
            required
            rows={4}
            maxLength={5000}
            value={form.description}
            onChange={set("description")}
            placeholder="Why is this gear worth buying? Key specs, who it's for…"
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-zinc-300">
            رابط صورة المنتج (Image URL) <span className="text-rose-400">*</span>
          </label>
          <input
            required
            type="url"
            inputMode="url"
            value={form.image}
            onChange={set("image")}
            placeholder="https://m.media-amazon.com/images/I/....jpg"
            className={inputCls}
            dir="ltr"
          />
          {form.image.trim() && (
            <div className="mt-3 flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.image.trim()}
                alt="Image preview"
                className="h-16 w-16 rounded-lg border border-white/10 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                onLoad={(e) => {
                  (e.target as HTMLImageElement).style.display = "";
                }}
              />
              <p className="text-xs text-zinc-500">
                معاينة الصورة — Image preview. If nothing shows, check the link.
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-zinc-300">
            رابط شراء المنتج من أمازون (Amazon Affiliate Link){" "}
            <span className="text-rose-400">*</span>
          </label>
          <input
            required
            type="url"
            inputMode="url"
            value={form.amazonUrl}
            onChange={set("amazonUrl")}
            placeholder="https://www.amazon.com/dp/B09NBWL8J5"
            className={inputCls}
            dir="ltr"
          />
          <p className="mt-1.5 text-xs text-zinc-500">
            الصق رابط صفحة المنتج على أمازون — Paste the Amazon product page
            link. Your Associates tag (
            {process.env.NEXT_PUBLIC_AMAZON_TAG || "غير مضبوط / not set"}) يُضاف
            تلقائياً إن وُجد.
          </p>
          {form.amazonUrl.trim().startsWith("http") && (
            <a
              href={amazonLink(form.amazonUrl.trim())}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-2 inline-block text-xs font-semibold text-cyan-300 hover:text-cyan-200"
            >
              🔗 اختبر الرابط على أمازون ↗ (Test link — opens in new tab)
            </a>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-display text-sm font-bold tracking-wider text-white shadow-xl shadow-violet-900/40 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {submitting ? "جارٍ الحفظ… (Saving…)" : "إضافة المنتج (Add Product)"}
      </button>
    </form>
  );
}
