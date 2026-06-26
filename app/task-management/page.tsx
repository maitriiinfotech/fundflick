"use client";

import React from "react";
import RevealHero from "../components/ui/RevealHero";
import TaskFeatures from "../components/task/TaskFeatures";
import ReusableShowcase, {
  ShowcaseTab,
} from "../components/ui/ReusableShowcase";
import TaskCTA from "../components/task/TaskCTA";
import ReusableFAQ from "../components/ui/ReusableFAQ";

const TASK_SHOWCASE_TABS: ShowcaseTab[] = [
  {
    label: "Task Dashboard",
    title: "Kanban Boards That Keep You Moving",
    description:
      "Visualize all tasks across stages — To Do, In Progress, Review, and Done. Drag-and-drop cards, filter by assignee or priority, and never lose track.",
    img: "/task-dashboard.png",
  },
  {
    label: "Bulk Operations",
    title: "Create & Assign Hundreds of Tasks in Seconds",
    description:
      "Upload CSV or use the bulk creator to generate and assign tasks in one action. Perfect for sprint planning, project kickoffs, and mass operations.",
    img: "/task-bulk-assign.png",
  },
  {
    label: "Reports & Analytics",
    title: "Monthly & Yearly Task Intelligence",
    description:
      "Rich analytics with task completion rates, team productivity scores, bottleneck analysis, and workload distribution. Export as PDF for management review.",
    img: "/task-reports.png",
  },
  {
    label: "Notifications",
    title: "Real-time Alerts on Every Action",
    description:
      "Instant push notifications and configurable email alerts on every task event — assignments, status changes, comments, deadline breaches, and completions.",
    img: "/task-notifications.png",
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

      {/* Tabbed Showcase — reusable, cool theme */}
      <ReusableShowcase
        heading="Your tasks, your way."
        headingHighlight="Fundflick handles it all"
        subtitle="Powerful task management built for modern teams"
        tabs={TASK_SHOWCASE_TABS}
        theme="cool"
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
