import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import MotivationPage from "./pages/MotivationPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import UserProfilePage from "./pages/UserProfilePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AddCourseForm from "./pages/AddCourseForm";
import EditCourse from "./pages/EditCourse"; 
import TestPage from "./pages/TestPage"; 
import RegistrationPage from "./pages/RegistrationPage";
import AddTestForm from './pages/AddTestForm';



export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="add-course" element={<AddCourseForm />} />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="course/:id" element={<CourseDetailPage />} />
                    <Route path="motivation" element={<MotivationPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/edit-course/:id" element={<EditCourse />} />
                    <Route path="test" element={<TestPage />} /> 
                    <Route path="test-form" element={<AddTestForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
