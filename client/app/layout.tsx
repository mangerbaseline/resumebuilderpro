// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Toaster } from "sonner";
// import "./globals.css";

// import { ThemeProvider } from "@/components/ThemeProvider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Resumen - Build Your Professional Resume",
//     description: "Create stunning resumes in minutes with our AI-powered builder.",
// };

// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//             <body className={inter.className}>
//                 <ThemeProvider>
//                     {children}
//                     <Toaster position="top-center" richColors />
//                 </ThemeProvider>
//             </body>
//         </html>
//     );
// }


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Resumen - Build Your Professional Resume",
    description: "Create stunning resumes in minutes with our AI-powered builder.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}