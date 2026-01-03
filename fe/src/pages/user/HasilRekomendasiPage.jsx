import React, { useEffect, useState } from "react";
import { MdEmojiEvents } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

export default function HasilRekomendasiPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [results, setResults] = useState({ saw: [], topsis: [] });

	useEffect(() => {
		const dataRekomendasi = location.state?.dataRekomendasi;

		if (!dataRekomendasi) {
			navigate("/user/kriteria");
			return;
		}

		setResults({
			saw: dataRekomendasi.saw?.ranking || [],
			topsis: dataRekomendasi.topsis?.ranking || [],
		});
	}, [location.state, navigate]);

	return (
		<div className="flex-1 overflow-y-auto bg-gray-50/30 p-8">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 mb-8 tracking-tight">Hasil Rekomendasi</h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
					<div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
						<div className="flex items-center justify-between mb-6">
							<span className="bg-sky-100 text-sky-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
								Metode SAW
							</span>
						</div>
						<div className="space-y-4">
							{results.saw.map((item, index) => (
								<div
									key={`saw-${index}`}
									className={`flex items-center justify-between p-4 border rounded-2xl transition-all ${
										index === 0
											? "bg-yellow-50 border-yellow-200 shadow-sm"
											: "bg-gray-50 border-gray-100"
									}`}
								>
									<div className="flex items-center gap-3">
										{index === 0 && <MdEmojiEvents className="text-yellow-600" size={24} />}
										<span
											className={`font-bold italic ${
												index === 0 ? "text-yellow-800" : "text-gray-700"
											}`}
										>
											{item.nama_motor}
										</span>
									</div>
									<span
										className={`text-sm font-black ${
											index === 0 ? "text-yellow-700" : "text-gray-400"
										}`}
									>
										{item.nilai_preferensi?.toFixed(4) || "0.0000"}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
						<div className="flex items-center justify-between mb-6 text-left">
							<span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
								Metode TOPSIS
							</span>
						</div>
						<div className="space-y-4 text-left">
							{results.topsis.map((item, index) => (
								<div
									key={`topsis-${index}`}
									className={`flex items-center justify-between p-4 border rounded-2xl transition-all ${
										index === 0
											? "bg-yellow-50 border-yellow-200 shadow-sm"
											: "bg-gray-50 border-gray-100"
									}`}
								>
									<div className="flex items-center gap-3">
										{index === 0 && <MdEmojiEvents className="text-yellow-600" size={24} />}
										<span
											className={`font-bold italic ${
												index === 0 ? "text-yellow-800" : "text-gray-700"
											}`}
										>
											{item.nama_motor}
										</span>
									</div>
									<span
										className={`text-sm font-black ${
											index === 0 ? "text-yellow-700" : "text-gray-400"
										}`}
									>
										{item.nilai_preferensi?.toFixed(4) || "0.0000"}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
