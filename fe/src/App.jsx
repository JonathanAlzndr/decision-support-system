import { useState } from "react";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedUserRoute, ProtectedAdminRoute } from "./Security/ProtectedRoute";
/* auth pages */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* admin pages */
import AlternatifAdmin from "./pages/admin/AlternatifAdmin";
import DetailPerhitungan from "./pages/admin/DetailPerhitungan";
import KriteriaAdmin from "./pages/admin/KriteriaAdmin";
import BerandaAdmin from "./pages/admin/BerandaAdmin";
import SubKriteriaAdmin from "./pages/admin/SubKriteriaAdmin";
import PenilaianAdmin from "./pages/admin/PenilaianAdmin";

/* user pages */
import DataMotorPage from "./pages/user/DataMotorPage";
import HasilRekomendasiPage from "./pages/user/HasilRekomendasiPage";

/* layouts */
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import PilihKriteriaPage from "./pages/user/PilihKriteriaPage";

/* hooks */
import { Routes, Route } from "react-router";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="admin/login" element={<Login portal="Admin" />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/admin"
				element={
					<ProtectedAdminRoute>
						<AdminLayout />
					</ProtectedAdminRoute>
				}
			>
				<Route index element={<BerandaAdmin />} />
				<Route path="alternatif" element={<AlternatifAdmin />} />
				<Route path="kriteria" element={<KriteriaAdmin />} />
				<Route path="sub-kriteria" element={<SubKriteriaAdmin />} />
				<Route path="perhitungan" element={<DetailPerhitungan />} />
				<Route path="penilaian" element={<PenilaianAdmin />} />
			</Route>
			<Route path="/user/login" element={<Login portal="User" />} />
			<Route
				path="/user"
				element={
					<ProtectedUserRoute>
						<UserLayout />
					</ProtectedUserRoute>
				}
			>
				<Route index element={<DataMotorPage />} />
				<Route path="kriteria" element={<PilihKriteriaPage />} />
				<Route path="hasil" element={<HasilRekomendasiPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
