import { useState } from "react";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./Security/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedUserRoute } from "./Security/ProtectedRoute";
import Login from "./pages/Login";

/* admin pages */
import AlternatifAdmin from "./pages/admin/AlternatifAdmin";
import DetailPerhitungan from "./pages/admin/DetailPerhitungan";
import KriteriaAdmin from "./pages/admin/KriteriaAdmin";
import BerandaAdmin from "./pages/admin/BerandaAdmin";

/* user pages */
import DataMotorPage from "./pages/user/DataMotorPage";
import HasilRekomendasiPage from "./pages/user/HasilRekomendasiPage";
import BerandaUser from "./pages/user/BerandaUser";

/* layouts */
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import KriteriaPage from "./pages/user/KriteriaPage";

/* hooks */
import { Routes, Route } from "react-router";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="admin/login" element={<Login portal="Admin" />} />
			<Route
				path="/admin"
				element={
					<ProtectedRoute>
						<AdminLayout />
					</ProtectedRoute>
				}
			>
				<Route index element={<BerandaAdmin />} />
				<Route path="alternatif" element={<AlternatifAdmin />} />
				<Route path="kriteria" element={<KriteriaAdmin />} />
				<Route path="perhitungan" element={<DetailPerhitungan />} />
			</Route>
			<Route path="/user/login" element={<Login portal="User" />} />
			<Route path="/user" element={<BerandaUser />} />
			<Route
				path="/user"
				element={
					<ProtectedUserRoute>
						<UserLayout />
					</ProtectedUserRoute>
				}
			>
				<Route path="data" element={<DataMotorPage />} />
				<Route path="kriteria" element={<KriteriaPage />} />
				<Route path="hasil" element={<HasilRekomendasiPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
