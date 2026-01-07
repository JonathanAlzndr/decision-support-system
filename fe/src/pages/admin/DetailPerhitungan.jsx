import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import { MdTune, MdAutoGraph, MdCalculate, MdDirectionsBike, MdStar } from "react-icons/md";

export default function PilihKriteriaUser() {
	const [kriterias, setKriterias] = useState([]);
	const [bobotCustom, setBobotCustom] = useState([]);
	const [hasilRekomendasi, setHasilRekomendasi] = useState(null);

	const { execute: executeKriteria } = useFetch("/kriteria", "GET", null, { autoFetch: false });
	const { loading: calculating, execute: executeHitung } = useFetch("/rekomendasi", "POST", null, {
		autoFetch: false,
	});

	useEffect(() => {
		const fetchKriteria = async () => {
			const res = await executeKriteria();
			if (res && res.data) {
				setKriterias(res.data);
				const initialBobot = res.data.map((k) => ({
					kriteria_kode: k.kode,
					nama: k.nama,
					nilai: k.bobot,
				}));
				setBobotCustom(initialBobot);
			}
		};
		fetchKriteria();
	}, []);

	const handleBobotChange = (kode, val) => {
		setBobotCustom((prev) =>
			prev.map((b) => (b.kriteria_kode === kode ? { ...b, nilai: parseFloat(val) || 0 } : b))
		);
	};

	const onHitung = async () => {
		try {
			const payload = {
				detail: false,
				bobot_custom: bobotCustom.map((b) => ({
					kriteria_kode: b.kriteria_kode,
					nilai: b.nilai,
				})),
			};

			const res = await executeHitung(payload);
			if (res && res.status === "success") {
				setHasilRekomendasi(res.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="space-y-6 pb-12 text-left bg-slate-50/20 min-h-screen">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
				<div>
					<h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none">
						Pilih Prioritas
					</h1>
					<p className="text-slate-400 text-[10px] font-bold mt-2 uppercase tracking-widest">
						Kustomisasi Bobot & Preferensi Anda
					</p>
				</div>
				<Button
					onClick={onHitung}
					disabled={calculating}
					className="bg-sky-700 text-white px-8 py-3 rounded-xl font-black hover:bg-sky-800 transition shadow-xl shadow-sky-100 flex items-center gap-2 uppercase tracking-widest text-xs"
				>
					<MdCalculate size={20} />
					{calculating ? "Processing..." : "Dapatkan Rekomendasi"}
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<div className="lg:col-span-4">
					<div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
						<h3 className="text-[10px] font-black text-sky-700 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
							<MdTune size={18} /> Atur Prioritas (0.0 - 1.0)
						</h3>
						<div className="space-y-6">
							{bobotCustom.map((b) => (
								<div key={b.kriteria_kode} className="space-y-2">
									<div className="flex justify-between items-end">
										<label className="text-[10px] font-black text-slate-600 uppercase tracking-tight">
											{b.nama}
										</label>
										<span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
											{(b.nilai * 100).toFixed(0)}%
										</span>
									</div>
									<input
										type="range"
										min="0"
										max="1"
										step="0.01"
										value={b.nilai}
										onChange={(e) => handleBobotChange(b.kriteria_kode, e.target.value)}
										className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-700"
									/>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="lg:col-span-8">
					{hasilRekomendasi ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
							<RankingResult
								title="Metode SAW"
								ranking={hasilRekomendasi.saw.ranking}
								best={hasilRekomendasi.saw.alternatif_terbaik}
								color="sky"
							/>
							<RankingResult
								title="Metode TOPSIS"
								ranking={hasilRekomendasi.topsis.ranking}
								best={hasilRekomendasi.topsis.alternatif_terbaik}
								color="emerald"
							/>
						</div>
					) : (
						<div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
							<MdDirectionsBike size={60} className="text-slate-200 mb-2" />
							<p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">
								Hasil Rekomendasi
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function RankingResult({ title, ranking, best, color }) {
	const isSky = color === "sky";
	const accentText = isSky ? "text-sky-700" : "text-emerald-700";
	const accentBg = isSky ? "bg-sky-700" : "bg-emerald-700";
	const borderCol = isSky ? "border-sky-100" : "border-emerald-100";

	return (
		<div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden flex flex-col">
			<div className="p-5 border-b border-slate-50 bg-slate-50/30">
				<h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
					<MdAutoGraph size={16} /> {title}
				</h3>
			</div>

			<div className={`p-5 ${isSky ? "bg-sky-50/30" : "bg-emerald-50/30"} border-b ${borderCol}`}>
				<div className="flex items-center gap-2 mb-1">
					<MdStar className={accentText} size={16} />
					<span className={`text-[9px] font-black uppercase tracking-widest ${accentText}`}>
						Rekomendasi Utama
					</span>
				</div>
				<h4 className="text-lg font-black text-slate-800 uppercase tracking-tight truncate">
					{best.nama_motor}
				</h4>
			</div>

			<div className="p-3 space-y-1 flex-grow">
				{ranking.map((item, idx) => (
					<div
						key={idx}
						className={`flex items-center justify-between p-3 rounded-xl transition-all ${
							idx === 0 ? "bg-white shadow-sm ring-1 ring-slate-100" : "hover:bg-slate-50"
						}`}
					>
						<div className="flex items-center gap-3">
							<span
								className={`w-6 h-6 flex items-center justify-center rounded-lg font-black text-[10px] ${
									idx === 0 ? `${accentBg} text-white` : "bg-slate-100 text-slate-400"
								}`}
							>
								{idx + 1}
							</span>
							<p className="font-black text-slate-700 uppercase text-[10px] tracking-tight">
								{item.nama_motor}
							</p>
						</div>
						<span className={`font-mono font-black text-xs ${accentText}`}>
							{item.nilai_preferensi.toFixed(4)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
