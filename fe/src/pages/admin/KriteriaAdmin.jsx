import Button from "../../components/Button";

export default function KriteriaAdmin() {
	return (
		<>
			<h1 className="text-2xl font-bold text-gray-800 mb-8">Data Kriteria</h1>
			<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
				<h3 className="text-xl font-bold text-gray-800 mb-6">Tentukan Preferensi Anda</h3>
				<p className="text-gray-500 mb-8 text-sm italic">
					*Masukkan angka 1-5 (1: Sangat Tidak Penting, 5: Sangat Penting)
				</p>

				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-2">
						<label className="text-sm font-semibold text-gray-700">Pentingnya Harga (C1)</label>
						<input
							type="number"
							placeholder="Contoh: 5"
							className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-700 outline-none"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-semibold text-gray-700">Jarak Tempuh (C2)</label>
						<input
							type="number"
							placeholder="Contoh: 4"
							className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-700 outline-none"
						/>
					</div>
				</div>

				<div className="mt-10 border-t pt-8 w-full flex justify-center">
					<Button className="w-1/3 bg-sky-700 text-white py-4 rounded-xl font-bold text-sm hover:bg-sky-800 transition shadow-lg">
						CARI REKOMENDASI TERBAIK
					</Button>
				</div>
			</div>
		</>
	);
}
