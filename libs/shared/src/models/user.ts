import mongoose from "mongoose";
import { z } from "zod";
import { SetListSchema, SetListValidation } from "./setList";

export const UserValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  setLists: z.array(SetListValidation),
});

export type IUser = z.infer<typeof UserValidation>;

export const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      required: true,
      unique: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    setLists: [SetListSchema],
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret["password"];
        return ret;
      },
    },
  }
);

export const User = mongoose.model("User", UserSchema);
