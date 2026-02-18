import express from "express";
import UserController from "../controller/user.controller";

const user_router = express.Router();

user_router.get("/routes", (req, res) => {
  res.send("User route");
});

// Define routes for user operations, the id param should be defined before, otherwise it will be considered as a route with id = "routes" and will not work
user_router.get("/:id", UserController.getUserById);
user_router.put("/:id", UserController.updateUser);
user_router.delete("/:id", UserController.deleteUser);
user_router.get("/", UserController.getAllUsers);
user_router.post("/", UserController.createUser);

export default user_router;
