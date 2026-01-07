import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
/* components */
import Button from "../components/Button";
/* icons */
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";

export default function AdminLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const [popUp, setPopUp] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("role");
		localStorage.removeItem("token");
		navigate("/");
	};

	const navLinks = [
		{ name: "Beranda", path: "/admin" },
		{ name: "Data Alternatif", path: "/admin/alternatif" },
		{ name: "Data Kriteria", path: "/admin/kriteria" },
		{ name: "Data Sub-Kriteria", path: "/admin/sub-kriteria" },
		{ name: "Data Penilaian", path: "/admin/penilaian" },
		{ name: "Detail Perhitungan", path: "/admin/perhitungan" },
	];

	return (
		<div className="flex flex-col h-screen w-full overflow-hidden bg-white font-sans">
			<header className="h-20 shrink-0 text-sky-700 flex justify-between items-center px-8 border-b border-gray-100 z-50 bg-white/80 backdrop-blur-md">
				<div className="flex items-center gap-2">
					<MdElectricBolt size={26} className="animate-pulse" />
					<div className="font-black text-xl tracking-tighter">SPK MOTOR LISTRIK</div>
				</div>

				<div className="relative">
					<div
						className="flex items-center gap-3 cursor-pointer group"
						onClick={() => setPopUp(!popUp)}
					>
						<div className="text-right hidden sm:block">
							<p className="text-xs font-black text-slate-400 uppercase tracking-widest">Admin</p>
						</div>
						<div className="w-10 h-10 bg-sky-700 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-100 group-hover:scale-105 transition-transform">
							P
						</div>
					</div>

					<div
						className={`absolute top-14 right-0 bg-white shadow-2xl z-50 w-56 py-3 rounded-3xl rounded-tr-none border border-gray-100 transition-all duration-300 ease-in-out ${
							popUp
								? "opacity-100 translate-y-0 scale-100 visible"
								: "opacity-0 -translate-y-4 scale-95 invisible pointer-events-none"
						}`}
					>
						<div className="px-2 flex flex-col gap-1">
							<Button
								onClick={() => {
									setPopUp(false);
									navigate("/admin/profile");
								}}
								className="font-bold text-sm flex items-center gap-3 w-full hover:bg-sky-50 h-11 px-4 text-sky-700 rounded-2xl transition-all"
							>
								<FaUserCircle size={18} /> Profil
							</Button>

							<Button
								onClick={() => {
									setPopUp(false);
									handleLogout();
								}}
								className="font-bold text-sm flex items-center gap-3 w-full hover:bg-red-50 h-11 px-4 text-red-500 rounded-2xl transition-all"
							>
								<CiLogout size={18} /> Keluar
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				<aside className="w-72 shrink-0 bg-slate-50 border-r border-gray-100 overflow-y-auto hidden md:block">
					<nav className="mt-8 flex flex-col gap-2 px-4">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`px-5 py-4 rounded-2xl text-sm font-bold tracking-tight transition-all duration-300 ${
									location.pathname === link.path
										? "bg-sky-700 text-white shadow-xl shadow-sky-100 translate-x-1"
										: "text-slate-400 hover:bg-white hover:text-sky-700 hover:shadow-sm"
								}`}
							>
								{link.name}
							</Link>
						))}
					</nav>
				</aside>

				<main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
					<section className="flex-1 overflow-y-auto custom-scrollbar">
						<div className="min-h-full flex flex-col">
							<article className="flex-1 py-10 px-8 w-full mx-auto">
								<Outlet />
							</article>

							<footer className="px-8 py-8 border-t border-slate-50 text-center">
								<p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
									&copy; 2025 SPK Motor Listrik - Informatika
								</p>
							</footer>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
