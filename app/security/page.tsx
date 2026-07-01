import type { Metadata } from "next";
import LegalPage from "../components/legal/LegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Security",
  description:
    "How Fundflick protects your data — encryption, access controls, audit trails, and compliance practices.",
  openGraph: {
    title: "Security | Fundflick",
    description:
      "How Fundflick protects your data — encryption, access controls, audit trails, and compliance practices.",
  },
};

export default function Page() {
  return (
    <LegalPage
      title="Security"
      updated="1 July 2026"
      intro="Security is built into every layer of Fundflick. This page outlines the technical and organisational measures we use to protect your data and keep the platform trustworthy."
      sections={[
        {
          heading: "Encryption",
          body: [
            "Data is encrypted in transit using TLS 1.3 and at rest using AES-256.",
            "Secrets and credentials are stored in dedicated, access-controlled key management.",
          ],
        },
        {
          heading: "Access Controls",
          body: [
            "Role-based access ensures each user sees only the data relevant to their role.",
            "Administrative access is restricted, logged, and reviewed on a regular basis.",
          ],
        },
        {
          heading: "Audit Trails",
          body: [
            "Key actions across lending, collections, HR, and accounts are captured in immutable audit logs to support compliance and investigation.",
          ],
        },
        {
          heading: "Data Isolation",
          body: [
            "Customer data is logically isolated so that one organisation’s data is never exposed to another.",
          ],
        },
        {
          heading: "Reporting a Vulnerability",
          body: [
            "If you believe you have found a security issue, please contact our team so we can investigate and respond quickly.",
          ],
        },
      ]}
    />
  );
}
