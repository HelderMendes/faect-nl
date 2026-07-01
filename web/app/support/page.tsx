import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support — Faect",
  description: "Deze pagina is verplaatst naar Help & Ondersteuning.",
  path: "/support",
  noIndex: true,
});

export default function SupportRedirectPage() {
  redirect("/help-en-ondersteuning");
}
