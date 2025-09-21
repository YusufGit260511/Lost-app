import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components//Nav";
import Header from "./components//Header";
import Footer from "./components//Footer";
import ReportPage from "./pages/Report";
import ClaimItemPage from "./pages/ClaimItem";
import SettingsPage from "./pages/Settings";
import Profile from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ChatBot from "./components/Chatbot";
import PostsPage from "./pages/PostPage";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen text-black">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/claim" element={<ClaimItemPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <ChatBot />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
