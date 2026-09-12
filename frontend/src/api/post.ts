import api from "./client";

// ========================================
// 관련 타입
// ========================================

export interface PostUser {
  id: number;
  name?: string;
  email?: string;
}

export interface PostHobby {
  id: number;
  name: string;
}

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
// 공통 API 응답
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
// 게시글 생성 Request
// ========================================

export interface CreatePostRequest {
  hobbyId: number;
  title: string;
  content: string;
}

// ========================================
// 게시글 목록
// GET /posts
// ========================================

export const getPosts = async (): Promise<Post[]> => {
  const response =
    await api.get<PostListResponse>("/posts");

  return response.data.data;
};

// ========================================
// 게시글 상세
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