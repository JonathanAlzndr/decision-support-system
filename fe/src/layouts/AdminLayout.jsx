import { Outlet, Link, useLocation } from "react-router-dom";
import { MdElectricBolt } from "react-icons/md";

export default function AdminLayout() {
	const location = useLocation();

	return (
		<div className="flex flex-col min-h-screen min-w-screen overflow-hidden bg-white">
			{/* NAVBAR */}
			<header className="h-20 text-sky-700 flex justify-between items-center px-6 border-b border-gray-200 z-20 bg-white">
				<div className="flex items-center gap-2">
					<MdElectricBolt size={24} />
					<div className=" font-bold text-lg tracking-tight">SPK REKOMENDASI MOTOR LISTRIK</div>
				</div>

				<div className="flex items-center w-20 gap-2">
					<span className="text-sm font-medium text-gray-600">Admin</span>
					<div className="w-8 h-8 bg-sky-700 rounded-full flex items-center justify-center text-white text-xs">
						P
					</div>
				</div>
			</header>

			<div className="flex overflow-hidden w-full">
				{/* SIDEBAR*/}
				<aside className="w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto">
					<nav className="mt-4 flex flex-col gap-1 px-3">
						<Link
							to={"/admin"}
							className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
								location.pathname === "/admin"
									? "bg-sky-700 text-white shadow-md shadow-sky-200"
									: "text-gray-500 hover:bg-gray-20"
							}`}
						>
							Beranda
						</Link>

						<Link
							to={"/admin/alternatif"}
							className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
								location.pathname === "/admin/alternatif"
									? "bg-sky-700 text-white shadow-md shadow-sky-200"
									: "text-gray-500 hover:bg-gray-20"
							}`}
						>
							Data Alternatif
						</Link>

						<Link
							to={"/admin/kriteria"}
							className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
								location.pathname === "/admin/kriteria"
									? "bg-sky-700 text-white shadow-md shadow-sky-200"
									: "text-gray-500 hover:bg-gray-20"
							}`}
						>
							Data Kriteria
						</Link>

						<Link
							to={"/admin/perhitungan"}
							className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
								location.pathname === "/admin/perhitungan"
									? "bg-sky-700 text-white shadow-md shadow-sky-200"
									: "text-gray-500 hover:bg-gray-200"
							}`}
						>
							Detail Perhitungan
						</Link>
					</nav>
				</aside>

				{/* OUTLET AREA - Hanya area ini yang bisa di-scroll */}
				<main className="overflow-y-auto w-full bg-white flex flex-col">
					<article className="w-full mx-auto px-10 py-8">
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
