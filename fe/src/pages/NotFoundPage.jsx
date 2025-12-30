import React from "react";
import { useNavigate } from "react-router-dom";
import { MdElectricBolt, MdArrowBack, MdWarningAmber } from "react-icons/md";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<section className="relative flex justify-center items-center h-screen w-screen bg-slate-50 overflow-hidden font-sans text-left">
			{/* Background Decor (Konsisten dengan pola Admin & User) */}
			<div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full blur-[100px]"></div>
			<div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-indigo-200/30 rounded-full blur-[120px]"></div>

			{/* 404 Card Container */}
			<div className="relative z-10 w-full max-w-lg p-10 md:p-14 bg-white/80 backdrop-blur-xl border border-white rounded-[40px] shadow-2xl shadow-sky-100/50 flex flex-col items-center text-center transition-all duration-500 hover:shadow-sky-200/60">
				{/* Accent Line */}
				<div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-red-400 to-sky-500 rounded-t-[40px]"></div>

				{/* Icon Section - Menggunakan gabungan Bolt dan Warning */}
				<div className="relative mb-8">
					<div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg text-sky-600 border border-sky-50">
						<MdElectricBolt size={56} className="opacity-20 absolute" />
						<MdWarningAmber size={48} className="text-red-500 relative z-10 animate-pulse" />
					</div>
				</div>

				{/* Text Content */}
				<h1 className="text-6xl font-black text-slate-800 mb-2 tracking-tighter">404</h1>
				<h2 className="text-xl font-bold text-slate-700 mb-4 uppercase tracking-tight">
					Halaman Tidak Ditemukan
				</h2>
				<p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium max-w-xs">
					Maaf, sepertinya Anda tersesat di luar jalur sirkuit sistem kami. Halaman yang Anda cari
					tidak tersedia dalam dataset.
				</p>

				{/* Action Button (UX: Memberikan jalan keluar yang jelas) */}
				<button
					onClick={() => navigate("/")}
					className="group w-full bg-slate-800 hover:bg-sky-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
				>
					<MdArrowBack size={20} className="transition-transform group-hover:translate-x-1" />
					<span className="uppercase tracking-widest text-sm">Kembali ke Beranda</span>
				</button>

				{/* Footer Info (Kesesuaian dengan identitas project) */}
				<div className="mt-8 pt-6 border-t border-slate-100 w-full">
					<p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
						SPK MOTOR LISTRIK - SAW & TOPSIS
					</p>
				</div>
			</div>
		</section>
	);
}
