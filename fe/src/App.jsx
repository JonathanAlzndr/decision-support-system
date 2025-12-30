import { useState } from "react";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./Security/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

/* admin pages */
import AlternatifAdmin from "./pages/admin/AlternatifADmin";
import DetailPerhitungan from "./pages/admin/DetailPerhitungan";
import KriteriaAdmin from "./pages/admin/KriteriaAdmin";
import AdminLogin from "./pages/admin/AdminLogin";
import BerandaAdmin from "./pages/admin/BerandaAdmin";

/* user pages */
import UserLogin from "./pages/user/UserLogin";
import DataMotorPage from "./pages/user/DataMotorPage";
import HasilRekomendasiPage from "./pages/user/HasilRekomendasiPage";

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
			<Route path="admin/login" element={<AdminLogin />} />
			<Route
				path="/admin"
				element={
					<>
						<AdminLayout />
					</>
				}
			>
				<Route index element={<BerandaAdmin />} />
				<Route path="alternatif" element={<AlternatifAdmin />} />
				<Route path="kriteria" element={<KriteriaAdmin />} />
				<Route path="perhitungan" element={<DetailPerhitungan />} />
			</Route>
			<Route path="/user" element={<UserLogin />} />
			<Route path="/user" element={<UserLayout />}>
				<Route path="data" element={<DataMotorPage />} />
				<Route path="kriteria" element={<KriteriaPage />} />
				<Route path="hasil" element={<HasilRekomendasiPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
