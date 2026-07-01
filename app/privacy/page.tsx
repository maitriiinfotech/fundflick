import type { Metadata } from "next";
import LegalPage from "../components/legal/LegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How Fundflick collects, uses, and protects your data across our lending, HR, collections and reporting platform.",
  openGraph: {
    title: "Privacy Policy | Fundflick",
    description:
      "How Fundflick collects, uses, and protects your data across our lending, HR, collections and reporting platform.",
  },
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 July 2026"
      intro="Fundflick is committed to protecting the privacy of lenders, borrowers, and every user of our platform. This policy explains what data we collect, why we collect it, and the controls you have over it."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "Account details you provide during onboarding — name, organisation, email, phone number, and role.",
            "Operational data your team enters, such as loan records, collections activity, HR entries, and tasks.",
            "Technical data automatically captured, including device, browser, IP address, and usage logs.",
          ],
        },
        {
          heading: "How We Use Your Data",
          body: [
            "To provide, maintain, and improve the Fundflick platform and its modules.",
            "To secure accounts, prevent fraud, and meet our legal and regulatory obligations.",
            "To communicate service updates, respond to support requests, and share relevant product information.",
          ],
        },
        {
          heading: "Data Sharing",
          body: [
            "We do not sell your data. We share it only with trusted processors that help us run the service, and only under strict contractual safeguards.",
            "We may disclose data where required by law, regulation, or a valid legal request.",
          ],
        },
        {
          heading: "Data Retention",
          body: [
            "We retain data for as long as your account is active or as needed to meet legal, accounting, and reporting requirements. You can request deletion subject to those obligations.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            "You may access, correct, export, or request deletion of your personal data. Contact us to exercise any of these rights.",
          ],
        },
      ]}
    />
  );
}
