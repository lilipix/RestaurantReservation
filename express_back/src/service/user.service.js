import UserRepository from "../repository/user.repository.js";

// business logic of the application. It interacts with the repository to perform database operations and can also include additional logic such as validation, data transformation, etc.
class UserService {
  static async getAllUsers() {
    return await UserRepository.findAll();
  }
  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  static async createUser(userData) {
    // control validation of userData here if needed before creating the user
    const existing_user = await UserRepository.findByEmail(userData.email);
    if (existing_user) {
      throw new Error("Email already exists");
    }
    if (userData.age && userData.age < 0) {
      throw new Error("Age must be a positive number");
    }
    const newUser = await UserRepository.create(userData);
    return newUser;
  }
  static async updateUser(id, userData) {
    const existing_user = await UserRepository.findById(id);
    if (!existing_user) {
      throw new Error("User not found");
    }
    return await UserRepository.update(id, userData);
  }
  static async deleteUser(id) {
    const existing_user = await UserRepository.findById(id);
    if (!existing_user) {
      throw new Error("User not found");
    }
    return await UserRepository.delete(id);
  }
}

export default UserService;
