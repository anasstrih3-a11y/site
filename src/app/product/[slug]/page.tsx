import { notFound, redirect } from "next/navigation";
import { getProductAmazonUrl } from "@/lib/queries";
import { amazonLink } from "@/lib/amazon";

export const dynamic = "force-dynamic";

// Nexus Arsenal is an Amazon affiliate storefront: there is no on-site
// product page or checkout. Any visit here goes straight to Amazon.
export default async function ProductRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const amazonUrl = await getProductAmazonUrl(slug);
  if (!amazonUrl) notFound();
  redirect(amazonLink(amazonUrl));
}
