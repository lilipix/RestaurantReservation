import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
      <body>
        {" "}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link
              href="/accueil"
              className="text-3xl font-bold text-orange-600"
            >
              RestaurantApp
            </Link>
            <div className="space-x-4">
              <Link
                href="/restaurants"
                className="text-gray-600 hover:text-gray-900"
              >
                Restaurants
              </Link>
              <Link href="/users" className="text-gray-600 hover:text-gray-900">
                Utilisateurs
              </Link>
              <Link
                href="/reservations"
                className="text-gray-600 hover:text-gray-900"
              >
                Réservations
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
