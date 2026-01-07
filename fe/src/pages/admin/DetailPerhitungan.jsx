import React, { useEffect } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import Loading from "../../components/Loading";

export default function DetailPerhitungan() {
	const {
		data: response,
		loading,
		execute,
	} = useFetch("/rekomendasi", "POST", null, {
		autoFetch: false,
	});

	useEffect(() => {
		execute({ detail: true });
	}, [execute]);
	const sawData = response?.data?.saw;
	const topsisData = response?.data?.topsis;

	if (loading && !response) return <Loading />;

	return (
		<>
			<h1 className="text-2xl mb-8 font-bold text-gray-800">Perhitungan TOPSIS dan SAW</h1>
			<div className="flex justify-around gap-6 mb-10">
				<div className="bg-white w-full p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
					<div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">SAW</div>
					<p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
						Pemenang SAW
					</p>
					<h2 className="text-2xl font-bold text-slate-800">
						{sawData?.ranking?.[0]?.nama_motor || "-"}
					</h2>
					<p className="text-4xl font-black text-slate-900 mt-2">
						{sawData?.ranking?.[0]?.nilai_preferensi?.toFixed(4) || "0.0000"}
					</p>
				</div>
				<div className="bg-white w-full p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
					<div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">TOPSIS</div>
					<p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
						Pemenang TOPSIS
					</p>
					<h2 className="text-2xl font-bold text-slate-800">
						{topsisData?.ranking?.[0]?.nama_motor || "-"}
					</h2>
					<p className="text-4xl font-black text-slate-900 mt-2">
						{topsisData?.ranking?.[0]?.nilai_preferensi?.toFixed(4) || "0.0000"}
					</p>
				</div>
			</div>

			<div className="space-y-4">
				<details className="group bg-white rounded-2xl border border-slate-100 shadow-sm" open>
					<summary className="flex items-center justify-between p-6 cursor-pointer list-none">
						<span className="font-bold text-slate-700 tracking-tight">
							1. Matriks Keputusan Awal
						</span>
						<span className="text-sky-700 group-open:rotate-180 transition-transform">▼</span>
					</summary>
					<div className="p-6 pt-0 overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="text-slate-400 border-b border-slate-50 text-xs">
									<th className="pb-4 font-medium text-left">ALT</th>
									{sawData?.detail?.matriks_keputusan?.[0]?.map((_, i) => (
										<th key={i} className="pb-4 font-medium text-center">
											C{i + 1}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-50">
								{sawData?.detail?.matriks_keputusan?.map((row, index) => (
									<tr key={index} className="hover:bg-slate-50/50">
										<td className="py-4 font-bold text-slate-800">A{index + 1}</td>
										{row.map((v, i) => (
											<td key={i} className="py-4 text-center text-slate-600 font-mono">
												{v}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</details>

				<details className="group bg-white rounded-2xl border border-slate-100 shadow-sm">
					<summary className="flex items-center justify-between p-6 cursor-pointer list-none">
						<span className="font-bold text-slate-700 tracking-tight">
							2. Normalisasi & Preferensi (SAW)
						</span>
						<span className="text-sky-700 group-open:rotate-180 transition-transform">▼</span>
					</summary>
					<div className="p-6 pt-0">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
							{sawData?.ranking?.map((item, idx) => (
								<div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
									<p className="text-[10px] font-bold text-slate-400 uppercase">
										{item.kode} - {item.nama_motor}
									</p>
									<p className="text-lg font-black text-slate-700">
										{item.nilai_preferensi.toFixed(4)}
									</p>
								</div>
							))}
						</div>
					</div>
				</details>

				<details className="group bg-white rounded-2xl border border-slate-100 shadow-sm">
					<summary className="flex items-center justify-between p-6 cursor-pointer list-none">
						<span className="font-bold text-slate-700 tracking-tight">
							3. Solusi Ideal & Jarak (TOPSIS)
						</span>
						<span className="text-sky-700 group-open:rotate-180 transition-transform">▼</span>
					</summary>
					<div className="p-6 pt-0">
						<div className="flex gap-4 mb-6">
							<div className="flex-1 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
								<p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">
									D+ (Jarak Ideal Positif)
								</p>
								<div className="text-sm font-mono text-emerald-800 flex flex-wrap gap-2">
									{topsisData?.detail?.jarak_positif?.map((val, idx) => (
										<span key={idx}>
											A{idx + 1}: {val.toFixed(4)}{" "}
											{idx < topsisData.detail.jarak_positif.length - 1 && "|"}{" "}
										</span>
									))}
								</div>
							</div>
							<div className="flex-1 p-4 bg-rose-50 rounded-2xl border border-rose-100">
								<p className="text-[10px] text-rose-600 font-bold uppercase mb-1">
									D- (Jarak Ideal Negatif)
								</p>
								<div className="text-sm font-mono text-rose-800 flex flex-wrap gap-2">
									{topsisData?.detail?.jarak_negatif?.map((val, idx) => (
										<span key={idx}>
											A{idx + 1}: {val.toFixed(4)}{" "}
											{idx < topsisData.detail.jarak_negatif.length - 1 && "|"}{" "}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</details>
			</div>

			<footer className="mt-12 flex justify-end">
				<Button className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black hover:shadow-xl transition-all active:scale-95">
					Cetak Laporan Perbandingan
				</Button>
			</footer>
		</>
	);
}
