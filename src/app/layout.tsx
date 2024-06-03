"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
          <div className="flex w-full justify-end mr-64"></div>
          <div className="flex flex-row justify-around w-full">
            <div className="flex flex-col p-2 rounded-md h-96 w-96 text-white">
              <h1 className="text-8xl font-bold mb-2">Loyalty </h1>
              <h1 className="text-8xl font-bold mb-20 self-end">Points</h1>
              <p>Manage your loyalty program system</p>
              <p className="text-xs py-20">Made by Gabriel Fialho - @GFialho</p>
            </div>
            <div className="flex rounded-md bg-orange-500 p-4 shadow-md">
              <div className="flex flex-col bg-white rounded-md h-[520px] w-[96] p-4 relative">
                <div className="flex flex-row justify-between">
                  <Link
                    href="project"
                    className={`text-center w-1/2 ${
                      pathname === "/project" ? "bg-orange-400" : "bg-orange-200"
                    } absolute top-0 left-0 py-1 text-lg`}
                  >
                    Project
                  </Link>
                  <Link
                    href="/points"
                    className={`text-center w-1/2 ${
                      pathname === "/points" ? "bg-orange-400" : "bg-orange-200"
                    } absolute top-0 right-0 py-1 text-lg`}
                  >
                    Points
                  </Link>
                </div>
                <QueryClientProvider client={queryClient}>
                  <div className="mt-6">{children}</div>
                </QueryClientProvider>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
