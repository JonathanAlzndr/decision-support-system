import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import {
	MdTune,
	MdOutlineAdsClick,
	MdKeyboardArrowRight,
	MdCheckCircle,
	MdRadioButtonUnchecked,
} from "react-icons/md";

export default function PilihKriteriaUser() {
	const navigate = useNavigate();
	const [alternatifs, setAlternatifs] = useState([]);
	const [bobotCustom, setBobotCustom] = useState([]);
	const [selectedAlt, setSelectedAlt] = useState("");
	const [isDetail, setIsDetail] = useState(false);

	const { execute: executeAlternatif } = useFetch("/alternatif", "GET", null, { autoFetch: false });
	const { execute: executeKriteria } = useFetch("/kriteria", "GET", null, { autoFetch: false });
	const { loading: calculating, execute: executeHitung } = useFetch("/rekomendasi", "POST", null, {
		autoFetch: false,
	});

	useEffect(() => {
		const initData = async () => {
			const resAlt = await executeAlternatif();
			if (resAlt && resAlt.data) setAlternatifs(resAlt.data);

			const resKrit = await executeKriteria();
			if (resKrit && resKrit.data) {
				setBobotCustom(
					resKrit.data.map((k) => ({
						kriteria_kode: k.kode,
						nama: k.nama,
						nilai: k.bobot,
					}))
				);
			}
		};
		initData();
	}, []);

	const handleBobotChange = (kode, val) => {
		let num = parseFloat(val);
		if (num > 1.0) num = 1.0;
		if (num < 0) num = 0;

		setBobotCustom((prev) =>
			prev.map((b) => (b.kriteria_kode === kode ? { ...b, nilai: isNaN(num) ? 0 : num } : b))
		);
	};

	const onHitung = async () => {
		if (!selectedAlt) return;
		try {
			const payload = {
				detail: isDetail,
				bobot_custom: bobotCustom.map((b) => ({ kriteria_kode: b.kriteria_kode, nilai: b.nilai })),
			};

			const res = await executeHitung(payload);
			if (res && res.status === "success") {
				navigate("/user/hasil", { state: { dataRekomendasi: res.data } });
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8 pb-20 text-left min-h-screen">
			<div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div>
					<h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">
						Konfigurasi Preferensi
					</h1>
					<p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
						Personalize your recommendation criteria
					</p>
				</div>
				<Button
					onClick={onHitung}
					disabled={calculating || !selectedAlt}
					className={`px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-3 uppercase text-xs tracking-widest ${
						!selectedAlt
							? "bg-slate-100 text-slate-400 cursor-not-allowed"
							: "bg-sky-700 text-white hover:bg-sky-800 shadow-xl shadow-sky-100"
					}`}
				>
					{calculating ? "Processing..." : "Dapatkan Hasil"}
					<MdKeyboardArrowRight size={20} />
				</Button>
			</div>
			<div
				onClick={() => setIsDetail(!isDetail)}
				className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
					isDetail
						? "bg-sky-50 border-sky-200 shadow-sm"
						: "bg-white border-slate-100 hover:border-slate-200"
				}`}
			>
				<div className="flex items-center gap-4">
					<div className={isDetail ? "text-sky-600" : "text-slate-300"}>
						{isDetail ? <MdCheckCircle size={32} /> : <MdRadioButtonUnchecked size={32} />}
					</div>
					<div>
						<h4
							className={`font-black uppercase text-xs tracking-tight ${
								isDetail ? "text-sky-900" : "text-slate-700"
							}`}
						>
							Tampilkan Detail Perhitungan
						</h4>
						<p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
							Sertakan langkah-langkah normalisasi dan matriks keputusan
						</p>
					</div>
				</div>
				<div
					className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
						isDetail ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-400"
					}`}
				>
					{isDetail ? "Detail On" : "Detail Off"}
				</div>
			</div>
			<div className="space-y-8">
				<div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
							1
						</div>
						<h3 className="text-sm font-black text-slate-700 uppercase tracking-tight">
							Pilih Motor Listrik Utama
						</h3>
					</div>
					<div className="relative">
						<select
							value={selectedAlt}
							onChange={(e) => setSelectedAlt(e.target.value)}
							className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700 focus:border-sky-500 transition-all appearance-none"
						>
							<option value="">-- Pilih Alternatif Motor --</option>
							{alternatifs.map((alt) => (
								<option key={alt.id} value={alt.id}>
									[{alt.kode}] {alt.nama_motor}
								</option>
							))}
						</select>
						<div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
							<MdOutlineAdsClick size={24} />
						</div>
					</div>
				</div>

				<div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
					<div className="flex items-center gap-3 mb-8">
						<div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
							2
						</div>
						<h3 className="text-sm font-black text-slate-700 uppercase tracking-tight">
							Atur Prioritas Kriteria (Maksimal 1.0)
						</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{bobotCustom.map((b) => (
							<div
								key={b.kriteria_kode}
								className="group p-5 bg-slate-50/50 border-2 border-slate-50 rounded-2xl hover:border-sky-100 hover:bg-white transition-all"
							>
								<div className="flex flex-col gap-3">
									<label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
										{b.nama}
									</label>
									<div className="flex items-center gap-3">
										<input
											type="number"
											min="0"
											max="1"
											step="0.01"
											value={b.nilai}
											onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
											onChange={(e) => handleBobotChange(b.kriteria_kode, e.target.value)}
											className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl font-mono font-black text-sky-700 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
										/>
										<div className="bg-sky-100 text-sky-700 px-3 py-3 rounded-xl font-black text-[10px] min-w-15.25 text-center">
											{(b.nilai * 100).toFixed(0)}%
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
