import type { Metadata } from "next";
import LoanOriginationContent from "./LoanOriginationContent";

export const metadata: Metadata = {
  alternates: { canonical: "/features/loan-origination" },
  title: "Loan Origination System (LOS)",
  description:
    "Fundflick Loan Origination System — 8-step digital applications with OCR KYC, CIBIL checks, tele-verification, and a clean salesman-to-manager approval flow with login-fee collection.",
  openGraph: {
    title: "Loan Origination System (LOS) | Fundflick",
    description:
      "Fundflick Loan Origination System — 8-step digital applications with OCR KYC, CIBIL checks, tele-verification, and a clean salesman-to-manager approval flow with login-fee collection.",
  },
};

export default function Page() {
  return <LoanOriginationContent />;
}
