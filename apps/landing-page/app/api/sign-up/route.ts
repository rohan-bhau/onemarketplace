import { createClerkClient, verifyToken } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const roles = ["client", "freelancer"] as const;
type SignupRole = (typeof roles)[number];

function redirectToError(request: NextRequest, reason: string) {
  const errorUrl = new URL("/error", request.url);
  errorUrl.searchParams.set("reason", reason);

  return NextResponse.redirect(errorUrl);
}

const isSignupRole = (value: string | null): value is SignupRole => {
  return roles.some((role) => role === value);
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const role = request.nextUrl.searchParams.get("role");

  const secretKey = process.env.CLERK_SECRET_KEY;

  if (!token || !role) {
    return redirectToError(request, "Missing Signup details");
  }

  if (!isSignupRole(role)) {
    return redirectToError(request, "Invalid role");
  }

  if (!secretKey) {
    console.log("CLERK_SECRET_KEY is not configured");
    return redirectToError(request, "Authentication unavailable");
  }

  try {
    const claims = await verifyToken(token, {
      secretKey,
    });

    const clerk = createClerkClient({ secretKey });

    const user = await clerk.users.getUser(claims.sub);

    if (user.unsafeMetadata.role !== role) {
      return redirectToError(request, "Role mismatched");
    }
  } catch (error) {
    console.log("Clerk signup verification failed", error);
    return redirectToError(request, "Invalid or expired token.");
  }

  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/sign-up`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
        cache: "no-store",
      },
    );

    if (!backendResponse.ok) {
      const backendBody = (await backendResponse.json().catch(() => null)) as {
        message?: unknown;
      } | null;
      const backendMessage =
        typeof backendBody?.message === "string"
          ? backendBody.message
          : `Backend signup failed with status ${backendResponse.status}.`;

      console.error(
        "Backend signup failed",
        backendResponse.status,
        backendMessage,
      );
      return redirectToError(request, backendMessage);
    }

    const dashboardUrl =
      role === "client"
        ? process.env.CLIENT_DASHBOARD
        : process.env.FREELANCER_DASHBOARD;

    return NextResponse.redirect(new URL("/profile/edit", dashboardUrl), 303);
  } catch (error) {
    console.log(`Backend signup forwarding failed`, error);
    return redirectToError(request, "Backend signup failed.");
  }
}
