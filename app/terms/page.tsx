import type { Metadata } from "next";
import LegalPage from "../components/legal/LegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Fundflick platform — accounts, acceptable use, billing, and liability.",
  openGraph: {
    title: "Terms of Service | Fundflick",
    description:
      "The terms that govern your use of the Fundflick platform — accounts, acceptable use, billing, and liability.",
  },
};

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="1 July 2026"
      intro="These terms govern your access to and use of the Fundflick platform. By creating an account or using the service, you agree to the terms set out below."
      sections={[
        {
          heading: "Accounts",
          body: [
            "You are responsible for the accuracy of the information on your account and for keeping your credentials secure.",
            "You must notify us promptly of any unauthorised access or suspected breach of your account.",
          ],
        },
        {
          heading: "Acceptable Use",
          body: [
            "Use the platform only for lawful business purposes and in line with applicable lending and data regulations.",
            "Do not attempt to disrupt, reverse-engineer, or gain unauthorised access to the service or its data.",
          ],
        },
        {
          heading: "Billing & Subscriptions",
          body: [
            "Paid plans are billed on the cycle agreed at signup. Fees are non-refundable except where required by law.",
            "We may update pricing with reasonable notice before the change takes effect for your account.",
          ],
        },
        {
          heading: "Service Availability",
          body: [
            "We work to keep Fundflick available and reliable, but the service is provided on an “as is” basis without uptime guarantees beyond any separate service agreement.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "To the extent permitted by law, Fundflick is not liable for indirect or consequential losses arising from use of the platform.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "You may stop using the service at any time. We may suspend or terminate access for breach of these terms, subject to applicable notice.",
          ],
        },
      ]}
    />
  );
}
