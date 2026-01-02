import React from "react";
import { Link } from "react-router-dom";
import {
	MdDashboardCustomize,
	MdTwoWheeler,
	MdTune,
	MdCalculate,
	MdLightbulbOutline,
	MdCompareArrows,
	MdAssessment,
} from "react-icons/md";

export default function BerandaAdmin() {
	return (
		<div className="font-sans mx-15">
			<section className="relative overflow-hidden rounded-4xl bg-linear-to-br from-sky-50 via-white to-indigo-50 border border-sky-100 p-8 md:p-12">
				<div className="absolute top-0 right-0 -mt-10 -mr-10 text-sky-100 opacity-50 pointer-events-none">
					<MdDashboardCustomize size={200} />
				</div>

				<div className="relative z-10 mb-10">
					<div className="inline-block px-4 py-1.5 bg-white border border-sky-200 text-sky-700 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
						Tentang Sistem Ini
					</div>
					<h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
						Urgensi & Metodologi <br />
						<span className="text-sky-700">Sistem Pendukung Keputusan</span>
					</h2>
					<p className="text-slate-600 text-lg max-w-3xl leading-relaxed font-medium">
						Aplikasi ini dibangun untuk mengatasi kompleksitas pengambilan keputusan multikriteria
						dalam pemilihan motor listrik di Indonesia, menggantikan cara manual yang subjektif
						dengan pendekatan komputasi yang objektif dan terstruktur.
					</p>
				</div>

				{/* Tiga Pilar Utama Sistem (Visualisasi Penjelasan) */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
					{/* Pilar 1: Tujuan */}
					<div className="bg-white/80 backdrop-blur-sm p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-sky-300 transition-colors">
						<div className="p-3 bg-yellow-100 text-yellow-700 rounded-xl mb-4">
							<MdLightbulbOutline size={28} />
						</div>
						<h4 className="text-lg font-bold text-slate-800 mb-2">Objektivitas Seleksi</h4>
						<p className="text-sm text-slate-500 leading-relaxed font-medium">
							Membantu calon pembeli menimbang kriteria yang saling bertentangan (harga vs jarak
							tempuh) untuk mendapatkan rekomendasi yang logis .
						</p>
					</div>

					{/* Pilar 2: Metodologi Hibrid */}
					<div className="bg-white/80 backdrop-blur-sm p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-indigo-300 transition-colors">
						<div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl mb-4">
							<MdCompareArrows size={28} />
						</div>
						<h4 className="text-lg font-bold text-slate-800 mb-2">Komparasi SAW & TOPSIS</h4>
						<p className="text-sm text-slate-500 leading-relaxed font-medium">
							Menerapkan dua metode berbeda secara fundamental—penjumlahan terbobot (SAW) dan jarak
							solusi ideal (TOPSIS)—untuk analisis yang komprehensif.
						</p>
					</div>

					{/* Pilar 3: Hasil & Validasi */}
					<div className="bg-white/80 backdrop-blur-sm p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-emerald-300 transition-colors">
						<div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl mb-4">
							<MdAssessment size={28} />
						</div>
						<h4 className="text-lg font-bold text-slate-800 mb-2">Transparansi Perankingan</h4>
						<p className="text-sm text-slate-500 leading-relaxed font-medium">
							Admin dapat memvalidasi setiap langkah perhitungan untuk memastikan sistem
							menghasilkan urutan rekomendasi yang akurat dan dapat dipertanggungjawabkan.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
