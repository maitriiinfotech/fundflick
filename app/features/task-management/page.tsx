import type { Metadata } from "next";
import TaskManagementContent from "./TaskManagementContent";

export const metadata: Metadata = {
  alternates: { canonical: "/features/task-management" },
  title: "Task Management Software",
  description:
    "Fundflick Task Management — real-time dashboards, recurring and bulk task assignment, approval workflows, and a client ledger that turns completed work into trackable billing.",
  openGraph: {
    title: "Task Management Software | Fundflick",
    description:
      "Fundflick Task Management — real-time dashboards, recurring and bulk task assignment, approval workflows, and a client ledger that turns completed work into trackable billing.",
  },
};

export default function Page() {
  return <TaskManagementContent />;
}
