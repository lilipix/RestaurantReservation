import UserModel from "../model/user.model";

// interact with the database using the UserModel and provide methods to be called from the controller
class UserRepository {
  // CRUD minimum for the User model, with static methods to be called from the controller
  static async findAll() {
    return await UserModel.find();
  }

  static async findById(id) {
    return await UserModel.findById(id);
  }

  static async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  static async create(userData) {
    return await UserModel.create(userData);
  }

  // Note: runValidators is not needed on create() as validations run by default
  // runValidators is only required for update operations

  static async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  static async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserRepository;
