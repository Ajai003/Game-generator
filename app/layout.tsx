import { Geist_Mono, Raleway, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const raleway = Raleway({ subsets: ["latin"], variable: "--font-heading" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Game Center — Ultimate Gaming Experience",
  description:
    "Step into the future of gaming. Book your slot, choose your game, and experience premium interactive entertainment at Game Center.",
  keywords: ["gaming", "game center", "esports", "VR gaming", "slot booking"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        inter.variable,
        raleway.variable
      )}
    >
      <body>
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
