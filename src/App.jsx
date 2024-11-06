import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import MotivationPage from "./pages/MotivationPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="motivation" element={<MotivationPage />} />
                    <Route path="register" element={<LoginPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
