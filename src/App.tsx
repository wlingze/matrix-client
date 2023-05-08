import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./view/Main";
import Login from "./view/Login";
import Register from "./view/Register";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Main />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
