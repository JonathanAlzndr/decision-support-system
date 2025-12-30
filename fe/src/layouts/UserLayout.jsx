import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { MdElectricBolt, MdArrowBack } from "react-icons/md";

export default function UserLayout() {
	const location = useLocation();

	return (
		<div className="flex flex-col min-h-screen overflow-hidden bg-white">
			{/* Header (Gambar 8 nomor 4) */}
			<header className="h-16 flex justify-between items-center px-6 border-b border-gray-200 bg-white shadow-sm z-10">
				<div className="flex items-center gap-2 text-sky-700 font-bold">
					<MdElectricBolt size={24} />
					<div className=" font-bold text-lg tracking-tight">SPK REKOMENDASI MOTOR LISTRIK</div>
				</div>
				<Link
					to="/"
					className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-sky-700 transition-colors"
				>
					<MdArrowBack /> Kembali
				</Link>
			</header>
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar (Gambar 8 nomor 1) */}
				<aside className="w-64 bg-gray-50 border-r border-gray-200">
					<nav className="mt-6 px-4 space-y-2 flex flex-col">
						<Link
							to={"/user/data"}
							className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
								location.pathname === "/user/data"
									? "bg-sky-700 text-white shadow-md shadow-sky-200"
									: "text-gray-500 hover:bg-gray-20"
							}`}
						>
							Data
						</Link>
						<Link
							to={"/user/kriteria"}
							className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
								location.pathname === "/user/kriteria"
									? "bg-sky-700 text-white shadow-md shadow-sky-200"
									: "text-gray-500 hover:bg-gray-20"
							}`}
						>
							Pilih Kriteria
						</Link>
					</nav>
				</aside>

				{/* OUTLET AREA - Hanya area ini yang bisa di-scroll */}
				<main className="flex-1 overflow-y-auto bg-white h-full">
					<article className="max-w-7xl mx-auto px-10 py-8">
						<Outlet />
					</article>

					{/* Footer diletakkan di dalam area scroll jika ingin ikut ter-scroll */}
					<footer className="px-10 py-6 border-t border-gray-100 text-center text-xs text-gray-400">
						&copy; 2025 SPK Motor Listrik - Petrik Indra
					</footer>
				</main>
			</div>
		</div>
	);
}
