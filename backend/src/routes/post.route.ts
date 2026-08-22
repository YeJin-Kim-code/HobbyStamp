import {Router} from "express"
import {authenticate} from "../middlewares/auth.middleware";
import * as postController from "../controllers/post.controller";

const router = Router();

router.post("/", authenticate, postController.createPost);
router.put("/:id", authenticate, postController.updatePost);
router.delete("/:id", authenticate, postController.deletePost);
export default router;