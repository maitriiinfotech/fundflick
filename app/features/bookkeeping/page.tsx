import type { Metadata } from "next";
import BookkeepingContent from "./BookkeepingContent";

export const metadata: Metadata = {
  alternates: { canonical: "/features/bookkeeping" },
  title: "Bookkeeping & Accounts",
  description:
    "Fundflick Bookkeeping & Accounts — auto-posted double-entry ledgers, GST and TDS worksheets, one-click trial balance, and bank reconciliation. Books that stay audit-ready.",
  openGraph: {
    title: "Bookkeeping & Accounts | Fundflick",
    description:
      "Fundflick Bookkeeping & Accounts — auto-posted double-entry ledgers, GST and TDS worksheets, one-click trial balance, and bank reconciliation. Books that stay audit-ready.",
  },
};

export default function Page() {
  return <BookkeepingContent />;
}
