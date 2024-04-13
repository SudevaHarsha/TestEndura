import { Open_Sans } from "next/font/google";
import "./globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ClerkProvider } from "@clerk/nextjs";
import { CurrentQuestionProvider } from "@/providers/CurrentQuestionContext.js";
import { TimerProvider } from "@/providers/TimerContext";
import { CurrentSessionProvider } from "@/providers/CurrentSessionContext";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Test Endura",
  description: "GRE Mock Tests Application By MJ Academy",
};

export default function RootLayout({ children }) {
  console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <CurrentQuestionProvider>
      <CurrentSessionProvider>
        <TimerProvider>
          <ClerkProvider>
            <html lang="en">
              <body className={font.className}>{children}</body>
            </html>
          </ClerkProvider>
        </TimerProvider>
      </CurrentSessionProvider>
    </CurrentQuestionProvider>
  );
}
