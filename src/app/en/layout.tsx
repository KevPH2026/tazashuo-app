import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "TaZhaShuo — See What They'd Say",
  description: "AI persona mind-framework platform. Enter a name. Let Jobs, Musk, Munger, Zhang Yiming work for you. Not imitation. Mind framework extraction.",
}

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${inter.variable} font-sans antialiased`}>
      {children}
    </div>
  )
}
