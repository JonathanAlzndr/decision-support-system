import React from "react";
import { Link } from "react-router-dom";
import { MdElectricBolt, MdArrowBack, MdEmojiEvents } from "react-icons/md";

export default function HasilRekomendasiPage() {
	return (
		<div className="flex-1 overflow-y-auto bg-gray-50/30 p-8">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 mb-8">Hasil Rekomendasi</h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
					{/* Kolom SAW (Gambar 10 nomor 3) */}
					<div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
						<div className="flex items-center justify-between mb-6">
							<span className="bg-sky-100 text-sky-700 px-4 py-1 rounded-full text-xs font-black uppercase">
								Metode SAW
							</span>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
								<div className="flex items-center gap-3">
									<MdEmojiEvents className="text-yellow-600" size={24} />
									<span className="font-bold text-yellow-800 italic">Viar Q1</span>
								</div>
								<span className="text-sm font-black text-yellow-700">0.8458</span>
							</div>
							<div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
								<span className="font-medium text-gray-700">Uwinfly T3 Pro</span>
								<span className="text-sm font-bold text-gray-400">0.6575</span>
							</div>
						</div>
					</div>

					{/* Kolom TOPSIS (Gambar 10 nomor 4) */}
					<div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
						<div className="flex items-center justify-between mb-6 text-left">
							<span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase">
								Metode TOPSIS
							</span>
						</div>
						<div className="space-y-4 text-left">
							<div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
								<div className="flex items-center gap-3">
									<MdEmojiEvents className="text-yellow-600" size={24} />
									<span className="font-bold text-yellow-800 italic">Viar Q1</span>
								</div>
								<span className="text-sm font-black text-yellow-700">0.7817</span>
							</div>
							<div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
								<span className="font-medium text-gray-700">Alessa eX3000</span>
								<span className="text-sm font-bold text-gray-400">0.5405</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
