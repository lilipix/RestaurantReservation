import Link from "next/link";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant } from "@/app/types";

async function ReservationsPage() {
  const restaurants: Restaurant[] = await RestaurantService.getAllRestaurants();

  // Récupérer toutes les réservations de tous les restaurants
  const allReservations = restaurants.flatMap((restaurant) => 
    (restaurant.reservations || []).map((reservation) => ({
      ...reservation,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    }))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/accueil" className="text-3xl font-bold text-orange-600">
            RestaurantApp
          </Link>
          <div className="space-x-4">
            <Link href="/restaurants" className="text-gray-600 hover:text-gray-900">
              Restaurants
            </Link>
            <Link href="/users" className="text-gray-600 hover:text-gray-900">
              Utilisateurs
            </Link>
            <Link href="/reservations" className="text-gray-600 hover:text-gray-900">
              Réservations
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Réservations</h1>
        </div>

        {allReservations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune réservation trouvée</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">Restaurant</th>
                  <th className="p-4 text-left">Nom du client</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Heure</th>
                  <th className="p-4 text-left">Personnes</th>
                  <th className="p-4 text-left">Statut</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allReservations.map((reservation) => (
                  <tr key={reservation._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-semibold">{reservation.restaurantName}</td>
                    <td className="p-4">{reservation.customerName}</td>
                    <td className="p-4">{reservation.date}</td>
                    <td className="p-4">{reservation.time}</td>
                    <td className="p-4">{reservation.guests}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/restaurants/${reservation.restaurantId}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Voir
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationsPage;
