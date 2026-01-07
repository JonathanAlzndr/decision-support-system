import React, { useEffect, useState } from "react";
import { MdEmojiEvents, MdArrowBack, MdOutlineGridOn, MdFunctions } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function HasilRekomendasiPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [data, setData] = useState(null);

	useEffect(() => {
		const dataRekomendasi = location.state?.dataRekomendasi;
		if (!dataRekomendasi) {
			navigate("/user/kriteria");
			return;
		}
		setData(dataRekomendasi);
	}, [location.state, navigate]);

	if (!data) return null;

	return (
		<div className="flex-1 overflow-y-auto bg-slate-50/20 p-8 min-h-screen text-left">
			<div className="max-w-6xl mx-auto space-y-10">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none">
							Hasil Analisis
						</h2>
						<p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
							{data.saw?.detail ? "Mode Analisis Detail" : "Mode Rekomendasi Standar"}
						</p>
					</div>
					<Button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-slate-500 font-bold hover:text-sky-700 transition-colors uppercase text-xs"
					>
						<MdArrowBack size={20} /> Kembali
					</Button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<RankingCard title="Metode SAW" ranking={data.saw?.ranking} accentColor="sky" />
					<RankingCard title="Metode TOPSIS" ranking={data.topsis?.ranking} accentColor="emerald" />
				</div>

				{data.saw?.detail && (
					<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div className="flex items-center gap-3 border-b border-slate-200 pb-4">
							<MdFunctions className="text-sky-600" size={24} />
							<h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
								Detail Perhitungan Matriks
							</h3>
						</div>

						<div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
							<div className="space-y-6">
								<h4 className="font-black uppercase text-sm tracking-widest text-sky-700">
									Tahapan SAW
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

							<div className="space-y-6 pt-10 border-t border-slate-50">
								<h4 className="font-black uppercase text-sm tracking-widest text-emerald-700">
									Tahapan TOPSIS
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
									<VectorList
										title="Solusi Ideal Positif (+)"
										values={data.topsis.detail.solusi_ideal_plus}
										color="emerald"
									/>
									<VectorList
										title="Solusi Ideal Negatif (-)"
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
				{ranking.map((item, index) => (
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
										<MdEmojiEvents /> Winner
									</span>
								)}
							</div>
						</div>
						<span
							className={`text-lg font-black font-mono ${
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
		<div className="space-y-2">
			<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
				<MdOutlineGridOn /> {title}
			</label>
			<div className="overflow-x-auto rounded-xl border border-slate-200">
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
							<tr key={altKey}>
								<td className="p-3 font-black text-slate-600 border-r border-slate-100 bg-slate-50/20">
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
		<div className="space-y-2">
			<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
				{title}
			</label>
			<div className="flex flex-wrap gap-2">
				{values.map((v, i) => (
					<div
						key={i}
						className={`px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 font-mono text-[10px] font-bold ${
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
