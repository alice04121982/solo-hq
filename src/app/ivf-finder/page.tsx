import { redirect } from "next/navigation";

/** /ivf-finder is merged into /clinics — redirect preserves nothing. */
export default function IvfFinderRedirect() {
  redirect("/clinics");
}
