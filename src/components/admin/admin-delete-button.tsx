"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminDeleteButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`حذف "${name}" نهائياً؟\nDelete "${name}" permanently?`)) {
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch {
      alert("تعذّر الحذف — Failed to delete. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 disabled:opacity-50"
      aria-label={`Delete ${name}`}
    >
      {deleting ? "…" : "🗑 حذف"}
    </button>
  );
}
