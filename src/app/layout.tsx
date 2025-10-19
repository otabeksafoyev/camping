import "../styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Sayohat Blog",
  description: "Sayohat va lager haqida maqolalar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
