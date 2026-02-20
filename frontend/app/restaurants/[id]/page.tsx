import Link from "next/link";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant } from "@/app/types";
import AccordionSection from "@/app/components/AccordionSection";
import DeleteButton from "@/app/components/DeleteButton";

interface RestaurantDetailPageProps {
  params: {
    id: string;
  };
}

async function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const restaurant: Restaurant | null =
    await RestaurantService.getRestaurantById(params.id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/restaurants"
              className="text-3xl font-bold text-orange-600"
            >
              RestaurantApp
            </Link>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xl text-gray-600">Restaurant non trouvé</p>
          <Link
            href="/restaurants"
            className="text-orange-600 hover:underline mt-4 block"
          >
            Retour aux restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/accueil" className="text-3xl font-bold text-orange-600">
            RestaurantApp
          </Link>
          <Link
            href="/restaurants"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Retour
          </Link>
        </div>
      </nav>

      {/* Détails du restaurant */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {restaurant.name}
            </h1>
            <div className="flex gap-4">
              <Link
                href={`/restaurants/${restaurant._id}/edit`}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                Modifier
              </Link>
              <DeleteButton restaurantId={restaurant._id!} />
            </div>
          </div>
          <div className="gap-6 mb-8">
            <div>
              <p className="text-gray-600 mb-2">
                <strong>📍 Localisation:</strong> {restaurant.borough}
              </p>
              <p className="text-gray-600 mb-2">
                <strong> 🏠 Adresse:</strong> {restaurant.address.street}{" "}
                {restaurant.address.zipcode} {restaurant.address.city}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>🍽️ Cuisine:</strong> {restaurant.cuisine}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>👥 Capacité:</strong> {restaurant.capacity} personnes
              </p>
            </div>
          </div>

          {/* Menu */}
          {restaurant.menu && (
            <AccordionSection title="🍽 Menu">
              <p className="text-sm text-gray-500 my-6">
                Dernière mise à jour : 16 février 2026
              </p>

              {restaurant.menu.categories.map((category, index) => {
                let icon = "";
                if (category.name.toLowerCase().includes("entrée"))
                  icon = "🥗 ";
                else if (category.name.toLowerCase().includes("plat"))
                  icon = "🍝 ";
                else if (category.name.toLowerCase().includes("dessert"))
                  icon = "🍰 ";

                return (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                      {icon}
                      {category.name}
                    </h3>

                    <div className="space-y-3">
                      {category.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <span className="font-medium">{item.name}</span>
                            {!item.available && (
                              <span className="ml-2 text-red-500 text-sm">
                                (Indisponible)
                              </span>
                            )}
                          </div>
                          <span className="font-semibold">{item.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </AccordionSection>
          )}

          {/* Réservations */}
          <AccordionSection title="📅 Réservations">
            {restaurant.reservations && restaurant.reservations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse mt-6">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2 text-left">Nom</th>
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Heure</th>
                      <th className="border p-2 text-left">Personnes</th>
                      <th className="border p-2 text-left">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurant.reservations.map((res) => (
                      <tr key={res._id} className="hover:bg-gray-50">
                        <td className="border p-2">{res.customerName}</td>
                        <td className="border p-2">{res.date}</td>
                        <td className="border p-2">{res.time}</td>
                        <td className="border p-2">{res.guests}</td>
                        <td className="border p-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                              res.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : res.status === "cancelled"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 mt-6">
                Aucune réservation pour ce restaurant
              </p>
            )}
          </AccordionSection>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;
