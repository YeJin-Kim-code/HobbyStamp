import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import DashboardPage from "./pages/DashboardPage";
import HobbyPage from "./pages/HobbyPage";
import RecordPage from "./pages/RecordPage";
import StampPage from "./pages/StampPage";

import PostPage from "./pages/PostPage";
import PostWritePage from "./pages/PostWritePage";
import PostEditPage from "./pages/PostEditPage";
import CommentPage from "./pages/CommentPage";

import AiPage from "./pages/AiPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Routes>

      {/* ========================================
          Home
      ======================================== */}

      <Route
        path="/"
        element={<HomePage />}
      />

      {/* ========================================
          Auth
      ======================================== */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignupPage />}
      />

      {/* ========================================
          Layout 적용 페이지

          아래 페이지들은 모두

          Navbar
          ↓
          Page

          구조로 표시된다.
      ======================================== */}

      <Route element={<Layout />}>

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/hobbies"
          element={<HobbyPage />}
        />

        <Route
          path="/records"
          element={<RecordPage />}
        />

        <Route
          path="/stamps"
          element={<StampPage />}
        />

        {/* Community */}

        <Route
          path="/posts"
          element={<PostPage />}
        />

        <Route
          path="/posts/write"
          element={<PostWritePage />}
        />

        <Route
          path="/posts/:postId/edit"
          element={<PostEditPage />}
        />

        <Route
          path="/posts/:postId/comments"
          element={<CommentPage />}
        />

        {/* AI */}

        <Route
          path="/ai"
          element={<AiPage />}
        />

        {/* MyPage */}

        <Route
          path="/mypage"
          element={<MyPage />}
        />

      </Route>

    </Routes>
  );
}

export default App;