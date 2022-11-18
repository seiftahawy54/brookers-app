import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  }
})

const User = mongoose.model("Users", UsersSchema);

export default User;
