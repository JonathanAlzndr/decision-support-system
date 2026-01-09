import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import { MdTune, MdCheckCircle } from "react-icons/md";

export default function PenilaianAdmin() {
	const [penilaians, setPenilaians] = useState([]);
	const [alternatifs, setAlternatifs] = useState([]);
	const [kriterias, setKriterias] = useState([]);
	const [subKriterias, setSubKriterias] = useState({});
	const [addForm, setAddForm] = useState(false);

	const [formData, setFormData] = useState({
		alternatif_id: "",
		penilaian: [],
	});

	const { execute: executeGET } = useFetch("/penilaian", "GET", null, { autoFetch: false });
	const { execute: executeAlternatif } = useFetch("/alternatif", "GET", null, { autoFetch: false });
	const { execute: executePOST } = useFetch("/penilaian/batch", "POST", null, { autoFetch: false });
	const { execute: executeSubKrit } = useFetch("", "GET", null, { autoFetch: false });
	const { execute: executeKriteria } = useFetch("/kriteria", "GET", null, { autoFetch: false });

	const refreshData = async () => {
		try {
			const resAlt = await executeAlternatif();
			if (resAlt && resAlt.data) setAlternatifs(resAlt.data);

			const resPen = await executeGET();
			if (resPen && resPen.data) setPenilaians(resPen.data);

			const resKriteria = await executeKriteria();
			if (resKriteria && resKriteria.data) {
				setKriterias(resKriteria.data);
				resKriteria.data.forEach((kriteria) => {
					fetchSubKriteria(kriteria.id);
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		refreshData();
	}, []);

	const fetchSubKriteria = async (kriteriaId) => {
		if (!subKriterias[kriteriaId]) {
			try {
				const res = await executeSubKrit(null, `/kriteria/${kriteriaId}/sub-kriteria`);
				if (res && res.data) {
					setSubKriterias((prev) => ({ ...prev, [kriteriaId]: res.data }));
				}
			} catch (err) {
				console.error(err);
			}
		}
	};

	const handleAlternatifChange = async (altId) => {
		if (!altId) {
			setFormData({ alternatif_id: "", penilaian: [] });
			return;
		}

		try {
			const res = await executeGET(`/penilaian/${altId}`);
			if (res && res.data && res.data.penilaian && res.data.penilaian.length > 0) {
				const mappedPenilaian = res.data.penilaian.map((p) => ({
					kriteria_id: p.kriteria_id,
					nama_kriteria: p.nama_kriteria,
					sub_kriteria_id: p.sub_kriteria_selected?.id || "",
				}));
				setFormData({ alternatif_id: altId, penilaian: mappedPenilaian });
			} else {
				const initialPenilaian = kriterias.map((k) => ({
					kriteria_id: k.id,
					nama_kriteria: k.nama,
					sub_kriteria_id: "",
				}));
				setFormData({ alternatif_id: altId, penilaian: initialPenilaian });
			}
		} catch (err) {
			const initialPenilaian = kriterias.map((k) => ({
				kriteria_id: k.id,
				nama_kriteria: k.nama,
				sub_kriteria_id: "",
			}));
			setFormData({ alternatif_id: altId, penilaian: initialPenilaian });
		}
	};

	const handleSubChange = (index, subId) => {
		const newPenilaian = [...formData.penilaian];
		if (newPenilaian[index]) {
			newPenilaian[index] = { ...newPenilaian[index], sub_kriteria_id: subId };
			setFormData({ ...formData, penilaian: newPenilaian });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isAllFilled =
			formData.penilaian.length > 0 && formData.penilaian.every((p) => p.sub_kriteria_id !== "");
		if (!formData.alternatif_id || !isAllFilled) return;

		try {
			const payload = {
				alternatif_id: Number(formData.alternatif_id),
				penilaian: formData.penilaian.map((p) => ({
					kriteria_id: Number(p.kriteria_id),
					sub_kriteria_id: Number(p.sub_kriteria_id),
				})),
			};
			await executePOST(payload);
			await refreshData();
			setAddForm(false);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="flex justify-between items-center mb-8 text-left">
				<div>
					<h1 className="text-2xl font-bold text-gray-800 mb-2">Data Penilaian</h1>
					<p className="text-gray-500 text-sm font-medium">
						Input Matriks Keputusan Berdasarkan Alternatif Terpilih
					</p>
				</div>
				<Button
					onClick={() => {
						setFormData({ alternatif_id: "", penilaian: [] });
						setAddForm(true);
					}}
					className="bg-sky-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-800 transition shadow-lg flex items-center gap-2"
				>
					<MdTune size={20} /> Tambah Penilaian
				</Button>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-left">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-slate-50 text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-gray-100">
								<th className="px-6 py-5 text-center w-16">No</th>
								<th className="px-6 py-5">Alternatif Motor</th>
								<th className="px-6 py-5">Matriks Penilaian</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-50 text-sm">
							{penilaians.length > 0 ? (
								penilaians.map((item, index) => (
									<tr key={item.alternatif_id} className="hover:bg-gray-50/50 transition-colors">
										<td className="px-6 py-5 text-slate-400 text-center font-mono">{index + 1}</td>
										<td className="px-6 py-5 align-middle text-center h-full">
											<span className="font-black text-slate-800 uppercase tracking-tight block">
												{item.nama_motor}
											</span>
											<span className="text-[10px] text-slate-400 font-bold uppercase">
												ID: {item.alternatif_id}
											</span>
										</td>
										<td className="px-6 py-5">
											<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
												{item.penilaian.map((p, i) => (
													<div
														key={i}
														className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-2 group hover:border-sky-300 transition-all"
													>
														<div className="flex items-center justify-between">
															<div className="flex flex-col">
																<span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">
																	{p.nama_kriteria}
																</span>
																<span
																	className={`text-[9px] font-bold uppercase ${
																		p.sifat === "cost" ? "text-amber-500" : "text-emerald-500"
																	}`}
																>
																	{p.sifat}
																</span>
															</div>
															<div className="text-right">
																<span className="text-[9px] text-slate-400 font-bold uppercase">
																	Bobot
																</span>
																<div className="text-xs font-black text-slate-700">{p.bobot}</div>
															</div>
														</div>
														<div className="pt-2 border-t border-slate-50 flex items-center justify-between">
															<span className="text-[9px] text-slate-400 font-bold uppercase">
																Nilai
															</span>
															<div className="text-lg font-black text-sky-700 leading-none">
																{p.nilai}
															</div>
														</div>
													</div>
												))}
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="3"
										className="px-6 py-20 text-center text-slate-300 font-bold uppercase text-xs"
									>
										Belum ada data penilaian tersimpan
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{addForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-900/40 p-4 text-left">
					<div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white max-h-[90vh] flex flex-col">
						<div className="px-8 pt-8 pb-4 text-center shrink-0 border-b border-slate-50">
							<h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
								Penilaian Alternatif
							</h2>
							<p className="text-gray-400 mt-1 text-[10px] font-bold uppercase tracking-widest">
								Kriteria Terikat pada Motor
							</p>
						</div>

						<form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto">
							<div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100/50">
								<label className="block text-[11px] font-black text-sky-800 uppercase mb-3 tracking-wider">
									1. Pilih Alternatif (Motor Listrik)
								</label>
								<select
									required
									value={formData.alternatif_id}
									onChange={(e) => handleAlternatifChange(e.target.value)}
									className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 shadow-sm transition-all focus:border-sky-700 appearance-none"
								>
									<option value="">-- Pilih Motor --</option>
									{alternatifs.map((alt) => (
										<option key={alt.id} value={alt.id}>
											[{alt.kode}] {alt.nama_motor}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-4">
								<label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider">
									2. Penilaian Berdasarkan Kriteria Motor
								</label>

								{kriterias.map((row, index) => (
									<div
										key={row.id}
										className="group flex flex-col md:flex-row md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 hover:border-sky-200 transition-all"
									>
										<div className="flex-1">
											<h4 className="font-black text-slate-700 text-sm uppercase">{row.nama}</h4>
										</div>
										<div className="md:w-1/2">
											<select
												required
												value={formData.penilaian[index]?.sub_kriteria_id || ""}
												onChange={(e) => handleSubChange(index, e.target.value)}
												className={`w-full px-4 py-3 border-2 rounded-xl text-xs font-bold transition-all outline-none 
                          ${
														formData.penilaian[index]?.sub_kriteria_id
															? "border-emerald-100 bg-emerald-50/30 text-emerald-700"
															: "border-slate-100 bg-slate-50/50 text-slate-500 focus:border-sky-700"
													}`}
											>
												<option value="">-- Pilih Indikator --</option>
												{(subKriterias[row.id] || []).map((s) => (
													<option key={s.id} value={s.id}>
														{s.nama_sub}
													</option>
												))}
											</select>
										</div>
										{formData.penilaian[index]?.sub_kriteria_id && (
											<MdCheckCircle className="hidden md:block text-emerald-500" size={24} />
										)}
									</div>
								))}
							</div>

							<div className="flex gap-4 pt-6 sticky bottom-0 bg-white">
								<Button
									type="button"
									onClick={() => setAddForm(false)}
									className="flex-1 px-4 py-4 text-xs font-black text-slate-400 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all uppercase"
								>
									Batal
								</Button>
								<Button
									type="submit"
									disabled={formData.penilaian.length === 0}
									className={`flex-2 px-4 py-4 text-xs font-black rounded-2xl shadow-xl uppercase tracking-widest transition-all ${
										formData.penilaian.length === 0
											? "bg-slate-200 text-slate-400 cursor-not-allowed"
											: "bg-sky-700 text-white hover:bg-sky-800 shadow-sky-100"
									}`}
								>
									Simpan Penilaian
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
