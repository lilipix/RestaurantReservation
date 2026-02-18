import mongoose from "mongoose";

// Define the User schema with validation rules for data who comes from the client
const userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Prénom must be at least 2 characters long"],
      maxlength: [50, "Prénom must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email must be a valid email address"],
    },
    age: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    versionKey: false, // removes the __v field
  },
);

userSchema.index({ email: 1 }); // create an index on the email field for faster queries
userSchema.index({ lastName: 1, firstName: 1 }); // create an index on the lastName and firstName fields for faster queries

// Virtual field for full name not stored in the database but computed on the fly
userSchema.virtual("fullName").get(function () {
  return `${this.lastName} ${this.firstName}`;
});

// Convert virtuals to JSON when sending data to the client
userSchema.set("toJSON", {
  virtuals: true, // include virtuals when converting to JSON
});

// Create the User model from the schema
const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
