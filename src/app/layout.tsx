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
import { NavButton } from "./components/nav-button";

const font = Rubik({ subsets: ["hebrew", "latin"] });

export const metadata: Metadata = {
  title: "מתחם הרי הגלעד",
  manifest: "/manifest.json",
  description: "שלט לחניון",
  appleWebApp: {
    capable: true,
    title: "מתחם הרי הגלעד",
    statusBarStyle: "black-translucent",
    startupImage: [
      { url: "/icons/apple-splash-2048-2732.jpg", media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2048-2732.jpg", media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2732-2048.jpg", media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1668-2388.jpg", media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2388-1668.jpg", media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1536-2048.jpg", media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2048-1536.jpg", media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1488-2266.jpg", media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2266-1488.jpg", media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1640-2360.jpg", media: "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2360-1640.jpg", media: "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1668-2224.jpg", media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2224-1668.jpg", media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1620-2160.jpg", media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2160-1620.jpg", media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1320-2868.jpg", media: "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2868-1320.jpg", media: "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1206-2622.jpg", media: "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2622-1206.jpg", media: "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1290-2796.jpg", media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2796-1290.jpg", media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1179-2556.jpg", media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2556-1179.jpg", media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1284-2778.jpg", media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2778-1284.jpg", media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1170-2532.jpg", media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2532-1170.jpg", media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1125-2436.jpg", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2436-1125.jpg", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1242-2688.jpg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2688-1242.jpg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-828-1792.jpg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-1792-828.jpg", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-1242-2208.jpg", media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/apple-splash-2208-1242.jpg", media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" },
      { url: "/icons/apple-splash-750-1334.jpg", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-1334-750.jpg", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
      { url: "/icons/apple-splash-640-1136.jpg", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/apple-splash-1136-640.jpg", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" },
    ]
  },
  icons: [
    { rel: "apple-touch-icon", url: "/icons/apple-icon-180.png" },
    { rel: "icon", url: "/icons/favicon-196.png" },
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
    return <>
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
              <UserCard />
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


