import React from "react";
import { Link } from "react-router-dom";

export default function DataMotorPage() {
	const motorList = [
		{ id: "A1", nama: "Alessa eX3000", harga: "17jt", jarak: "50 km" },
		{ id: "A2", nama: "Exotic Mizone", harga: "10jt", jarak: "55 km" },
		{ id: "A3", nama: "Uwinfly T3 Pro", harga: "9jt", jarak: "60 km" },
		{ id: "A4", nama: "Smoot Zuzu", harga: "15jt", jarak: "60 km" },
		{ id: "A5", nama: "Viar Q1", harga: "21jt", jarak: "60 km" },
	];

	return (
		<div className="flex flex-col h-screen overflow-hidden bg-white">
			<div className="flex flex-1 overflow-hidden">
				{/* Main Content (Gambar 8 nomor 2 & 3) */}
				<main className="flex-1 overflow-y-auto bg-gray-50/30 p-8">
					<div className="max-w-6xl mx-auto">
						<h2 className="text-2xl font-bold text-gray-800 mb-6">Data Motor Listrik</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{motorList.map((motor) => (
								<div
									key={motor.id}
									className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-sky-300 transition-all group"
								>
									<div className="w-full h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-bold italic group-hover:bg-sky-50 transition-colors">
										GAMBAR
									</div>
									<h3 className="font-bold text-gray-800 text-lg">{motor.nama}</h3>
									<div className="mt-3 space-y-1">
										<p className="text-sm text-gray-500 flex justify-between">
											<span>Harga:</span>{" "}
											<span className="font-semibold text-sky-700">{motor.harga}</span>
										</p>
										<p className="text-sm text-gray-500 flex justify-between">
											<span>Jarak:</span>{" "}
											<span className="font-semibold text-gray-700">{motor.jarak}</span>
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
