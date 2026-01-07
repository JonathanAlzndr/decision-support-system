import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import { TbEdit } from "react-icons/tb";
import { MdDelete, MdTune, MdAdd } from "react-icons/md";

export default function PenilaianAdmin() {
	const [penilaians, setPenilaians] = useState([]);
	const [alternatifs, setAlternatifs] = useState([]);
	const [kriterias, setKriterias] = useState([]);
	const [subKriterias, setSubKriterias] = useState({});
	const [addForm, setAddForm] = useState(false);

	const [formData, setFormData] = useState({
		alternatif_id: "",
		penilaian: [{ kriteria_id: "", sub_kriteria_id: "" }],
	});

	const { data: dataPenilaian, execute: executeGET } = useFetch("/penilaian", "GET", null, {
		autoFetch: false,
	});
	const { execute: executeAlternatif } = useFetch("/alternatif", "GET", null, { autoFetch: false });
	const { execute: executeKriteria } = useFetch("/kriteria", "GET", null, { autoFetch: false });
	const { execute: executePOST } = useFetch("/penilaian/batch", "POST", null, { autoFetch: false });

	useEffect(() => {
		const initData = async () => {
			const resAlt = await executeAlternatif();
			if (resAlt && resAlt.data) setAlternatifs(resAlt.data);

			const resKrit = await executeKriteria();
			if (resKrit && resKrit.data) setKriterias(resKrit.data);

			const resPen = await executeGET();
			if (resPen && resPen.data) setPenilaians(resPen.data);
		};
		initData();
	}, []);

	const fetchSubKriteria = async (kriteriaId) => {
		if (!subKriterias[kriteriaId]) {
			const { execute: execSub } = useFetch(`/kriteria/${kriteriaId}/sub-kriteria`, "GET", null, {
				autoFetch: false,
			});
			const res = await execSub();
			if (res && res.data) {
				setSubKriterias((prev) => ({ ...prev, [kriteriaId]: res.data }));
			}
		}
	};

	const addKriteriaRow = () => {
		setFormData({
			...formData,
			penilaian: [...formData.penilaian, { kriteria_id: "", sub_kriteria_id: "" }],
		});
	};

	const removeKriteriaRow = (index) => {
		const newPenilaian = formData.penilaian.filter((_, i) => i !== index);
		setFormData({ ...formData, penilaian: newPenilaian });
	};

	const handleRowChange = (index, field, value) => {
		const newPenilaian = [...formData.penilaian];
		newPenilaian[index][field] = value;

		if (field === "kriteria_id") {
			newPenilaian[index].sub_kriteria_id = "";
			fetchSubKriteria(value);
		}

		setFormData({ ...formData, penilaian: newPenilaian });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const payload = {
				alternatif_id: Number(formData.alternatif_id),
				penilaian: formData.penilaian.map((p) => ({
					kriteria_id: Number(p.kriteria_id),
					sub_kriteria_id: Number(p.sub_kriteria_id),
				})),
			};
			await executePOST(payload);
			const res = await executeGET();
			if (res) setPenilaians(res.data);
			setAddForm(false);
			setFormData({ alternatif_id: "", penilaian: [{ kriteria_id: "", sub_kriteria_id: "" }] });
		} catch (err) {
			console.error("Gagal simpan:", err);
		}
	};

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-2xl font-bold text-gray-800 mb-2">Data Penilaian</h1>
					<p className="text-gray-500 text-sm font-medium">
						Input Matriks Keputusan Berdasarkan Kriteria
					</p>
				</div>
				<Button
					onClick={() => setAddForm(true)}
					className="bg-sky-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-800 transition shadow-lg shadow-sky-100 flex items-center gap-2"
				>
					<MdTune size={20} /> Tambah Penilaian
				</Button>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
				<Table penilaians={penilaians} />
			</div>

			{addForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-900/20 p-4">
					<div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white max-h-[90vh] flex flex-col">
						<div className="px-8 pt-8 text-center flex-shrink-0">
							<h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
								Tambah Penilaian
							</h2>
							<p className="text-gray-400 mt-1 text-xs font-bold uppercase tracking-widest">
								Matriks Keputusan
							</p>
						</div>

						<form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
							<div>
								<label className="block text-xs font-black text-sky-700 uppercase mb-2">
									Alternatif (Motor)
								</label>
								<select
									required
									value={formData.alternatif_id}
									onChange={(e) => setFormData({ ...formData, alternatif_id: e.target.value })}
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 outline-none font-bold"
								>
									<option value="">-- Pilih Motor --</option>
									{alternatifs.map((alt) => (
										<option key={alt.id} value={alt.id}>
											{alt.kode} - {alt.nama_motor}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<label className="text-xs font-black text-sky-700 uppercase">
										Daftar Kriteria & Sub
									</label>
									<button
										type="button"
										onClick={addKriteriaRow}
										className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline"
									>
										<MdAdd size={16} /> Tambah Baris
									</button>
								</div>

								{formData.penilaian.map((row, index) => (
									<div
										key={index}
										className="flex gap-3 items-end bg-slate-50 p-4 rounded-2xl border border-slate-100"
									>
										<div className="flex-1">
											<label className="block text-[10px] font-bold text-gray-400 mb-1">
												Kriteria
											</label>
											<select
												required
												value={row.kriteria_id}
												onChange={(e) => handleRowChange(index, "kriteria_id", e.target.value)}
												className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium"
											>
												<option value="">Pilih Kriteria</option>
												{kriterias.map((k) => (
													<option key={k.id} value={k.id}>
														{k.nama}
													</option>
												))}
											</select>
										</div>

										<div className="flex-1">
											<label className="block text-[10px] font-bold text-gray-400 mb-1">
												Sub Kriteria
											</label>
											<select
												required
												disabled={!row.kriteria_id}
												value={row.sub_kriteria_id}
												onChange={(e) => handleRowChange(index, "sub_kriteria_id", e.target.value)}
												className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium"
											>
												<option value="">Pilih Sub</option>
												{(subKriterias[row.kriteria_id] || []).map((s) => (
													<option key={s.id} value={s.id}>
														{s.nama_sub}
													</option>
												))}
											</select>
										</div>

										{formData.penilaian.length > 1 && (
											<button
												type="button"
												onClick={() => removeKriteriaRow(index)}
												className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
											>
												<MdDelete size={20} />
											</button>
										)}
									</div>
								))}
							</div>

							<div className="flex gap-3 h-20 items-center justify-center pt-4 sticky bottom-0 bg-white">
								<Button
									type="button"
									onClick={() => setAddForm(false)}
									className="flex-1 px-4 py-2.5 h-12 text-sm font-bold text-red-500 bg-white rounded-lg hover:bg-red-500 hover:text-white transition"
								>
									Batal
								</Button>
								<Button
									type="submit"
									className="h-12 flex-1 px-4 py-2.5 text-sm font-bold bg-transparent border border-sky-700 rounded-lg hover:bg-sky-700 hover:text-white text-sky-700 transition"
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

function Table({ penilaians }) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="bg-slate-50 text-gray-900 uppercase text-[11px] tracking-wider border-b border-gray-200">
						<th className="px-6 py-4 font-medium text-center">No</th>
						<th className="px-6 py-4 font-medium text-start">Motor</th>
						<th className="px-6 py-4 font-medium text-start">Penilaian (Kriteria - Sub)</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100 text-sm">
					{penilaians.map((item, index) => (
						<tr key={item.alternatif_id} className="hover:bg-gray-50 transition">
							<td className="px-6 py-4 text-gray-700 text-center">{index + 1}</td>
							<td className="px-6 py-4 font-bold text-slate-800">{item.nama_motor}</td>
							<td className="px-6 py-4">
								<div className="flex flex-wrap gap-2">
									{item.penilaian.map((p, i) => (
										<span
											key={i}
											className="px-3 py-1 bg-sky-50 text-sky-700 rounded-lg text-[10px] font-bold border border-sky-100"
										>
											{p.nama_kriteria}: {p.nama_sub}
										</span>
									))}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
