import Link from "next/link";

const errorMessages: Record<string, string> = {
  missing_signup_details: "Your signup details are missing. Please try again.",
  invalid_role: "The role you selected is invalid. Please try again.",
  authentication_unavailable:
    "Authentication is currently unavailable. Please try again later.",
  role_mismatched:
    "The role you selected does not match your account. Please try again.",
  invalid_or_expired_token:
    "Your signup token is invalid or has expired. Please try again.",
  backend_signup_failed:
    "We couldn't create your account. Please try again later.",
};

interface ErrorPageProps {
  searchParams: Promise<{
    reason?: string;
  }>;
}

const Page = async ({ searchParams }: ErrorPageProps) => {
  const { reason } = await searchParams;
  const message =
    errorMessages[reason ?? ""] ?? "Something went wrong. Please try again.";

  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfcfa] px-6">
      <section className="w-full max-w-md rounded-3xl border border-black/80 bg-white p-8 text-center shadow-[0_24px_70px_rgba(31,38,29,0.08)]">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#fff0ee] text-xl text-[#a04f47]">
          !
        </span>
        <h1 className=" mt-6 text-3xl font-semibold tracking-tight text-[#20231f]">
          We couldn&apos;t create your account.
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#72766f]">{message}</p>
        <Link
          href="/signup"
          className="mt-7 inline-flex rounded-xl bg-[#252724] px-5 py-3 text-sm font-semibold text-white"
        >
          Back to signup
        </Link>
      </section>
    </main>
  );
};

export default Page;
