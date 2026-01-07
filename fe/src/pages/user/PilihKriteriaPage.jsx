import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import Loading from "../../components/Loading";

export default function PilihKriteriaPage() {
	const navigate = useNavigate();
	const [kriterias, setKriterias] = useState([]);
	const [bobotData, setBobotData] = useState({});

	const { loading: loadingGET, execute: executeGET } = useFetch("/kriteria", "GET", null, {
		autoFetch: false,
	});

	const { loading: loadingPOST, execute: executePOST } = useFetch("/rekomendasi", "POST", null, {
		autoFetch: false,
	});

	useEffect(() => {
		const fetchKriteria = async () => {
			try {
				const res = await executeGET();
				if (res && res.data) {
					setKriterias(res.data);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchKriteria();
	}, [executeGET]);

	const handleInputChange = (kode, value) => {
		setBobotData({
			...bobotData,
			[kode]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formattedBobot = Object.entries(bobotData).map(([kode, nilai]) => ({
			kriteria_kode: kode,
			nilai: parseFloat(nilai),
		}));

		const payload = {
			detail: false,
			bobot_custom: formattedBobot,
		};

		try {
			const response = await executePOST(payload);
			if (response && response.status === "success") {
				navigate("/hasil-rekomendasi", { state: { result: response.data } });
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="bg-gray-50/30 text-left px-8 py-8">
			{(loadingGET || loadingPOST) && <Loading />}
			<div className="mb-8">
				<h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
					Pilih Kriteria
				</h2>
				<p className="text-gray-500 text-sm italic font-medium">
					* Masukkan angka 1-5 untuk menentukan tingkat kepentingan (1: Sangat Rendah, 5: Sangat
					Tinggi).
				</p>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm relative overflow-hidden">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="divide-y divide-gray-100">
						{kriterias.map((k) => (
							<div
								key={k.id}
								className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 first:pt-0 last:pb-0 group transition-all"
							>
								<div className="text-left flex-1">
									<h4 className="font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
										{k.nama}
										<span className="text-sky-600 text-[10px] bg-sky-50 px-2 py-0.5 rounded-md">
											{k.kode}
										</span>
									</h4>
									<p className="text-xs text-gray-400 mt-1 font-medium italic">
										Tentukan tingkat kepentingan untuk kriteria ini.
									</p>
								</div>

								<div className="flex items-center gap-4">
									<div className="relative">
										<input
											type="number"
											min="1"
											max="5"
											required
											value={bobotData[k.kode] || ""}
											onChange={(e) => handleInputChange(k.kode, e.target.value)}
											className="w-full md:w-32 border-2 border-slate-100 bg-slate-50 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-sky-700/10 focus:border-sky-700 focus:bg-white outline-none text-center font-black text-sky-700 transition-all placeholder:text-slate-300"
											placeholder="1-5"
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					{kriterias.length > 0 && (
						<Button
							type="submit"
							className="w-full md:w-4/12 mt-10 bg-sky-700 hover:bg-sky-800 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-sky-100 transition-all active:scale-95 uppercase text-xs tracking-[0.2em]"
						>
							<MdSearch size={22} /> Cari Rekomendasi Terbaik
						</Button>
					)}
				</form>

				{!loadingGET && kriterias.length === 0 && (
					<div className="text-center py-10">
						<p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
							Data kriteria tidak tersedia
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
