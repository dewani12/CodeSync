import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Workspace } from "../models/workspace.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as s3 from "../utils/s3.js";
import ApiResponse from "../utils/ApiResponse.js";

const createWorkspace = asyncHandler(async (req, res) => {
  const { name, visibility, language } = req.body;
  if (!name || !language) {
    throw new ApiError(401, "name and language are required");
  }
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  const admin = req.user._id;
  const user = await User.findById(admin);
  const workspace = new Workspace({
    name,
    visibility,
    admin,
    language,
  });
  try {
    await workspace.save();
    await s3.createS3Folder(`${user.username}/${name}/`);
    return res
      .status(200)
      .json(new ApiResponse(200, "Workspace created successfuly", {}));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while creating workspace"
    );
  }
});

const createFolder = asyncHandler(async (req, res) => {
  const { folderPath } = req.body;
  if (!folderPath) {
    throw new ApiError(401, "FolderPath is required");
  }
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  const admin = req.user._id;
  const user = await User.findById(admin);
  try {
    await s3.createS3Folder(`${user.username}/${folderPath}/`);
    return res
      .status(200)
      .json(new ApiResponse(200, "Folder created successfuly", {}));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while creating folder"
    );
  }
});

const saveFile = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  const user = await User.findById(req.user._id);
  const { filepath, content } = req.body;
  if (!filepath || !content) {
    throw new ApiError(401, "filepath and content are required");
  }
  try {
    await s3.saveS3File(`${user.username}/${filepath}`, content);
    return res
      .status(200)
      .json(new ApiResponse(200, "file saved successfully", {}));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while saving file"
    );
  }
});

const getFolderContents = asyncHandler(async (req, res) => {
  const { folderPath } = req.body;
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  const user = await User.findById(req.user._id);
  if (!folderPath) {
    throw new ApiError(401, "folderPath is required");
  }
  try {
    const content = await s3.listFiles(`${user.username}/${folderPath}`);
    return res.status(200).json(
      new ApiResponse(200, "folder content fetched successfully", {
        content: content,
      })
    );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while fetching file content"
    );
  }
});

const getFileContents = asyncHandler(async (req, res) => {
  const { filepath } = req.body;
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  const user = await User.findById(req.user._id);
  if (!filepath) {
    throw new ApiError(401, "filepath is required");
  }
  try {
    const content = await s3.getFileContent(`${user.username}/${filepath}`);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "file fetched successfully", { content: content })
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while fetching file content"
    );
  }
});

const deleteFile = asyncHandler(async (req, res) => {
  const { filepath } = req.body;
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  const user = await User.findById(req.user._id);
  if (!filepath) {
    throw new ApiError(401, "filepath is required");
  }
  try {
    await s3.deleteS3File(`${user.username}/${filepath}`);
    return res
      .status(200)
      .json(new ApiResponse(200, "file deleted successfully", {}));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while deleting file"
    );
  }
});

const deleteFolder = asyncHandler(async (req, res) => {
  const { folderPath } = req.body;
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  const user = await User.findById(req.user._id);
  if (!folderPath) {
    throw new ApiError(401, "folderPath is required");
  }
  try {
    await s3.deleteS3Folder(`${user.username}/${folderPath}`);
    return res
      .status(200)
      .json(new ApiResponse(200, "folder deleted successfully", {}));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while deleting folder"
    );
  }
});

const getAllWorkspaces = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    throw new ApiError(403, "Unauthorized Request");
  }
  try {
    const workspaces = await Workspace.find({ admin: req.user._id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Workspaces fetched successfully", { workspaces })
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while fetching workspaces"
    );
  }
});

export {
  createWorkspace,
  createFolder,
  saveFile,
  getFileContents,
  getFolderContents,
  deleteFile,
  deleteFolder,
  getAllWorkspaces,
};
