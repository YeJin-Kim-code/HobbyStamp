import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware";

import * as postController from "../controllers/post.controller";

const router = Router();

// 게시글 목록
router.get("/", postController.getPosts);

// 게시글 상세
router.get("/:id", postController.getPost);

// 게시글 작성
router.post(
  "/",
  authenticate,
  postController.createPost,
);

// 게시글 수정
router.put(
  "/:id",
  authenticate,
  postController.updatePost,
);

// 게시글 삭제
router.delete(
  "/:id",
  authenticate,
  postController.deletePost,
);

export default router;