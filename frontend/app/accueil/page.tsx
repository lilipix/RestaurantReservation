"use client";

import Link from "next/link";

export default function AccueilPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-orange-600">RestaurantApp</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Bienvenue sur RestaurantApp
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Découvrez les meilleurs restaurants et réservez votre table facilement
          </p>

          {/* Menu de navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Restaurants */}
            <Link href="/restaurants">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Restaurants</h3>
                <p className="text-gray-600">
                  Explorez notre sélection de restaurants
                </p>
              </div>
            </Link>

            {/* Utilisateurs */}
            <Link href="/users">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Utilisateurs</h3>
                <p className="text-gray-600">
                  Gérez les profils utilisateur
                </p>
              </div>
            </Link>

            {/* Réservations */}
            <Link href="/reservations">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Réservations</h3>
                <p className="text-gray-600">
                  Consultez vos réservations
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
