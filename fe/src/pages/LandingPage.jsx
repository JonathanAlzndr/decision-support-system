import React from "react";
import { useNavigate } from "react-router-dom";
import { MdElectricBolt, MdAdminPanelSettings, MdPersonSearch, MdAssessment } from "react-icons/md";
import Typewriter from "typewriter-effect";
import Button from "../components/Button";

export default function LandingPage() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-slate-50 font-sans text-left relative overflow-x-hidden">
			<div className="absolute top-[-5%] left-[-5%] w-100 h-100 bg-sky-200/40 rounded-full blur-[120px] pointer-events-none"></div>
			<div className="absolute top-[15%] right-[-5%] w-75 h-75 bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none"></div>
			<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
					<div className="flex items-center gap-2 text-sky-700 font-bold text-xl tracking-tight">
						<MdElectricBolt size={26} />
						<span>SPK MOTOR LISTRIK</span>
					</div>
					<div className="hidden md:flex gap-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
						<a href="#metode" className="hover:text-sky-700 transition-colors">
							Metode
						</a>
						<Button
							onClick={() => navigate("/admin")}
							className="flex items-center gap-1 hover:text-sky-700 transition-colors"
						>
							<MdAdminPanelSettings size={16} /> Admin
						</Button>
					</div>
				</div>
			</nav>

			<main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center">
				<div className="inline-block px-5 py-2 bg-sky-100/50 border border-sky-200 text-sky-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
					Sistem Pendukung Keputusan Terintegrasi
				</div>

				<h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 max-w-5xl">
					Rekomendasi Cerdas untuk <br />
					<span className="text-sky-700 italic inline-block min-h-[1.2em]">
						<Typewriter
							options={{
								strings: ["Sepeda Motor Listrik", "Mobilitas Masa Depan", "Pilihan Terbaik Anda"],
								autoStart: true,
								loop: true,
								delay: 70,
								deleteSpeed: 50,
								pauseFor: 2000,
							}}
						/>
					</span>
				</h1>

				<p className="text-slate-500 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed">
					Membantu Anda melakukan evaluasi alternatif motor listrik secara objektif dan terstruktur.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
					<Button
						onClick={() => navigate("/user")}
						className="group p-8 bg-white border border-slate-200 rounded-[35px] shadow-sm hover:shadow-2xl hover:shadow-sky-100 hover:border-sky-500 transition-all duration-300 text-left flex items-start gap-6"
					>
						<div className="bg-sky-700 p-5 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
							<MdPersonSearch size={32} />
						</div>
						<div>
							<h3 className="font-bold text-xl text-slate-800 mb-1 tracking-tight">
								Cari Rekomendasi
							</h3>
							<p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
								Masuk sebagai Pengguna
							</p>
						</div>
					</Button>

					<Button
						onClick={() => navigate("/admin/login")}
						className="group p-8 bg-white border border-slate-200 rounded-[35px] shadow-sm hover:shadow-2xl hover:shadow-slate-100 hover:border-slate-800 transition-all duration-300 text-left flex items-start gap-6 border-dashed"
					>
						<div className="bg-slate-800 p-5 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
							<MdAdminPanelSettings size={32} />
						</div>
						<div>
							<h3 className="font-bold text-xl text-slate-800 mb-1 tracking-tight">Panel Admin</h3>
							<p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
								Kelola data & kriteria
							</p>
						</div>
					</Button>
				</div>
			</main>

			<div className="w-full leading-0 fill-white relative z-20">
				<svg
					viewBox="0 0 1440 120"
					xmlns="http://www.w3.org/2000/svg"
					className="drop-shadow-[0_-10px_10px_rgba(3,105,161,0.05)]"
				>
					<path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
				</svg>
			</div>

			{/* --- METHODOLOGY SECTION (Jarak dirapatkan) --- */}
			<section id="metode" className="relative z-10 bg-white pb-24 pt-4">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
							Landasan Metodologi
						</h2>
						<div className="h-1.5 w-16 bg-sky-700 mx-auto rounded-full"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Card SAW */}
						<div className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
							<div className="w-14 h-14 bg-sky-700 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-sky-100 group-hover:rotate-6 transition-transform">
								<MdAssessment size={28} />
							</div>
							<h4 className="font-black text-2xl text-slate-800 mb-4 uppercase tracking-tight">
								Simple Additive Weighting (SAW)
							</h4>
							<p className="text-slate-500 leading-relaxed font-medium text-sm">
								Metode ini bekerja dengan menjumlahkan skor total dari semua kriteria yang sudah
								dibobot. Normalisasi memastikan perbandingan yang adil antar berbagai kriteria dan
								alternatif.
							</p>
						</div>

						{/* Card TOPSIS */}
						<div className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
							<div className="w-14 h-14 bg-indigo-700 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-100 group-hover:-rotate-6 transition-transform">
								<MdAssessment size={28} />
							</div>
							<h4 className="font-black text-2xl text-slate-800 mb-4 uppercase tracking-tight">
								TOPSIS
							</h4>
							<p className="text-slate-500 leading-relaxed font-medium text-sm">
								Metode ini mencari alternatif yang paling ideal, yaitu yang memiliki jarak terdekat
								dengan solusi terbaik dan sekaligus jarak terjauh dari solusi terburuk.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* --- FOOTER --- */}
			<footer className="relative z-10 py-16 px-6 bg-slate-50 border-t border-slate-100 text-center">
				<div className="flex items-center justify-center gap-2 text-sky-700 font-bold text-sm mb-6 opacity-40 uppercase tracking-widest">
					<MdElectricBolt size={18} />
					<span>SPK Rekomendasi Motor Listrik</span>
				</div>
				<p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
					Petrik Indra Joseph Modimbaba &bull; Universitas Katolik De La Salle Manado &bull; 2025
				</p>
			</footer>
		</div>
	);
}
