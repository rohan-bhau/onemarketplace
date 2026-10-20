"use client";

import { Icon } from "@iconify/react";

export function JobPostsListSkeleton() {
  return (
    <div className="mt-8 grid gap-4" aria-hidden="true">
      {[0, 1].map((item) => (
        <article
          key={item}
          className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="h-5 w-12 animate-pulse rounded-full bg-[#e7f2e4]" />
                <span className="h-3 w-24 animate-pulse rounded-full bg-[#eef0eb]" />
              </div>
              <div className="mt-3 h-5 w-2/3 animate-pulse rounded-lg bg-[#e6e9e3]" />
              <div className="mt-3 h-3 w-1/2 animate-pulse rounded-lg bg-[#eef0eb]" />
            </div>
            <div className="flex items-start justify-end gap-2">
              <span className="h-10 w-16 animate-pulse rounded-xl bg-[#eef0eb]" />
              <span className="h-10 w-28 animate-pulse rounded-xl bg-[#e6e9e3]" />
            </div>
          </div>
          <div className="mt-5 grid gap-2">
            <span className="h-3 w-full animate-pulse rounded-lg bg-[#eef0eb]" />
            <span className="h-3 w-4/5 animate-pulse rounded-lg bg-[#eef0eb]" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["w-16", "w-20", "w-14", "w-24"].map((width) => (
              <span
                key={width}
                className={`h-7 animate-pulse rounded-lg bg-[#f0f3ee] ${width}`}
              />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-black/7 pt-4 sm:max-w-md">
            {["Proposals", "shortlisted", "Hires"].map((label) => (
              <div key={label}>
                <div className="h-4 w-8 animate-pulse rounded bg-[#e6e9e3]" />
                <div className="mt-1.5 h-2.5 w-14 animate-pulse rounded bg-[#eef0eb]" />
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function EditJobPostSkeleton() {
  return (
    <div aria-hidden="true">
      <div>
        <span className="inline-block h-3 w-28 animate-pulse rounded bg-[#eef0eb]" />
        <div className="mt-6 h-3 w-16 animate-pulse rounded bg-[#eef0eb]" />
        <div className="mt-3 h-9 w-64 animate-pulse rounded-lg bg-[#e6e9e3]" />
        <div className="mt-3 h-3 w-80 max-w-full animate-pulse rounded bg-[#eef0eb]" />
      </div>

      <div className="mt-8 grid gap-5">
        <FormSectionSkeleton>
          <span className="block h-11 animate-pulse rounded-xl bg-[#eef0eb]" />
          <span className="block h-36 animate-pulse rounded-xl bg-[#eef0eb]" />
          <div className="grid gap-4 sm:grid-cols-2">
            <span className="h-11 animate-pulse rounded-xl bg-[#eef0eb]" />
            <span className="h-11 animate-pulse rounded-xl bg-[#eef0eb]" />
          </div>
          <span className="block h-10 animate-pulse rounded-xl bg-[#f3f5f1]" />
        </FormSectionSkeleton>

        <FormSectionSkeleton>
          <span className="block h-11 animate-pulse rounded-xl bg-[#eef0eb]" />
          <div className="flex flex-wrap gap-2">
            {["w-20", "w-24", "w-16"].map((width) => (
              <span
                key={width}
                className={`h-7 animate-pulse rounded-full bg-[#edf3ea] ${width}`}
              />
            ))}
          </div>
        </FormSectionSkeleton>

        <FormSectionSkeleton>
          <span className="block h-16 animate-pulse rounded-xl bg-[#f2f5ef]" />
          <div className="grid gap-3">
            {[0, 1].map((row) => (
              <div
                key={row}
                className="grid items-start gap-3 rounded-xl border border-black/7 p-4 sm:grid-cols-[minmax(0,1fr)_170px_170px_auto]"
              >
                <span className="h-10 animate-pulse rounded-lg bg-[#eef0eb]" />
                <span className="h-10 animate-pulse rounded-lg bg-[#eef0eb]" />
                <span className="h-10 animate-pulse rounded-lg bg-[#eef0eb]" />
                <span className="mt-6 h-10 w-10 animate-pulse rounded-lg bg-[#f4eeee]" />
              </div>
            ))}
          </div>
          <span className="inline-block h-10 w-32 animate-pulse rounded-xl bg-[#eef0eb]" />
        </FormSectionSkeleton>

        <FormSectionSkeleton>
          <div className="flex gap-2">
            <span className="h-11 min-w-0 flex-1 animate-pulse rounded-xl bg-[#eef0eb]" />
            <span className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-[#eef0eb]" />
          </div>
          <span className="inline-block h-10 w-32 animate-pulse rounded-xl bg-[#eef0eb]" />
          <span className="block h-24 animate-pulse rounded-xl border border-dashed border-black/15 bg-[#f7f9f5]" />
        </FormSectionSkeleton>

        <div className="sticky bottom-4 flex justify-end gap-2 rounded-2xl border border-black/8 bg-white/95 p-4 shadow-[0_12px_40px_rgba(28,35,28,.12)] backdrop-blur">
          <span className="h-11 w-28 animate-pulse rounded-xl bg-[#eef0eb]" />
          <span className="h-11 w-32 animate-pulse rounded-xl bg-[#e6e9e3]" />
        </div>
      </div>
    </div>
  );
}

export function JobPostsErrorState({
  message,
  title = "Something went wrong",
  onRetry,
}: {
  message: string;
  title?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-[#e5d0d0] bg-[#fdf9f9] p-8 text-center sm:p-10">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8eeee] text-[#a85252]">
        <Icon icon="solar:danger-circle-linear" width="24" />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-[#5f4040]">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-[#8a6f6f]">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[#e5d0d0] bg-white px-4 text-xs font-semibold text-[#5f4040] transition hover:border-[#c9a9a9] hover:bg-[#fdf4f4]"
        >
          <Icon icon="solar:refresh-linear" width="15" />
          Try again
        </button>
      )}
    </div>
  );
}

function FormSectionSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid gap-5 rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <header>
        <div className="h-4 w-40 animate-pulse rounded bg-[#e6e9e3]" />
        <div className="mt-2 h-3 w-72 max-w-full animate-pulse rounded bg-[#eef0eb]" />
      </header>
      <div className="grid gap-5 border-t border-black/7 pt-5">{children}</div>
    </section>
  );
}
