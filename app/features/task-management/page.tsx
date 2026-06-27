"use client";

import React from "react";
import RevealHero from "../../components/ui/RevealHero";
import TaskFeatures from "../../components/task/TaskFeatures";
import ReusableShowcase, {
  ShowcaseTab,
} from "../../components/ui/ReusableShowcase";
import TaskCTA from "../../components/task/TaskCTA";
import ReusableFAQ from "../../components/ui/ReusableFAQ";

const TASK_SHOWCASE_TABS: ShowcaseTab[] = [
  {
    label: "Task Dashboard",
    title: "Real-Time Visibility Into Every Task, Instantly",
    description:
      "Get a 360° view of your team's task health from a single dashboard. Monitor pending, in-progress, overdue, and completed tasks with priority-wise breakdowns and completion analytics — for both individuals and teams.",
    img: "/task-dashboard.png",
  },
  {
    label: "Task Manager",
    title: "Manage & Track All Your Tasks in One Place",
    description:
      "Create, assign, and track tasks across your team with powerful filters and real-time status updates. Pin important tasks, filter by assignment type, and never lose sight of what's due.",
    img: "/task_management.png",
  },
  {
    label: "Manage Tasks",
    title: "Admin-Level Control Over Scheduled & Recurring Tasks",
    description:
      "Give managers full oversight of upcoming and scheduled tasks. Edit, delete, or trigger repeating tasks — all with granular permission controls to match your org structure.",
    img: "/task-notifications.png",
  },
  {
    label: "Bulk Tasks",
    title: "Assign Tasks to Entire Teams in Seconds",
    description:
      "Stop creating tasks one by one. With bulk task creation, assign department-wide or service-level tasks to multiple employees at once — with repeat schedules and priority settings built in.",
    img: "/task-bulk-assign.png",
  },
  {
    label: "Client Ledger",
    title: "Turn Completed Tasks Into Trackable Client Billing",
    description:
      "Every completed client-linked task auto-generates a ledger entry. Track invoice status, record payments, and filter by date range — so billing never falls through the cracks.",
    img: "/task-reports.png",
  },
];

const TASK_FAQ = [
  {
    question: "What does the task dashboard show?",
    answer:
      "The dashboard gives a real-time view of task health for both individuals and teams, breaking down pending, in-progress, overdue, and completed tasks. It includes priority-wise breakdowns and completion analytics in one place.",
  },
  {
    question: "How do I track and filter tasks in the task manager?",
    answer:
      "The task manager lets you create, assign, and track tasks across your team with filters by status and assignment type. You can pin important tasks and follow real-time status updates so nothing due slips past you.",
  },
  {
    question: "Can I schedule recurring tasks?",
    answer:
      "Yes. The Manage Tasks view gives managers oversight of upcoming and scheduled tasks, including editing, deleting, or triggering recurring tasks. Granular permission controls let you match access to your org structure.",
  },
  {
    question: "How does bulk task assignment work?",
    answer:
      "Bulk task creation lets you assign department-wide or service-level tasks to multiple employees at once instead of one at a time. You can set repeat schedules and priority levels as part of the same bulk action.",
  },
  {
    question: "How does the client ledger connect tasks to billing?",
    answer:
      "Every completed client-linked task automatically generates a ledger entry. From there you can track invoice status, record payments, and filter entries by date range.",
  },
  {
    question: "Does the dashboard support both individuals and teams?",
    answer:
      "Yes. You can monitor task health at the individual level and the team level from the same dashboard. Each view includes priority breakdowns and completion analytics for clear visibility.",
  },
];

export default function TaskManagementPage() {
  return (
    <div
      className="min-h-screen bg-white text-slate-900 pb-20 relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Hero Section — cinematic image-reveal (same as HRMS) */}
      <RevealHero
        heroIndex={3}
        heading={
          <>
            Run your operations on tasks — real-time individual and team
            dashboards, a full task manager with filters, scheduled and
            recurring tasks, bulk team assignment, and a client ledger that
            turns completed work into billing.
          </>
        }
        socialLabel="Get started"
        links={[
          { label: "Start free trial", href: "/contactus" },
          { label: "Book a demo", href: "/contactus" },
        ]}
      />

      {/* Features Grid */}
      <TaskFeatures />

      {/* Tabbed Showcase — reusable, warm theme */}
      <ReusableShowcase
        heading="Assign to complete?"
        headingHighlight="We track it all."
        subtitle="End-to-end task management — from creation to client billing"
        tabs={TASK_SHOWCASE_TABS}
        theme="warm"
        ctaText="Book a Demo"
      />

      {/* FAQ Section */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about Fundflick Task Management."
        items={TASK_FAQ}
      />

      {/* CTA Section */}
      <TaskCTA />
    </div>
  );
}
