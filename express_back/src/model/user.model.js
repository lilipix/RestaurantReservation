import mongoose from "mongoose";

// Nested schema for restaurant (denormalized - no joins)
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be at most 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description must be at most 1000 characters"],
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine type is required"],
      enum: ["French", "Italian", "Japanese", "Chinese", "Indian", "Thai", "American", "Mediterranean", "Mexican", "Other"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    openingHours: {
      type: String,
      default: "09:00 - 23:00",
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
      max: [1000, "Capacity cannot exceed 1000"],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true, timestamps: false }
);

// Nested schema for reservation (denormalized - no joins)
const reservationSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Restaurant ID is required"],
    },
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
    },
    restaurantAddress: String,
    restaurantPhone: String,
    reservationDate: {
      type: Date,
      required: [true, "Reservation date is required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Reservation date must be in the future",
      },
    },
    reservationTime: {
      type: String,
      required: [true, "Reservation time is required"],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"],
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest is required"],
      max: [20, "Maximum 20 guests per reservation"],
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [500, "Special requests must be at most 500 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
      default: () => `RES-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
  },
  { _id: true, timestamps: false }
);

// Main User schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email must be a valid email address"],
    },

    password: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
      min: 0,
    },

    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },

    // For admin users - restaurants they manage
    restaurants: [restaurantSchema],

    // For client users - their reservations
    reservations: [reservationSchema],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "restaurants.name": 1 });
userSchema.index({ "reservations.confirmationCode": 1 });

// Virtual field for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Convert virtuals to JSON when sending data to the client
userSchema.set("toJSON", {
  virtuals: true,
});

// Create the User model from the schema
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
