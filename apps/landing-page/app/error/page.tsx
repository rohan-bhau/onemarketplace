import Link from "next/link";

interface ErrorPageProps {
  searchParams: Promise<{
    reason?: string;
  }>;
}

const Page = async ({ searchParams }: ErrorPageProps) => {
  const { reason } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center px-5 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold text-[#171916]">
          We couldn&apos;t finish creating your account
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#72766f]">
          {reason ?? "Something went wrong. Please try again."}
        </p>
        <Link
          href="/signup"
          className="mt-7 inline-flex rounded-xl bg-[#252724] px-5 py-3 text-sm font-semibold text-white"
        >
          Back to signup
        </Link>
      </div>
    </main>
  );
};

export default Page;
