import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import HobbyPage from "./pages/HobbyPage";
import RecordPage from "./pages/RecordPage";
import StampPage from "./pages/StampPage";
import PostPage from "./pages/PostPage";
import CommentPage from "./pages/CommentPage";
import AiPage from "./pages/AiPage";
import MyPage from "./pages/MyPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

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

      <Route
        path="/posts"
        element={<PostPage />}
      />
      <Route
        path="/posts/:postId/comments"
        element={<CommentPage />}
      />
      <Route
        path="/ai"
        element={<AiPage />}
      />

      <Route
        path="/mypage"
        element={<MyPage />}
      />
    </Routes>
  );
}

export default App;