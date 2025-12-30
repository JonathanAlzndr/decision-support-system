import React, { useState } from "react";
import Button from "../../components/Button";

export default function AlternatifAdmin() {
	return (
		<>
			<h1 className="text-2xl font-bold text-gray-800 mb-8">Data Alternatif</h1>
			<div className="bg-white border border-gray-200 rounded-xl shadow-sm">
				<div className="p-5 border-b border-gray-200 flex flex-col gap-4 justify-between bg-gray-50">
					<input
						type="text"
						placeholder="Cari Nama Motor..."
						className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-700 focus:outline-none text-sm"
					/>
					<Button className="bg-sky-700 text-white px-5 py-2 w-1/3 rounded-lg text-sm font-semibold hover:bg-sky-800 transition shadow-md">
						+ Tambah Alternatif
					</Button>
				</div>

				<table className="w-full">
					<thead>
						<tr className="bg-white text-gray-400 uppercase text-[11px] tracking-wider border-b border-gray-200">
							<th className="px-6 py-4 font-medium">No</th>
							<th className="px-6 py-4 font-medium">Nama Motor</th>
							<th className="px-6 py-4 font-medium">Harga (C1)</th>
							<th className="px-6 py-4 font-medium">Jarak (C2)</th>
							<th className="px-6 py-4 font-medium text-center">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 text-sm">
						<tr className="hover:bg-gray-50 transition">
							<td className="px-6 py-4 text-gray-500">1</td>
							<td className="px-6 py-4 font-semibold text-gray-800">Alessa eX3000</td>
							<td className="px-6 py-4 text-gray-600">17jt</td>
							<td className="px-6 py-4 text-gray-600">50 km</td>
							<td className="px-6 py-4 text-center">
								<Button className="text-sky-700 font-medium hover:underline mr-3">Edit</Button>
								<Button className="text-red-500 font-medium hover:underline">Hapus</Button>
							</td>
						</tr>
						{/* Data lainnya... */}
					</tbody>
				</table>
			</div>
		</>
	);
}
