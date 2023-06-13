import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Family Dashboard",
  description: "A dashboard for my family",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="h-screen w-screen">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
