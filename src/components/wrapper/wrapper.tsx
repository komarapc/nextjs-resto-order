import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function BodyWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className={`${inter.className} w-full min-h-screen bg-neutral-200 flex flex-col`}
    >
      {children}
    </div>
  );
}
