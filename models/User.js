import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "Email already exists"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
