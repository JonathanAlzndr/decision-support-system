import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import {
	MdTune,
	MdKeyboardArrowRight,
	MdCheckCircle,
	MdRadioButtonUnchecked,
	MdInfoOutline,
} from "react-icons/md";

export default function PilihKriteriaUser() {
	const navigate = useNavigate();
	const [bobotCustom, setBobotCustom] = useState([]);
	const [isDetail, setIsDetail] = useState(false);

	const { execute: executeKriteria } = useFetch("/kriteria", "GET", null, { autoFetch: false });
	const { loading: calculating, execute: executeHitung } = useFetch("/rekomendasi", "POST", null, {
		autoFetch: false,
	});

	useEffect(() => {
		const initData = async () => {
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
		try {
			const payload = {
				detail: isDetail,
				bobot_custom: bobotCustom.map((b) => ({
					kriteria_kode: b.kriteria_kode,
					nilai: b.nilai,
				})),
			};

			const res = await executeHitung(payload);
			if (res && res.status === "success") {
				navigate("/user/hasil", { state: { dataRekomendasi: res.data } });
			}
		} catch (err) {
			alert("Gagal melakukan perhitungan: " + err.message);
			console.error(err);
		}
	};

	return (
		<div className="max-w-5xl mx-auto space-y-8 pb-20 text-left min-h-screen p-4 md:p-0">
			{/* Header Section */}
			<div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<MdTune className="text-sky-600" size={20} />
						<h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">
							Konfigurasi Preferensi
						</h1>
					</div>
					<p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
						Sesuaikan prioritas kriteria untuk hasil personal
					</p>
				</div>
				<Button
					onClick={onHitung}
					disabled={calculating || bobotCustom.length === 0}
					className={`px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-3 uppercase text-xs tracking-widest active:scale-95 ${
						calculating || bobotCustom.length === 0
							? "bg-slate-100 text-slate-400 cursor-not-allowed"
							: "bg-sky-700 text-white hover:bg-sky-800 shadow-xl shadow-sky-100"
					}`}
				>
					{calculating ? "Processing..." : "Dapatkan Rekomendasi"}
					<MdKeyboardArrowRight size={20} />
				</Button>
			</div>

			{/* Detail Mode Toggle */}
			<div
				onClick={() => setIsDetail(!isDetail)}
				className={`p-6 rounded-4xl border-2 transition-all cursor-pointer flex items-center justify-between ${
					isDetail
						? "bg-sky-50 border-sky-200 shadow-sm"
						: "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
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
							Aktifkan Mode Transparansi
						</h4>
						<p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
							Tampilkan langkah-langkah matriks (SAW & TOPSIS) di halaman hasil
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

			{/* Main Form: Bobot Custom */}
			<div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
				<div className="flex items-center gap-4 border-b border-slate-50 pb-6">
					<div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">
						<MdTune size={20} />
					</div>
					<div>
						<h3 className="text-sm font-black text-slate-800 tracking-tight">
							ATUR BOBOT KEPENTINGAN
						</h3>
						<p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
							Gunakan nilai 0.00 hingga 1.00 (Total tidak harus 1)
						</p>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{bobotCustom.map((b) => (
						<div
							key={b.kriteria_kode}
							className="group p-6 bg-slate-50/50 border-2 border-slate-50 rounded-3xl hover:border-sky-100 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
						>
							<div className="flex flex-col gap-4">
								<div className="flex justify-between items-center">
									<label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] flex items-center gap-2">
										<span className="w-2 h-2 rounded-full bg-sky-500"></span>
										{b.nama}
									</label>
									<span className="text-[10px] font-mono text-slate-400 font-bold">
										{b.kriteria_kode}
									</span>
								</div>

								<div className="flex items-center gap-4">
									<div className="relative flex-1">
										<input
											type="number"
											min="0"
											max="1"
											step="0.01"
											value={b.nilai}
											onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
											onChange={(e) => handleBobotChange(b.kriteria_kode, e.target.value)}
											className="w-full bg-white border border-slate-200 px-5 py-4 rounded-2xl font-mono font-black text-sky-700 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-lg"
										/>
									</div>
									<div className="bg-sky-100 text-sky-700 h-14 w-20 flex items-center justify-center rounded-2xl font-black text-xs">
										{(b.nilai * 100).toFixed(0)}%
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
