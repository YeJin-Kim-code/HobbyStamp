import { Router } from "express";

import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();


// 댓글 작성
router.post(
  "/posts/:postId/comments",
  authenticate,
  createComment
);


// 댓글 조회
router.get(
  "/posts/:postId/comments",
  getComments
);


// 댓글 수정
router.patch(
  "/comments/:id",
  authenticate,
  updateComment
);


// 댓글 삭제
router.delete(
  "/comments/:id",
  authenticate,
  deleteComment
);

export default router;