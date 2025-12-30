import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdElectricBolt, MdArrowBack, MdSearch } from "react-icons/md";
import Button from "../../components/Button";

export default function KriteriaPage() {
	const navigate = useNavigate();
	const kriteriaList = [
		{ id: "C1", nama: "Harga", desc: "Seberapa penting faktor harga bagi Anda?" },
		{ id: "C2", nama: "Jarak Tempuh", desc: "Pentingnya jangkauan jarak baterai?" },
		{ id: "C3", nama: "Ketahanan Baterai", desc: "Kualitas dan umur pakai baterai?" },
		{ id: "C4", nama: "Waktu Pengisian", desc: "Seberapa penting kecepatan cas?" },
	];

	return (
		<main className="bg-gray-50/30 text-left px-6">
			<div className=" mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 mb-2">Pilih Kriteria</h2>
				<p className="text-gray-500 text-sm mb-8 italic text-left">
					*Masukkan angka 1-5 untuk menentukan tingkat kepentingan.
				</p>

				<div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
					<div className="space-y-6">
						{kriteriaList.map((k) => (
							<div
								key={k.id}
								className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
							>
								<div className="text-left">
									<h4 className="font-bold text-gray-800">
										{k.nama} ({k.id})
									</h4>
									<p className="text-xs text-gray-400">{k.desc}</p>
								</div>
								<input
									type="number"
									min="1"
									max="5"
									className="w-full md:w-32 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-700 outline-none text-center font-bold"
									placeholder="1-5"
								/>
							</div>
						))}
					</div>

					<Button
						onClick={() => navigate("/user/hasil")}
						className="w-full mt-10 bg-sky-700 hover:bg-sky-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-100 transition-all active:scale-95"
					>
						<MdSearch size={20} /> Cari Rekomendasi
					</Button>
				</div>
			</div>
		</main>
	);
}
