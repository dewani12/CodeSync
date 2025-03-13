import { Router } from "express";
import {
  createWorkspace,
  createFolder,
  saveFile,
  getFileContents,
  getFolderContents,
  deleteFile,
  deleteFolder,
  getAllWorkspaces,
} from "../controllers/workspace.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createWorkspace").post(verifyJWT, createWorkspace);
router.route("/createFolder").post(verifyJWT, createFolder);
router.route("/saveFile").post(verifyJWT, saveFile);
router.route("/fileContent").get(verifyJWT, getFileContents);
router.route("/folderContent").get(verifyJWT, getFolderContents);
router.route("/file").delete(verifyJWT, deleteFile);
router.route("/folder").delete(verifyJWT, deleteFolder);
router.route("/").get(verifyJWT, getAllWorkspaces);

export default router;
