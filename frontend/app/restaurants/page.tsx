import Link from "next/link";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant } from "@/app/types";

async function RestaurantsPage() {
  const restaurants: Restaurant[] = await RestaurantService.getAllRestaurants();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/accueil" className="text-3xl font-bold text-orange-600">
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

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Restaurants</h1>
          <Link
            href="/restaurants/create"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Ajouter un restaurant
          </Link>
        </div>

        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun restaurant trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id}>
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {restaurant.name}
                  </h2>
                  <p className="text-gray-600 mb-1">📍 {restaurant.borough}</p>
                  <p className="text-gray-600 mb-1">🍽️ {restaurant.cuisine}</p>
                  {restaurant.reservations &&
                  restaurant.reservations.length > 0 ? (
                    <p className="text-sm text-orange-600">
                      {restaurant.reservations.length} réservation(s)
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">Aucune réservation</p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/restaurants/${restaurant._id}`}
                      className="flex-1 bg-gray-800 text-white px-3 py-2 rounded text-center text-sm hover:bg-gray-900"
                    >
                      Voir
                    </Link>

                    <Link
                      href={`/restaurants/${restaurant._id}/edit`}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center text-sm hover:bg-blue-700"
                    >
                      Modifier
                    </Link>
                    <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantsPage;
