import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SignIn } from "./components/sign-in-google"
import { SignOut } from "./components/sign-out"
import { auth } from "./auth"
import { Toaster } from 'react-hot-toast';
import { isAdmin } from "./is-admin";
import { NavButton } from "./nav-button";

const font = Rubik({ subsets: ["hebrew", "latin"] });

export const metadata: Metadata = {
  title: "מתחם הרי הגלעד",
  manifest: "/manifest.json",
  description: "שלט לחניון",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

async function UserCard() {
  const session = await auth()
  if (session) {
    return  <>
      <div className="usercard">{session.user?.name}</div>
      {session.user?.id && await isAdmin(session.user.id) ? <NavButton /> : null} 
      <SignOut />
      </> 
  } else {
    return <div>מתחם הרי הגלעד</div>
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="he">
      <body className={font.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Analytics />
          <SpeedInsights />
          <Toaster />
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              <UserCard/>
            </div>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bgx-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
              By Amit P
              <Image
                src="/garage.svg"
                alt="Garage Logo"
                className="dark:invert"
                width={48}
                height={24}
                priority
              />
            </div>
          </div>

          {session ? <>{children}</> : <><div>שלום אורח, על מנת להמשיך עליך להזדהות</div><SignIn /></>}
          <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          </div>

          <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          </div>
        </main>

      </body>
    </html>
  );
}


