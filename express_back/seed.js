import dotenv from "dotenv";
import connectDb from "./src/config/database.js";
import UserModel from "./src/model/user.model.js";

dotenv.config();

const MONGO_USER = process.env.MONGO_USER || "mongo_user";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "example1234";
const MONGO_INIT_DB = process.env.MONGO_INIT_DB || "express_db";
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INIT_DB}?authSource=admin`;

const seedDatabase = async () => {
  try {
    console.log("🔗 Connecting to database...");
    await connectDb(MONGO_URI);

    console.log("🗑️  Clearing data...");
    await UserModel.deleteMany({});

    const today = new Date();

    // Seed Admin Users
    console.log("👨‍💼 Seeding admins...");
    const admins = await UserModel.insertMany([
      {
        firstName: "Pierre",
        lastName: "Chef",
        email: "pierre@restaurant.fr",
        password: "admin123",
        phone: "+33 1 23 45 67 89",
        age: 45,
        role: "admin",
        restaurants: [
          {
            name: "La Maison de Pierre",
            description: "Cuisine française",
            cuisine: "French",
            address: "123 Rue de la Paix",
            city: "Paris",
            postalCode: "75001",
            phone: "+33 1 23 45 67 89",
            openingHours: "11:30 - 23:30",
            capacity: 80,
            averageRating: 4.5,
            numberOfReviews: 45,
            isActive: true,
          },
        ],
        reservations: [],
      },
      {
        firstName: "Marco",
        lastName: "Rossi",
        email: "marco@bellaitalia.it",
        password: "admin123",
        phone: "+33 4 87 65 43 21",
        age: 52,
        role: "admin",
        restaurants: [
          {
            name: "Bella Italia",
            description: "Restaurant italien",
            cuisine: "Italian",
            address: "456 Rue de Rome",
            city: "Lyon",
            postalCode: "69001",
            phone: "+33 4 87 65 43 21",
            openingHours: "12:00 - 22:00",
            capacity: 60,
            averageRating: 4.3,
            numberOfReviews: 38,
            isActive: true,
          },
        ],
        reservations: [],
      },
      {
        firstName: "Yuki",
        lastName: "Tanaka",
        email: "yuki@sakura.jp",
        password: "admin123",
        phone: "+33 4 91 54 32 10",
        age: 38,
        role: "admin",
        restaurants: [
          {
            name: "Sakura Tokyo",
            description: "Sushi frais",
            cuisine: "Japanese",
            address: "789 Rue du Japon",
            city: "Marseille",
            postalCode: "13001",
            phone: "+33 4 91 54 32 10",
            openingHours: "12:00 - 23:00",
            capacity: 50,
            averageRating: 4.7,
            numberOfReviews: 52,
            isActive: true,
          },
        ],
        reservations: [],
      },
    ]);
    console.log(`✅ ${admins.length} admins created`);

    // Seed Client Users
    console.log("👥 Seeding clients...");
    const clients = await UserModel.insertMany([
      {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean@example.com",
        password: "client123",
        phone: "+33 6 12 34 56 78",
        age: 35,
        role: "client",
        restaurants: [],
        reservations: [
          {
            restaurantId: admins[0].restaurants[0]._id,
            restaurantName: "La Maison de Pierre",
            restaurantAddress: "123 Rue de la Paix, 75001 Paris",
            restaurantPhone: "+33 1 23 45 67 89",
            reservationDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
            reservationTime: "19:30",
            numberOfGuests: 4,
            specialRequests: "Fenêtre",
            status: "confirmed",
          },
        ],
      },
      {
        firstName: "Marie",
        lastName: "Martin",
        email: "marie@example.com",
        password: "client123",
        phone: "+33 6 98 76 54 32",
        age: 28,
        role: "client",
        restaurants: [],
        reservations: [
          {
            restaurantId: admins[1].restaurants[0]._id,
            restaurantName: "Bella Italia",
            restaurantAddress: "456 Rue de Rome, 69001 Lyon",
            restaurantPhone: "+33 4 87 65 43 21",
            reservationDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
            reservationTime: "20:00",
            numberOfGuests: 2,
            specialRequests: "Végétarien",
            status: "pending",
          },
        ],
      },
      {
        firstName: "Sophie",
        lastName: "Garcia",
        email: "sophie@example.com",
        password: "client123",
        phone: "+33 6 55 44 33 22",
        age: 31,
        role: "client",
        restaurants: [],
        reservations: [
          {
            restaurantId: admins[2].restaurants[0]._id,
            restaurantName: "Sakura Tokyo",
            restaurantAddress: "789 Rue du Japon, 13001 Marseille",
            restaurantPhone: "+33 4 91 54 32 10",
            reservationDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
            reservationTime: "18:30",
            numberOfGuests: 6,
            specialRequests: "Anniversaire",
            status: "confirmed",
          },
        ],
      },
      {
        firstName: "Luc",
        lastName: "Leclerc",
        email: "luc@example.com",
        password: "client123",
        phone: "+33 6 11 22 33 44",
        age: 55,
        role: "client",
        restaurants: [],
        reservations: [],
      },
    ]);
    console.log(`✅ ${clients.length} clients created`);

    console.log("\n✨ Seed completed!");
    console.log(`📊 Total: ${admins.length} admins + ${clients.length} clients`);
    console.log("\n🔐 Test Accounts:");
    console.log("  Admin: pierre@restaurant.fr / admin123");
    console.log("  Client: jean@example.com / client123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
