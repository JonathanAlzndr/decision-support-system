import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
/* components */
import Button from "../components/Button";
/* icons */
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
		{
			name: "Data",
			path: "/user",
		},
		{
			name: "Pilih Kriteria",
			path: "/user/kriteria",
		},
		{
			name: "Riwayat Rekomendasi",
			path: "/user/riwayat",
		},
	];

	return (
		<div className="flex flex-col h-screen w-full overflow-hidden bg-white font-sans">
			<header className="h-20 shrink-0 text-sky-700 flex justify-between items-center px-8 border-b border-gray-100 z-50 bg-white/80 backdrop-blur-md">
				<div className="flex items-center gap-2">
					<MdElectricBolt size={26} className="animate-pulse" />
					<div className="font-black text-xl tracking-tighter">SPK MOTOR LISTRIK</div>
				</div>

				<Button
					onClick={() => handleLogout("/")}
					className={`font-bold text-xs text-red-500 hover:bg-slate-100 w-25 h-10 rounded-xl justify-center relative flex items-center gap-2`}
				>
					<IoIosArrowBack size={20} />
					KELUAR
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
