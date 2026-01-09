import React, { useEffect, useState } from "react";
import {
	MdEmojiEvents,
	MdArrowBack,
	MdOutlineGridOn,
	MdFunctions,
	MdInfoOutline,
	MdTimeline,
	MdRadioButtonChecked,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function HasilRekomendasiPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [data, setData] = useState(null);

	useEffect(() => {
		const dataRekomendasi = location.state?.dataRekomendasi;
		// Jika data tidak ada (akses langsung), balikkan ke halaman kriteria
		if (!dataRekomendasi) {
			navigate("/user/kriteria");
			return;
		}
		setData(dataRekomendasi);
	}, [location.state, navigate]);

	if (!data) return null;

	const motorTerbaik = data.saw?.alternatif_terbaik;

	return (
		<div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-8 min-h-screen text-left">
			<div className="max-w-6xl mx-auto space-y-8">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none">
							Hasil Analisis Rekomendasi
						</h2>
						<div className="flex items-center gap-2 mt-2">
							<span
								className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
									data.saw?.detail ? "bg-indigo-100 text-indigo-700" : "bg-slate-200 text-slate-600"
								}`}
							>
								{data.saw?.detail ? "Mode Transparansi Aktif" : "Mode Standar"}
							</span>
							<span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
								• Berdasarkan Preferensi Kriteria Anda
							</span>
						</div>
					</div>
					<Button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors uppercase text-xs bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
					>
						<MdArrowBack size={18} /> Kembali
					</Button>
				</div>

				{/* Hero Result Section (UX Focus: Menampilkan Pemenang Utama) */}
				{motorTerbaik && (
					<div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
						<div className="relative z-10">
							<div className="flex items-center gap-2 mb-4">
								<div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
									<MdEmojiEvents size={24} className="text-yellow-300" />
								</div>
								<span className="font-black uppercase tracking-[0.2em] text-sm text-white/80">
									Rekomendasi Teratas
								</span>
							</div>
							<h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
								{motorTerbaik.nama_motor}
							</h1>
							<p className="text-indigo-100 font-medium max-w-md">
								Berdasarkan perhitungan sistem, motor ini memiliki nilai kecocokan tertinggi yaitu{" "}
								<span className="font-mono font-bold text-white text-xl">
									{(motorTerbaik.nilai_preferensi * 100).toFixed(1)}%
								</span>
								.
							</p>
						</div>
						{/* Dekorasi Background */}
						<div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12">
							<MdEmojiEvents size={300} />
						</div>
					</div>
				)}

				{/* Ranking Comparison Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<RankingCard
						title="Peringkat SAW"
						subtitle="Simple Additive Weighting"
						ranking={data.saw?.ranking}
						accentColor="sky"
					/>
					<RankingCard
						title="Peringkat TOPSIS"
						subtitle="Order Preference by Similarity"
						ranking={data.topsis?.ranking}
						accentColor="emerald"
					/>
				</div>

				{/* Detail Calculation Section (Conditional) */}
				{data.saw?.detail && (
					<div className="space-y-8 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div className="flex items-center gap-3 border-b border-slate-200 pb-4">
							<div className="p-2 bg-indigo-600 rounded-lg text-white">
								<MdFunctions size={20} />
							</div>
							<h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
								Transparansi Logika Perhitungan
							</h3>
						</div>

						<div className="bg-white p-6 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-12">
							{/* SAW Step */}
							<div className="space-y-6">
								<div className="flex items-center gap-3">
									<span className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 font-black text-sm">
										01
									</span>
									<h4 className="font-black uppercase text-sm tracking-widest text-sky-700">
										Tahapan Metode SAW
									</h4>
								</div>

								{/* Bobot Info */}
								<VectorList
									title="Bobot Kriteria (W)"
									values={data.saw.detail.bobot_W}
									color="sky"
								/>

								<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
									<MatrixTable
										title="Matriks Keputusan (X)"
										data={data.saw.detail.matriks_keputusan_X}
										color="sky"
									/>
									<MatrixTable
										title="Matriks Normalisasi (R)"
										data={data.saw.detail.matriks_normalisasi_R}
										color="sky"
									/>
								</div>
							</div>

							<div className="h-px bg-slate-100 w-full"></div>

							{/* TOPSIS Step */}
							<div className="space-y-6">
								<div className="flex items-center gap-3">
									<span className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-black text-sm">
										02
									</span>
									<h4 className="font-black uppercase text-sm tracking-widest text-emerald-700">
										Tahapan Metode TOPSIS
									</h4>
								</div>

								<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
									<MatrixTable
										title="Matriks Normalisasi (R)"
										data={data.topsis.detail.matriks_normalisasi_R}
										color="emerald"
									/>
									<MatrixTable
										title="Matriks Terbobot (Y)"
										data={data.topsis.detail.matriks_terbobot_Y}
										color="emerald"
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
									<VectorList
										title="Solusi Ideal Positif (A+)"
										values={data.topsis.detail.solusi_ideal_plus}
										color="emerald"
									/>
									<VectorList
										title="Solusi Ideal Negatif (A-)"
										values={data.topsis.detail.solusi_ideal_min}
										color="emerald"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// Sub-komponen dipercantik
function RankingCard({ title, subtitle, ranking = [], accentColor }) {
	const isSky = accentColor === "sky";
	return (
		<div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden">
			<div className="mb-8 relative z-10">
				<h4
					className={`text-xs font-black uppercase tracking-[0.2em] mb-1 ${
						isSky ? "text-sky-600" : "text-emerald-600"
					}`}
				>
					{title}
				</h4>
				<p className="text-slate-400 text-[10px] font-bold uppercase">{subtitle}</p>
			</div>

			<div className="space-y-3 relative z-10">
				{ranking.map((item, index) => (
					<div
						key={index}
						className={`flex items-center justify-between p-4 border rounded-2xl transition-all duration-300 ${
							index === 0
								? isSky
									? "bg-sky-50/50 border-sky-200 ring-2 ring-sky-100 shadow-sm"
									: "bg-emerald-50/50 border-emerald-200 ring-2 ring-emerald-100 shadow-sm"
								: "bg-white border-slate-100 hover:border-slate-300"
						}`}
					>
						<div className="flex items-center gap-4">
							<div
								className={`w-9 h-9 flex items-center justify-center rounded-xl font-black text-sm ${
									index === 0
										? (isSky ? "bg-sky-600" : "bg-emerald-600") + " text-white shadow-lg"
										: "bg-slate-100 text-slate-400"
								}`}
							>
								{index + 1}
							</div>
							<div>
								<span
									className={`font-black uppercase tracking-tight block text-sm ${
										index === 0 ? "text-slate-900" : "text-slate-600"
									}`}
								>
									{item.nama_motor}
								</span>
								<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
									{item.kode}
								</span>
							</div>
						</div>
						<div className="text-right">
							<span
								className={`text-lg font-black font-mono block ${
									index === 0 ? (isSky ? "text-sky-700" : "text-emerald-700") : "text-slate-400"
								}`}
							>
								{item.nilai_preferensi?.toFixed(4)}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function MatrixTable({ title, data, color }) {
	if (!data) return null;
	const entries = Object.entries(data);
	const headers = Object.keys(Object.values(data)[0] || {});
	const isSky = color === "sky";

	return (
		<div className="space-y-3">
			<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
				<MdOutlineGridOn size={14} className={isSky ? "text-sky-500" : "text-emerald-500"} />{" "}
				{title}
			</label>
			<div className="overflow-x-auto rounded-2xl border border-slate-100">
				<table className="w-full text-[10px] font-mono border-collapse">
					<thead>
						<tr className="bg-slate-50">
							<th className="p-3 border-b border-slate-100 text-slate-400 font-black text-left">
								ALT
							</th>
							{headers.map((h) => (
								<th
									key={h}
									className="p-3 border-b border-slate-100 text-slate-400 font-black text-center"
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{entries.map(([altKey, values]) => (
							<tr key={altKey} className="hover:bg-slate-50 transition-colors">
								<td className="p-3 font-black text-slate-600 border-r border-slate-50 bg-slate-50/30 whitespace-nowrap italic">
									{altKey}
								</td>
								{Object.values(values).map((val, i) => (
									<td
										key={i}
										className={`p-3 text-center border-r border-slate-50 last:border-0 font-bold ${
											isSky ? "text-sky-600" : "text-emerald-600"
										}`}
									>
										{typeof val === "number" ? val.toFixed(3) : val}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function VectorList({ title, values, color }) {
	if (!values) return null;
	return (
		<div className="space-y-3">
			<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
				<MdRadioButtonChecked className={color === "sky" ? "text-sky-500" : "text-emerald-500"} />{" "}
				{title}
			</label>
			<div className="flex flex-wrap gap-2">
				{values.map((v, i) => (
					<div
						key={i}
						className={`px-4 py-2 rounded-xl border bg-white shadow-sm font-mono text-[10px] font-bold flex flex-col items-center ${
							color === "emerald"
								? "border-emerald-100 text-emerald-700"
								: "border-sky-100 text-sky-700"
						}`}
					>
						<span className="text-[8px] text-slate-400 mb-1">C{i + 1}</span>
						{v.toFixed(4)}
					</div>
				))}
			</div>
		</div>
	);
}
