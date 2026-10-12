"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientSidebarNavigation } from "./navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

export function ClientSidebar() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const pathname = usePathname();

  const { data: profileMetaData, isPending: profileMetaDataLoading } = useQuery(
    {
      queryKey: ["profile-metadata", user?.id],
      enabled: isLoaded && !!user,
      queryFn: async () => {
        const token = await getToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/client/profile?role=client`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "The client profile could not be loaded.",
          );
        }

        return result.data;
      },
    },
  );

  const isUserLoading = !isLoaded;
  const isProfileLoading = !isLoaded || (!!user && profileMetaDataLoading);

  return (
    <aside className="hidden xl:sticky xl:top-24 xl:block">
      <section className="rounded-2xl border border-black/8 bg-white p-5">
        <div className="flex items-center gap-3">
          {/* Avatar skeleton */}
          {isUserLoading ? (
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
          ) : user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.fullName || "Client avatar"}
              width={60}
              height={60}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#edf4ea]">
              <Icon
                icon="solar:user-rounded-bold"
                width={24}
                className="text-[#52784f]"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            {/* Name skeleton */}
            {isUserLoading ? (
              <div className="h-4 w-28 animate-pulse rounded-md bg-gray-200" />
            ) : (
              <h2 className="truncate text-sm font-semibold">
                {user?.fullName || "Client"}
              </h2>
            )}

            {/* Company skeleton */}
            {isProfileLoading ? (
              <div className="mt-2 h-3 w-24 animate-pulse rounded-md bg-gray-200" />
            ) : (
              <p className="mt-1 truncate text-xs text-[#858a82]">
                {profileMetaData?.companyName || "No company added"}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 border-t border-black/7 pt-4">
          <p className="text-[10px] font-semibold tracking-[.12em] text-[#6e826c] uppercase">
            Client account
          </p>

          <Link
            href="/profile"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f] hover:underline"
          >
            View profile
            <Icon icon="solar:arrow-right-up-linear" width="14" />
          </Link>
        </div>
      </section>

      <nav className="mt-5 rounded-2xl border border-black/8 bg-white p-2">
        {clientSidebarNavigation.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                active
                  ? "bg-[#edf4ea] text-[#4e774b]"
                  : "text-[#686d65] hover:bg-black/3"
              }`}
            >
              <Icon
                icon={
                  active ? item.icon.replace("-linear", "-bold") : item.icon
                }
                width="19"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
