import React, { useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import {
	MdCalculate,
	MdAnalytics,
	MdTableChart,
	MdCheckCircle,
	MdLayers,
	MdTrendingUp,
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
			console.error(err);
		}
	};

	return (
		<div className="p-8 space-y-8 bg-slate-50 min-h-screen text-left">
			<div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<span className="h-2 w-12 bg-indigo-600 rounded-full"></span>
						<span className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em]">
							Administrator Mode
						</span>
					</div>
					<h1 className="text-3xl font-black text-slate-800 tracking-tighter leading-none">
						DETAIL PERHITUNGAN
					</h1>
					<p className="text-slate-400 text-xs font-bold mt-2 tracking-widest">
						UDIT TRANSPARANSI METODE SAW & TOPSIS
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
				<div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
							<MdTrendingUp className="absolute -right-4 -bottom-4 text-white/10 size-40 group-hover:scale-110 transition-transform" />
							<div className="relative z-10">
								<p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 mb-6">
									Winner SAW Method
								</p>
								<h2 className="text-4xl font-black mb-2 tracking-tight uppercase">
									{hasilDetail.saw.ranking[0].nama_motor}
								</h2>
								<div className="flex items-center gap-4">
									<span className="text-5xl font-mono font-black">
										{hasilDetail.saw.ranking[0].nilai_preferensi.toFixed(4)}
									</span>
									<div className="h-10 w-px bg-indigo-400"></div>
									<span className="text-[10px] font-bold uppercase leading-tight opacity-80">
										Skor
										<br />
										Preferensi
									</span>
								</div>
							</div>
						</div>

						<div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
							<MdCheckCircle className="absolute -right-4 -bottom-4 text-white/10 size-40 group-hover:scale-110 transition-transform" />
							<div className="relative z-10">
								<p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200 mb-6">
									Winner TOPSIS Method
								</p>
								<h2 className="text-4xl font-black mb-2 tracking-tight uppercase">
									{hasilDetail.topsis.ranking[0].nama_motor}
								</h2>
								<div className="flex items-center gap-4">
									<span className="text-5xl font-mono font-black">
										{hasilDetail.topsis.ranking[0].nilai_preferensi.toFixed(4)}
									</span>
									<div className="h-10 w-px bg-emerald-400"></div>
									<span className="text-[10px] font-bold uppercase leading-tight opacity-80">
										Kedekatan
										<br />
										Relatif
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-8">
						<section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
							<div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-white rounded-lg shadow-sm">
										<MdTableChart className="text-indigo-600" />
									</div>
									<h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">
										Matriks Normalisasi SAW
									</h3>
								</div>
								<span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
									Metode Penjumlahan Terbobot
								</span>
							</div>
							<div className="overflow-x-auto p-6">
								<table className="w-full">
									<thead>
										<tr className="text-left border-b-2 border-slate-100">
											<th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase">
												Alternatif
											</th>
											<th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase">
												Vektor Normalisasi (R)
											</th>
											<th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase text-right">
												Hasil Akhir
											</th>
										</tr>
									</thead>
									<tbody>
										{hasilDetail.saw.ranking.map((item, idx) => (
											<tr
												key={idx}
												className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
											>
												<td className="py-5 px-4">
													<div className="flex items-center gap-3">
														<span className="text-xs font-black text-slate-300 font-mono">
															{(idx + 1).toString().padStart(2, "0")}
														</span>
														<span className="font-black text-slate-700 uppercase text-xs tracking-tight">
															{item.nama_motor}
														</span>
													</div>
												</td>
												<td className="py-5 px-4">
													<div className="flex gap-1">
														{hasilDetail.saw.detail.matriks_normalisasi[idx].map((val, i) => (
															<span
																key={i}
																className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-500"
															>
																{val.toFixed(3)}
															</span>
														))}
													</div>
												</td>
												<td className="py-5 px-4 text-right">
													<span className="font-mono font-black text-indigo-600 text-sm">
														{item.nilai_preferensi.toFixed(4)}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>

						<section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
							<div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-white rounded-lg shadow-sm">
										<MdAnalytics className="text-emerald-600" />
									</div>
									<h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">
										Analisis Jarak TOPSIS
									</h3>
								</div>
								<div className="flex gap-4">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
										<span className="text-[9px] font-black text-slate-400 uppercase">
											Ideal Positif
										</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-rose-500"></div>
										<span className="text-[9px] font-black text-slate-400 uppercase">
											Ideal Negatif
										</span>
									</div>
								</div>
							</div>
							<div className="overflow-x-auto p-6">
								<table className="w-full">
									<thead>
										<tr className="text-left border-b-2 border-slate-100">
											<th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase">
												Alternatif
											</th>
											<th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase text-center">
												D+ (Jarak Positif)
											</th>
											<th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase text-center">
												D- (Jarak Negatif)
											</th>
											<th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase text-right">
												Preferensi
											</th>
										</tr>
									</thead>
									<tbody>
										{hasilDetail.topsis.ranking.map((item, idx) => (
											<tr
												key={idx}
												className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
											>
												<td className="py-5 px-4 font-black text-slate-700 uppercase text-xs tracking-tight">
													{item.nama_motor}
												</td>
												<td className="py-5 px-4 text-center">
													<span className="font-mono text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
														{hasilDetail.topsis.detail.jarak_positif[idx]?.toFixed(4)}
													</span>
												</td>
												<td className="py-5 px-4 text-center">
													<span className="font-mono text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full">
														{hasilDetail.topsis.detail.jarak_negatif[idx]?.toFixed(4)}
													</span>
												</td>
												<td className="py-5 px-4 text-right">
													<span className="font-mono font-black text-slate-800 text-sm">
														{item.nilai_preferensi.toFixed(4)}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>
					</div>
				</div>
			)}
		</div>
	);
}
