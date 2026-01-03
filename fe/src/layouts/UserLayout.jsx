import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
/* components */
import Button from "../components/Button";
/* icons */
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";
export default function UserLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const [popUp, setPopUp] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("role");
		localStorage.removeItem("token");
		navigate("/");
	};

	const navLinks = [
		{ name: "Data", path: "/user/data" },
		{ name: "Pilih Kriteria", path: "/user/kriteria" },
	];

	// return (
	// 	<div className="flex flex-col min-h-screen overflow-hidden bg-white">
	// 		{/* Header (Gambar 8 nomor 4) */}
	// 		<header className="h-16 flex justify-between items-center px-6 border-b border-gray-200 bg-white shadow-sm z-10">
	// 			<div className="flex items-center gap-2 text-sky-700 font-bold">
	// 				<MdElectricBolt size={24} />
	// 				<div className=" font-bold text-lg tracking-tight">SPK REKOMENDASI MOTOR LISTRIK</div>
	// 			</div>
	// 			<Link
	// 				to="/"
	// 				className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-sky-700 transition-colors"
	// 			>
	// 				<MdArrowBack /> Kembali
	// 			</Link>
	// 		</header>
	// 		<div className="flex flex-1 overflow-hidden">
	// 			{/* Sidebar (Gambar 8 nomor 1) */}
	// 			<aside className="w-64 bg-gray-50 border-r border-gray-200">
	// 				<nav className="mt-6 px-4 space-y-2 flex flex-col">
	// 					<Link
	// 						to={"/user/data"}
	// 						className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
	// 							location.pathname === "/user/data"
	// 								? "bg-sky-700 text-white shadow-md shadow-sky-200"
	// 								: "text-gray-500 hover:bg-gray-20"
	// 						}`}
	// 					>
	// 						Data
	// 					</Link>
	// 					<Link
	// 						to={"/user/kriteria"}
	// 						className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
	// 							location.pathname === "/user/kriteria"
	// 								? "bg-sky-700 text-white shadow-md shadow-sky-200"
	// 								: "text-gray-500 hover:bg-gray-20"
	// 						}`}
	// 					>
	// 						Pilih Kriteria
	// 					</Link>
	// 				</nav>
	// 			</aside>

	// 			{/* OUTLET AREA - Hanya area ini yang bisa di-scroll */}
	// 			<main className="flex-1 overflow-y-auto bg-white h-full">
	// 				<article className="max-w-7xl mx-auto px-10 py-8">
	// 					<Outlet />
	// 				</article>

	// 				{/* Footer diletakkan di dalam area scroll jika ingin ikut ter-scroll */}
	// 				<footer className="px-10 py-6 border-t border-gray-100 text-center text-xs text-gray-400">
	// 					&copy; 2025 SPK Motor Listrik - Petrik Indra
	// 				</footer>
	// 			</main>
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="flex flex-col h-screen w-full overflow-hidden bg-white font-sans">
			<header className="h-20 shrink-0 text-sky-700 flex justify-between items-center px-8 border-b border-gray-100 z-50 bg-white/80 backdrop-blur-md">
				<div className="flex items-center gap-2">
					<MdElectricBolt size={26} className="animate-pulse" />
					<div className="font-black text-xl tracking-tighter">SPK MOTOR LISTRIK</div>
				</div>

				<Button
					onClick={() => navigate("/")}
					className={`font-bold text-xs relative flex items-center gap-2`}
				>
					<IoIosArrowBack size={20} />
					KEMBALI
				</Button>
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
