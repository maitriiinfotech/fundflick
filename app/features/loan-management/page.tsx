import type { Metadata } from "next";
import LoanManagementContent from "./LoanManagementContent";

export const metadata: Metadata = {
  title: "Loan Management System (LMS)",
  description:
    "Fundflick Loan Management System — auto-generated reducing-balance EMI schedules, penalties, rescheduling, prepayments and fully reversible payments, all tracked to the paisa.",
  openGraph: {
    title: "Loan Management System (LMS) | Fundflick",
    description:
      "Fundflick Loan Management System — auto-generated reducing-balance EMI schedules, penalties, rescheduling, prepayments and fully reversible payments, all tracked to the paisa.",
  },
};

export default function Page() {
  return <LoanManagementContent />;
}
