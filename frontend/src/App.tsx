import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import HobbyPage from "./pages/HobbyPage";
import RecordPage from "./pages/RecordPage";
import StampPage from "./pages/StampPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignupPage />}
      />

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
    </Routes>
  );
}

export default App;