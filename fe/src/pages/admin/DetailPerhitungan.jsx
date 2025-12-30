import Button from "../../components/Button";

export default function DetailPerhitungan() {
	return (
		<>
			<h1 className="text-2xl mb-8 font-bold text-gray-800">Perhitungan TOPSIS dan SAW</h1>
			<div className="flex justify-around gap-6 mb-10">
				<div className="bg-white w-full p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
					<div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">SAW</div>
					<p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
						Pemenang SAW
					</p>
					<h2 className="text-2xl font-bold text-slate-800">Viar Q1</h2>
					<p className="text-4xl font-black text-slate-900 mt-2">0.8458</p>
				</div>
				<div className="bg-white w-full p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
					<div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">TOPSIS</div>
					<p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
						Pemenang TOPSIS
					</p>
					<h2 className="text-2xl font-bold text-slate-800">Viar Q1</h2>
					<p className="text-4xl font-black text-slate-900 mt-2">0.7817</p>
				</div>
			</div>

			{/* DETAIL PERHITUNGAN - COLLAPSIBLE STYLE */}
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
									{["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"].map((c) => (
										<th key={c} className="pb-4 font-medium text-center">
											{c}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-50">
								<tr className="hover:bg-slate-50/50">
									<td className="py-4 font-bold text-slate-800">A1</td>
									{[2, 3, 2, 3, 2, 2, 2, 3].map((v, i) => (
										<td key={i} className="py-4 text-center text-slate-600 font-mono">
											{v}
										</td>
									))}
								</tr>
								{/* ... baris lainnya ... */}
							</tbody>
						</table>
					</div>
				</details>

				{/* STEP 2 - SAW DETAIL */}
				<details className="group bg-white rounded-2xl border border-slate-100 shadow-sm">
					<summary className="flex items-center justify-between p-6 cursor-pointer list-none">
						<span className="font-bold text-slate-700 tracking-tight">
							2. Normalisasi & Preferensi (SAW)
						</span>
						<span className="text-sky-700 group-open:rotate-180 transition-transform">▼</span>
					</summary>
					<div className="p-6 pt-0">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
							{/* Contoh Card Skor Akhir per Alternatif */}
							<div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
								<p className="text-[10px] font-bold text-slate-400 uppercase">A1 - Alessa</p>
								<p className="text-lg font-black text-slate-700">0.4933</p>
							</div>
							{/* ... Tambahkan A2-A5 ... */}
						</div>
					</div>
				</details>

				{/* STEP 3 - TOPSIS DETAIL */}
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
								<p className="text-sm font-mono text-emerald-800">A1: 0.0895 | A5: 0.0415</p>
							</div>
							<div className="flex-1 p-4 bg-rose-50 rounded-2xl border border-rose-100">
								<p className="text-[10px] text-rose-600 font-bold uppercase mb-1">
									D- (Jarak Ideal Negatif)
								</p>
								<p className="text-sm font-mono text-rose-800">A1: 0.1053 | A5: 0.1485</p>
							</div>
						</div>
					</div>
				</details>
			</div>

			{/* FOOTER ACTION */}
			<footer className="mt-12 flex justify-end">
				<Button className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black hover:shadow-xl transition-all active:scale-95">
					Cetak Laporan Perbandingan
				</Button>
			</footer>
		</>
	);
}
