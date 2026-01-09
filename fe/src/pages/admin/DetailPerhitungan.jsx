import React, { useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import {
	MdCalculate,
	MdEmojiEvents,
	MdOutlineGridOn,
	MdFunctions,
	MdLayers,
	MdTimer,
	MdCompareArrows,
	MdCheckCircle,
	MdSpeed,
} from "react-icons/md";

export default function DetailPerhitungan() {
	const [hasilDetail, setHasilDetail] = useState(null);
	const { loading: calculating, execute: executeHitung } = useFetch("/rekomendasi", "POST", null, {
		autoFetch: false,
	});

	const onHitungDetail = async () => {
		try {
			const payload = {
				detail: true,
				bobot_custom: [],
			};
			const res = await executeHitung(payload);
			if (res && res.status === "success") {
				setHasilDetail(res.data);
			}
		} catch (err) {
			alert(err.message);
			console.error(err);
		}
	};

	return (
		<div className="space-y-8 min-h-screen text-left">
			<div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<span className="h-2 w-12 bg-indigo-600 rounded-full"></span>
						<span className="text-xs font-black text-indigo-600 tracking-[0.3em]">MODE ADMIN</span>
					</div>
					<h1 className="text-3xl font-black text-slate-800 tracking-tighter leading-none">
						DETAIL PERHITUNGAN
					</h1>
					<p className="text-slate-400 text-xs font-bold mt-2 tracking-widest">
						AUDIT TRANSPARANSI METODE SAW & TOPSIS
					</p>
				</div>
				<Button
					onClick={onHitungDetail}
					disabled={calculating}
					className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-black transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 uppercase tracking-widest text-xs active:scale-95 disabled:opacity-50"
				>
					<MdCalculate size={22} />
					{calculating ? "Processing..." : "Jalankan Kalkulasi"}
				</Button>
			</div>

			{!hasilDetail ? (
				<div className="h-100 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 group">
					<div className="p-8 rounded-full bg-slate-50 group-hover:scale-110 transition-transform duration-500">
						<MdLayers size={60} className="text-slate-300" />
					</div>
					<p className="mt-6 text-slate-400 font-black uppercase text-[10px] tracking-[0.5em]">
						Menunggu Instruksi Kalkulasi
					</p>
				</div>
			) : (
				<div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-200 col-span-1 md:col-span-1 flex flex-col justify-between relative overflow-hidden">
							<div className="absolute top-0 right-0 p-8 opacity-10">
								<MdCompareArrows size={100} />
							</div>
							<div>
								<h3 className="text-indigo-200 text-[10px] font-black tracking-widest uppercase mb-2">
									KONSISTEN RANKING
								</h3>
								<div className="flex items-baseline gap-1">
									<span className="text-5xl font-black tracking-tighter">
										{hasilDetail.ranking_consistency?.consistency_percentage}%
									</span>
								</div>
							</div>
							<div className="mt-6 pt-6 border-t border-indigo-500/30 flex items-center gap-3">
								<div className="bg-indigo-500/40 p-2 rounded-lg">
									<MdCheckCircle size={20} />
								</div>
								<div className="text-sm font-bold text-indigo-100">
									<p>{hasilDetail.ranking_consistency?.same_rank_count} Kesamaan Ranking</p>
									<p className="opacity-60">
										Dari {hasilDetail.ranking_consistency?.total_alternatif} Alternatif
									</p>
								</div>
							</div>
							<div className="mt-4 space-y-2">
								{hasilDetail.ranking_consistency?.detail?.map((item, idx) => (
									<div
										key={idx}
										className="flex items-center justify-between bg-indigo-500/20 p-3 rounded-xl text-[12px] font-bold"
									>
										<span>ID: {item.alternatif_id}</span>
										<div className="flex gap-4">
											<span>SAW: Rank {item.rank_saw}</span>
											<span>TOPSIS: Rank {item.rank_topsis}</span>
										</div>
										<span className={item.same ? "text-emerald-400" : "text-rose-400"}>
											{item.same ? "" : ""}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg col-span-1 md:col-span-2">
							<div className="flex items-center gap-3 mb-8">
								<div className="p-2 bg-slate-100 rounded-lg text-slate-600">
									<MdTimer size={24} />
								</div>
								<div>
									<h3 className="text-slate-800 font-black uppercase text-sm tracking-tight">
										Performa Algoritma
									</h3>
									<p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
										METRICS ANALYSIS
									</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								{/* Kolom SAW */}
								<div className="bg-sky-50/50 border border-sky-100 p-6 rounded-4xl flex flex-col items-center text-center group hover:bg-sky-50 transition-colors">
									<div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-sky-600 group-hover:scale-110 transition-transform">
										<MdFunctions size={24} />
									</div>
									<span className="text-[10px] font-black text-sky-700 tracking-widest uppercase mb-1">
										METODE SAW
									</span>
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-black text-slate-800 tracking-tighter">
											{hasilDetail.execution_time?.saw_ms}
										</span>
										<span className="text-[10px] font-bold text-slate-400">ms</span>
									</div>
								</div>

								{/* Kolom TOPSIS */}
								<div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-4xl flex flex-col items-center text-center group hover:bg-emerald-50 transition-colors">
									<div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
										<MdLayers size={24} />
									</div>
									<span className="text-[10px] font-black text-emerald-700 tracking-widest uppercase mb-1">
										METODE TOPSIS
									</span>
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-black text-slate-800 tracking-tighter">
											{hasilDetail.execution_time?.topsis_ms}
										</span>
										<span className="text-[10px] font-bold text-slate-400">ms</span>
									</div>
								</div>
							</div>

							<div className="mt-6 flex items-center justify-between gap-2 text-[10px] font-black text-slate-500 bg-slate-100/50 p-4 rounded-2xl border border-slate-200/50">
								<div className="flex items-center gap-2">
									<MdSpeed size={18} className="text-indigo-600" />
									<span className="uppercase tracking-widest">Total Latensi Sistem</span>
								</div>
								<span className="font-mono text-xs bg-white px-3 py-1 rounded-lg shadow-sm">
									{(
										hasilDetail.execution_time?.saw_ms + hasilDetail.execution_time?.topsis_ms
									).toFixed(4)}{" "}
									ms
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<RankingCard title="Ranking SAW" ranking={hasilDetail.saw?.ranking} accentColor="sky" />
						<RankingCard
							title="Ranking TOPSIS"
							ranking={hasilDetail.topsis?.ranking}
							accentColor="emerald"
						/>
					</div>

					<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div className="flex items-center gap-3 border-b border-slate-200 pb-4">
							<MdFunctions className="text-indigo-600" size={24} />
							<h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
								Detail Transparansi Matriks
							</h3>
						</div>

						<div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-12">
							<div className="space-y-6">
								<h4 className="font-black uppercase text-sm tracking-widest text-sky-700 flex items-center gap-2">
									<span className="w-8 h-px bg-sky-200"></span> Tahapan SAW
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<MatrixTable
										title="Matriks Keputusan (X)"
										data={hasilDetail.saw?.detail?.matriks_keputusan_X}
										color="sky"
									/>
									<MatrixTable
										title="Matriks Normalisasi (R)"
										data={hasilDetail.saw?.detail?.matriks_normalisasi_R}
										color="sky"
									/>
								</div>
							</div>

							<div className="space-y-6 pt-10 border-t border-slate-50">
								<h4 className="font-black uppercase text-sm tracking-widest text-emerald-700 flex items-center gap-2">
									<span className="w-8 h-px bg-emerald-200"></span> Tahapan TOPSIS
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<MatrixTable
										title="Matriks Normalisasi (R)"
										data={hasilDetail.topsis?.detail?.matriks_normalisasi_R}
										color="emerald"
									/>
									<MatrixTable
										title="Matriks Terbobot (Y)"
										data={hasilDetail.topsis?.detail?.matriks_terbobot_Y}
										color="emerald"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
									<VectorList
										title="Solusi Ideal Positif (+)"
										values={hasilDetail.topsis?.detail?.solusi_ideal_plus}
										color="emerald"
									/>
									<VectorList
										title="Solusi Ideal Negatif (-)"
										values={hasilDetail.topsis?.detail?.solusi_ideal_min}
										color="emerald"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function RankingCard({ title, ranking = [], accentColor }) {
	const isSky = accentColor === "sky";
	return (
		<div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40">
			<span
				className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 inline-block ${
					isSky ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"
				}`}
			>
				{title}
			</span>
			<div className="space-y-4">
				{ranking?.slice(0, 5).map((item, index) => (
					<div
						key={index}
						className={`flex items-center justify-between p-5 border rounded-2xl transition-all ${
							index === 0
								? isSky
									? "bg-sky-50 border-sky-200 shadow-md"
									: "bg-emerald-50 border-emerald-200 shadow-md"
								: "bg-white border-slate-100"
						}`}
					>
						<div className="flex items-center gap-4">
							<div
								className={`w-10 h-10 flex items-center justify-center rounded-xl font-black ${
									index === 0
										? (isSky ? "bg-sky-600" : "bg-emerald-600") + " text-white"
										: "bg-slate-100 text-slate-400"
								}`}
							>
								{index + 1}
							</div>
							<div>
								<span
									className={`font-black uppercase tracking-tight block ${
										index === 0 ? "text-slate-900" : "text-slate-600"
									}`}
								>
									{item.nama_motor}
								</span>
								{index === 0 && (
									<span
										className={`text-[10px] font-bold uppercase flex items-center gap-1 ${
											isSky ? "text-sky-600" : "text-emerald-600"
										}`}
									>
										<MdEmojiEvents /> PEMENANG
									</span>
								)}
							</div>
						</div>
						<span
							className={`text-xl font-black font-mono ${
								index === 0 ? (isSky ? "text-sky-700" : "text-emerald-700") : "text-slate-400"
							}`}
						>
							{item.nilai_preferensi?.toFixed(4)}
						</span>
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
				<MdOutlineGridOn size={16} /> {title}
			</label>
			<div className="overflow-x-auto rounded-2xl border border-slate-200">
				<table className="w-full text-[11px] font-mono border-collapse">
					<thead>
						<tr className="bg-slate-50">
							<th className="p-3 border-b border-slate-200 text-slate-500 font-black text-left">
								ALT
							</th>
							{headers.map((h) => (
								<th
									key={h}
									className="p-3 border-b border-slate-200 text-slate-500 font-black text-center"
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{entries.map(([altKey, values]) => (
							<tr key={altKey} className="hover:bg-slate-50/50 transition-colors text-[12px]">
								<td className="p-3 font-black text-slate-600 border-r border-slate-100 bg-slate-50/20 whitespace-nowrap">
									{altKey}
								</td>
								{Object.values(values).map((val, i) => (
									<td
										key={i}
										className={`p-3 text-center border-r border-slate-50 last:border-0 font-bold ${
											isSky ? "text-sky-600" : "text-emerald-600"
										}`}
									>
										{typeof val === "number" ? val.toFixed(4) : val}
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
			<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
				{title}
			</label>
			<div className="flex flex-wrap gap-2">
				{values.map((v, i) => (
					<div
						key={i}
						className={`px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[10px] font-bold ${
							color === "emerald" ? "text-emerald-700" : "text-sky-700"
						}`}
					>
						C{i + 1}: {v.toFixed(4)}
					</div>
				))}
			</div>
		</div>
	);
}
