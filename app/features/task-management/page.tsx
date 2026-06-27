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
    question: "How do I create tasks for today?",
    answer:
      "Simply click the 'Create Task' button, set the due date to today, assign a team member, and add a priority level. You can also use the Quick Task feature to instantly create tasks from the dashboard.",
  },
  {
    question: "Can I create tasks in bulk from a spreadsheet?",
    answer:
      "Yes! Upload a CSV or Excel file with task names, descriptions, assignees, and due dates. The system will auto-generate all tasks in one go. You can also use our bulk creator form for manual bulk creation.",
  },
  {
    question: "How does bulk task assignment work?",
    answer:
      "Select multiple tasks using checkboxes, click 'Bulk Assign', and choose individuals or teams from the dropdown. Tasks are instantly reassigned with full notification support.",
  },
  {
    question: "What reports are available?",
    answer:
      "Monthly and yearly reports include task completion rates, team productivity scores, overdue task analysis, workload distribution charts, and average task completion times. All reports can be exported as PDF.",
  },
  {
    question: "How do real-time notifications work?",
    answer:
      "Every task action — creation, assignment, status change, comment, or deadline breach — triggers instant in-app push notifications. You can customize which actions trigger notifications for each user.",
  },
  {
    question: "Can I configure different emails for different task actions?",
    answer:
      "Yes! Each task action (created, assigned, completed, overdue, commented) can have its own email template, recipient list, and trigger conditions. Configure per workflow or globally.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Absolutely! We offer a 14-day free trial with full access to all Task Management features. No credit card required — just sign up and start managing tasks.",
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
            Task &amp; workflow management that runs your operations — daily
            tasks, bulk assignments, reports and real-time alerts, all in one
            place.
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
