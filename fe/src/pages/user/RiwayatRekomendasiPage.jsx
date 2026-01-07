import React, { useEffect, useState } from "react";
import useFetch from "../../api/useFetch";
import {
	MdHistory,
	MdDirectionsBike,
	MdCalendarToday,
	MdOutlineAnalytics,
	MdChevronRight,
} from "react-icons/md";

export default function RiwayatRekomendasiPage() {
	const [history, setHistory] = useState([]);
	const [meta, setMeta] = useState({ page: 1, total_page: 1 });

	const { loading, execute: executeGetHistory } = useFetch("/rekomendasi", "GET", null, {
		autoFetch: false,
	});

	const fetchHistory = async (page = 1) => {
		try {
			const res = await executeGetHistory(null, `/rekomendasi?page=${page}&limit=5`);
			if (res && res.status === "success") {
				setHistory(res.data);
				setMeta(res.meta);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchHistory();
	}, []);

	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleDateString("id-ID", options);
	};

	return (
		<div className="max-w-5xl mx-auto space-y-8 pb-20 text-left">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-4xl shadow-sm border border-slate-100 gap-4">
				<div>
					<h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none">
						Riwayat Diagnosis
					</h1>
					<p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
						<MdHistory className="text-sky-600" size={18} /> Rekam jejak rekomendasi motor listrik
						anda
					</p>
				</div>
				<div className="bg-sky-50 px-4 py-2 rounded-xl border border-sky-100">
					<span className="text-sky-700 font-black text-xs uppercase">
						Total: {meta.total_data || 0} Data
					</span>
				</div>
			</div>

			{loading ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="h-24 bg-slate-100 animate-pulse rounded-3xl"></div>
					))}
				</div>
			) : history.length > 0 ? (
				<div className="space-y-4">
					{history.map((item) => (
						<div
							key={item.id}
							className="group bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col md:flex-row justify-between items-center gap-6"
						>
							<div className="flex items-center gap-5 w-full md:w-auto">
								<div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-sky-700 group-hover:text-white transition-colors">
									<MdDirectionsBike size={28} />
								</div>
								<div className="space-y-1">
									<h3 className="font-black text-slate-800 uppercase tracking-tight text-lg leading-none">
										{item.nama_motor}
									</h3>
									<div className="flex items-center gap-3">
										<span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
											{item.kode}
										</span>
										<span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
											<MdCalendarToday size={12} /> {formatDate(item.created_at)}
										</span>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
								<div className="flex gap-6">
									<div className="text-center">
										<p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
											Skor SAW
										</p>
										<p className="font-mono font-black text-sky-600 text-sm bg-sky-50 px-3 py-1 rounded-lg">
											{item.skor_saw.toFixed(4)}
										</p>
									</div>
									<div className="text-center border-l border-slate-100 pl-6">
										<p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
											Skor TOPSIS
										</p>
										<p className="font-mono font-black text-emerald-600 text-sm bg-emerald-50 px-3 py-1 rounded-lg">
											{item.skor_topsis.toFixed(4)}
										</p>
									</div>
								</div>
								<div className="text-slate-300 group-hover:text-sky-700 transition-colors hidden md:block">
									<MdChevronRight size={32} />
								</div>
							</div>
						</div>
					))}

					{/* Pagination Controls */}
					{meta.total_page > 1 && (
						<div className="flex justify-center items-center gap-4 mt-10">
							<Button
								disabled={meta.page === 1}
								onClick={() => fetchHistory(meta.page - 1)}
								className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold hover:bg-slate-50 disabled:opacity-50"
							>
								Previous
							</Button>
							<span className="text-xs font-black text-slate-400 uppercase tracking-widest">
								Page {meta.page} of {meta.total_page}
							</span>
							<Button
								disabled={meta.page === meta.total_page}
								onClick={() => fetchHistory(meta.page + 1)}
								className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold hover:bg-slate-50 disabled:opacity-50"
							>
								Next
							</Button>
						</div>
					)}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-inner">
					<div className="p-6 bg-slate-50 rounded-full mb-4 text-slate-300">
						<MdOutlineAnalytics size={80} />
					</div>
					<p className="text-slate-400 font-black uppercase text-sm tracking-[0.4em]">
						Belum Ada Riwayat
					</p>
					<p className="text-slate-400 text-sm mt-2 font-medium">
						Anda belum pernah melakukan perhitungan rekomendasi.
					</p>
				</div>
			)}
		</div>
	);
}
