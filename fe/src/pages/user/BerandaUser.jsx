import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdElectricBolt } from "react-icons/md";
import Button from "../../components/Button";

export default function BerandaUser() {
	const navigate = useNavigate();

	return (
		<section className="relative flex justify-center items-center min-h-screen w-screen bg-slate-50 overflow-hidden font-sans p-6">
			{/* --- BACKGROUND DECORATION --- */}
			<div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full blur-[100px] z-0"></div>
			<div className="absolute top-[20%] right-[-5%] w-100 h-100 bg-indigo-200/30 rounded-full blur-[100px] z-0"></div>

			<div className="absolute bottom-0 left-0 w-full leading-0 z-0 opacity-70">
				<svg
					className="relative block w-full h-37.5 md:h-50"
					viewBox="0 0 1440 320"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="#0369a1"
						fillOpacity="1"
						d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
					></path>
				</svg>
			</div>

			<div className="relative z-10 w-full max-w-3xl p-12 md:p-16 bg-white/80 backdrop-blur-xl border border-white rounded-[50px] shadow-2xl shadow-sky-100/50 flex flex-col items-center text-center transition-all duration-500 hover:shadow-sky-200/60">
				<div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-sky-500 to-indigo-600 rounded-t-[50px]"></div>
				<div className="w-25 h-25 bg-white rounded-full flex items-center justify-center shadow-lg mb-10 text-sky-600 border border-sky-50 transition-transform duration-300 hover:scale-110">
					<MdElectricBolt size={40} />
				</div>

				{/* Text Section */}
				<h1 className="text-4xl md:text-3xl font-black text-slate-800 mb-6 tracking-tight uppercase">
					Sepeda Motor Listrik
				</h1>
				<p className="text-slate-500 text-sm md:text-lg leading-relaxed mb-12 font-medium max-w-2xl">
					Sistem Pendukung Keputusan untuk membantu Anda menentukan rekomendasi motor listrik
					terbaik berdasarkan preferensi kebutuhan pribadi secara objektif.
				</p>

				{/* Action Button */}
				<div className="w-full max-w-md">
					<Button
						onClick={() => navigate("/user/data")}
						className="group w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-6 rounded-2xl shadow-xl shadow-sky-200 transition-all duration-300 active:scale-95 flex items-center justify-center gap-4"
					>
						<span className="uppercase tracking-[0.2em] text-lg">Mulai Perhitungan</span>
						<MdElectricBolt
							className="transition-transform group-hover:translate-y-0.5"
							size={26}
						/>
					</Button>
				</div>

				{/* Footer Info */}
				<div className="mt-12 pt-8 border-t border-slate-100 w-full flex justify-between items-center px-4">
					<p className="text-sm text-slate-400 font-black uppercase tracking-[0.3em]">
						Metode SAW & TOPSIS
					</p>
					<p className="text-sm text-slate-400 font-medium italic">v1.0 2025</p>
				</div>
			</div>
		</section>
	);
}
