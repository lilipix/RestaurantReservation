import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RestaurantApp",
  description: "Gestion des restaurants et réservations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
