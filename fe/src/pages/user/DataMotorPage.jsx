import React, { useEffect, useState } from "react";
import useFetch from "../../api/useFetch";

export default function DataMotorPage() {
	const [motorList, setMotorList] = useState([]);

	const {
		data,
		loading,
		execute: executeGET,
	} = useFetch("/alternatif", "GET", null, {
		autoFetch: false,
	});

	useEffect(() => {
		executeGET();
	}, [executeGET]);

	useEffect(() => {
		if (data && data.status === "success") {
			setMotorList(data.data);
		}
	}, [data]);

	return (
		<div className="flex flex-col h-screen overflow-hidden bg-white">
			<div className="flex flex-1 overflow-hidden">
				<main className="flex-1 overflow-y-auto bg-gray-50/30 p-8">
					<div className="mx-auto">
						<div className="flex justify-between items-center mb-8">
							<div>
								<h2 className="text-2xl font-black text-gray-800 tracking-tight">
									Data Motor Listrik
								</h2>
								<p className="text-gray-500 text-sm font-medium"></p>
							</div>
						</div>

						{loading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-700"></div>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{motorList.map((motor) => (
									<div
										key={motor.id}
										className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all group relative overflow-hidden"
									>
										<div className="absolute top-3 right-3 z-10">
											<span className="bg-sky-700 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
												{motor.kode}
											</span>
										</div>

										<div className="w-full h-55 bg-gray-100 rounded-2xl mb-4 overflow-hidden border border-gray-100">
											{motor.gambar_url ? (
												<img
													src={`${motor.gambar_url}?t=${Date.now()}`}
													alt={motor.nama_motor}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-gray-400 font-bold italic text-xs">
													NO IMAGE
												</div>
											)}
										</div>

										<h3 className="font-bold text-gray-800 text-lg line-clamp-1">
											{motor.nama_motor}
										</h3>

										<div className="mt-3 space-y-3">
											<div className="bg-gray-50 p-3 rounded-xl">
												<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
													Deskripsi Kendaraan
												</p>
												<p className="text-xs text-gray-600 leading-relaxed italic line-clamp-3">
													{motor.deskripsi || "Tidak ada deskripsi tersedia untuk model ini."}
												</p>
											</div>
										</div>

										<div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
											<span className="text-[10px] font-bold text-sky-700 uppercase tracking-tighter">
												Status Ready
											</span>
											<div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></div>
										</div>
									</div>
								))}
							</div>
						)}

						{!loading && motorList.length === 0 && (
							<div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
								<p className="text-gray-400 font-medium">
									Belum ada data motor yang ditambahkan oleh admin.
								</p>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
