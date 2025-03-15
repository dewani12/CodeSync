import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

<<<<<<< HEAD
export const Workspace = mongoose.model("Workspace", workspaceSchema);
=======
export const Workspace = mongoose.model("Workspace", workspaceSchema);
>>>>>>> s3
