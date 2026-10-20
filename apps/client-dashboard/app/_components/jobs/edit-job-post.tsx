"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { InitialJobPost, JobPostForm } from "./job-post-form";
import { EditJobPostSkeleton, JobPostsErrorState } from "./job-posts-feedback";
import Link from "next/link";
import { Icon } from "@iconify/react";

type JobPostResponse = {
  id: string;
  title: string;
  description: string;
  expertise_level: string;
  expected_duration: string;
  skills: string[];
  milestones: { title: string; budget: number; dueDate: string }[];
  screening_questions: string[] | null;
  attachments: InitialJobPost["attachments"] | null;
  status: string;
};

const EditJobPost = ({ jobId }: { jobId: string }) => {
  const { getToken } = useAuth();
  const {
    data: job,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["client-job-post", jobId],
    queryFn: async () => {
      const token = await getToken();

      if (!token) throw new Error("Your session has expired.");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/jobs/${jobId}?role=client`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Job posts could not load");

      return result.data as JobPostResponse;
    },
  });

  if (isLoading) return <EditJobPostSkeleton />;
  if (error)
    return (
      <JobPostsErrorState
        title="Could not load job post"
        message={error.message}
        onRetry={() => void refetch()}
      />
    );
  if (!job)
    return (
      <JobPostsErrorState
        title="Job post not found"
        message="This job post does not exist or is no longer available."
      />
    );

  if (job.status === "HIRED") return <LockedJob />;

  const initialJob: InitialJobPost = {
    id: job.id,
    title: job.title,
    description: job.description,
    level: job.expertise_level,
    duration: job.expected_duration,
    skills: job.skills,
    milestones: job.milestones.map(({ title, budget, dueDate }) => ({
      title,
      amount: budget,
      due: dueDate,
    })),
    screeningQuestions: job.screening_questions ?? [],
    attachments: job.attachments ?? [],
  };

  return <>
    <PageHeader />
    <JobPostForm initialJob={initialJob} />
  </>;
};

function PageHeader () {
    return (
      <div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f]"
        >
          <Icon icon="solar:arrow-left-linear" width="15" />
          Back to job posts
        </Link>
        <p className="mt-6 text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
          Hiring
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
          Edit job post
        </h1>
        <p className="mt-2 text-sm text-[#72776f]">
          Update the scope, requirements, and milestones before making a hire.
        </p>
      </div>
    );
}

function LockedJob () {
    return <section className="mx-auto max-w-2xl rounded-2xl border border-black/8 bg-white p-7 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1f0e7] text-[#766f47]">
            <Icon icon="solar:lock-keyhole-linear" width="30" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold"> This job post is locked </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#737970]">
            You hired talent from this job post, so it can no longer be edited.
        </p>
        <Link href="/contracts" className="mt-6 inline-flex h-11 rounded-xl bg-[#252724]" >View Contacts</Link>
    </section>
}

export default EditJobPost;
