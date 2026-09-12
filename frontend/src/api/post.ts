import api from "./client";

// ========================================
// 게시글 작성자
// ========================================

export interface PostUser {
  id: number;
  email: string;
  nickname: string;
}

// ========================================
// 취미
// ========================================

export interface PostHobby {
  id: number;
  name: string;
}

// ========================================
// 게시글
// ========================================

export interface Post {
  id: number;

  title: string;
  content: string;

  aiSummary: string | null;

  createdAt: string;
  updatedAt: string;

  user: PostUser;
  hobby: PostHobby;

  commentCount: number;
}

// ========================================
// API 응답
// ========================================

interface PostListResponse {
  message: string;
  data: Post[];
}

interface PostResponse {
  message: string;
  data: Post;
}

// ========================================
// 게시글 작성 / 수정 요청 데이터
// ========================================

export interface CreatePostRequest {
  hobbyId: number;
  title: string;
  content: string;
}

// ========================================
// 게시글 목록 조회
// GET /posts
// ========================================

export const getPosts = async (): Promise<Post[]> => {
  const response =
    await api.get<PostListResponse>("/posts");

  return response.data.data;
};

// ========================================
// 게시글 상세 조회
// GET /posts/:id
// ========================================

export const getPost = async (
  postId: number,
): Promise<Post> => {
  const response =
    await api.get<PostResponse>(
      `/posts/${postId}`,
    );

  return response.data.data;
};

// ========================================
// 게시글 작성
// POST /posts
// ========================================

export const createPost = async (
  data: CreatePostRequest,
): Promise<Post> => {
  const response =
    await api.post<PostResponse>(
      "/posts",
      data,
    );

  return response.data.data;
};

// ========================================
// 게시글 수정
// PUT /posts/:id
// ========================================

export const updatePost = async (
  postId: number,
  data: CreatePostRequest,
): Promise<Post> => {
  const response =
    await api.put<PostResponse>(
      `/posts/${postId}`,
      data,
    );

  return response.data.data;
};

// ========================================
// 게시글 삭제
// DELETE /posts/:id
// ========================================

export const deletePost = async (
  postId: number,
): Promise<void> => {
  await api.delete(
    `/posts/${postId}`,
  );
};