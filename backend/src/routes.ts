import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { OperationController } from "./controllers/OperationController";
import { PackageController } from "./controllers/PackageController";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const userController = new UserController();
const operationController = new OperationController();
const packageController = new PackageController();
const loginController = new LoginController();

//Usuario
router.post("/login", loginController.auth);
router.post("/user", userController.create);
router.patch("/user", authMiddleware, userController.update);
router.delete("/user/:id_user", authMiddleware, userController.delete);

//Operações
router.post("/operation", authMiddleware, operationController.create);
router.get("/operations", authMiddleware, operationController.list);
router.get("/operation", authMiddleware, operationController.find);
router.delete(
  "/operation/:id_operation",
  authMiddleware,
  operationController.delete
);

//Pacotes
router.get("/packages", authMiddleware, ensureAdmin, packageController.list);

export { router };
