import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import { TbEdit } from "react-icons/tb";
import { MdDelete, MdTune } from "react-icons/md";

export default function SubKriteriaAdmin() {
	const [kriterias, setKriterias] = useState([]);
	const [listKriteria, setListKriteria] = useState([]);
	const [addForm, setAddForm] = useState(false);
	const [editForm, setEditForm] = useState(false);
	const [formData, setFormData] = useState({
		id: "",
		kriteria_id: "",
		nama_sub: "",
		nilai: 0,
		keterangan: "",
	});

	const { execute: executeGET } = useFetch("/sub-kriteria", "GET", null, { autoFetch: false });
	const { execute: executeKriteria } = useFetch("/kriteria", "GET", null, { autoFetch: false });
	const { execute: executePOST } = useFetch("/sub-kriteria", "POST", null, { autoFetch: false });
	const { execute: executePUT } = useFetch("/sub-kriteria", "PUT", null, { autoFetch: false });
	const { execute: executeDELETE } = useFetch("", "DELETE", null, { autoFetch: false });

	const refreshData = async () => {
		const resSub = await executeGET();
		if (resSub && resSub.data) {
			setKriterias(resSub.data);
		}

		const resKrit = await executeKriteria();
		if (resKrit && resKrit.data) setListKriteria(resKrit.data);
	};

	useEffect(() => {
		refreshData();
	}, []);

	const handleEditClick = (item, kriteriaId) => {
		setFormData({
			id: item.id,
			kriteria_id: kriteriaId,
			nama_sub: item.nama_sub,
			nilai: item.nilai,
			keterangan: item.keterangan,
		});
		setEditForm(true);
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			await executePOST({
				kriteria_id: Number(formData.kriteria_id),
				nama_sub: formData.nama_sub,
				nilai: Number(formData.nilai),
				keterangan: formData.keterangan,
			});
			await refreshData();
			setAddForm(false);
			setFormData({ id: "", kriteria_id: "", nama_sub: "", nilai: 0, keterangan: "" });
		} catch (err) {
			console.error("Gagal tambah kriteria:", err);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await executePUT(
				{
					nama_sub: formData.nama_sub,
					nilai: Number(formData.nilai),
					keterangan: formData.keterangan,
				},
				`/sub-kriteria/${formData.id}`
			);
			await refreshData();
			setEditForm(false);
		} catch (err) {
			console.error("Gagal update kriteria:", err);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Hapus kriteria ini? Ini akan mempengaruhi perhitungan SPK.")) {
			try {
				await executeDELETE(null, `/sub-kriteria/${id}`);
				await refreshData();
			} catch (err) {
				console.error("Gagal hapus:", err);
			}
		}
	};

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-2xl font-bold text-gray-800 mb-8">Data Sub Kriteria</h1>
				</div>
				<Button
					onClick={() => {
						setFormData({ id: "", kriteria_id: "", nama_sub: "", nilai: 0, keterangan: "" });
						setEditForm(false);
						setAddForm(true);
					}}
					className="bg-sky-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-800 transition shadow-lg shadow-sky-100 flex items-center gap-2"
				>
					<MdTune size={20} /> Tambah Sub Kriteria
				</Button>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
				<Table
					kriterias={kriterias}
					handleEditClick={handleEditClick}
					handleDelete={handleDelete}
				/>
			</div>

			{(addForm || editForm) && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-900/20 p-4">
					<div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-white">
						<div className="px-8 pt-8 text-center">
							<h2 className="text-2xl font-black text-slate-800 tracking-tighter">
								{addForm ? "Tambah Sub Kriteria" : "Ubah Sub Kriteria"}
							</h2>
							<p className="text-gray-400 mt-1 text-xs font-bold tracking-widest">Dataset SPK</p>
						</div>

						<form onSubmit={addForm ? handleAdd : handleUpdate} className="p-8 space-y-5 text-left">
							<div>
								<label className="block text-xs font-black text-sky-700 tracking-wider mb-2">
									PILIH KRITERIA
								</label>
								<select
									required
									name="kriteria_id"
									disabled={editForm}
									value={formData.kriteria_id}
									onChange={(e) => setFormData({ ...formData, kriteria_id: e.target.value })}
									className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-bold appearance-none ${
										editForm ? "opacity-50 cursor-not-allowed" : ""
									}`}
								>
									<option value="">-- Pilih Kriteria --</option>
									{listKriteria.map((k) => (
										<option key={k.id} value={k.id}>
											{k.kode} - {k.nama}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-[10px] font-black text-sky-700 tracking-[0.2em] mb-2">
									NAMA SUB KRITERIA
								</label>
								<input
									type="text"
									required
									name="nama_sub"
									value={formData.nama_sub}
									onChange={(e) => setFormData({ ...formData, nama_sub: e.target.value })}
									placeholder="14jt - 16jt"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-medium"
								/>
							</div>
							<div>
								<label className="block text-[10px] font-black text-sky-700 tracking-[0.2em] mb-2">
									NILAI
								</label>
								<input
									type="number"
									required
									name="nilai"
									value={formData.nilai}
									onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
									placeholder="Contoh: 3"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-medium"
								/>
							</div>
							<div>
								<label className="block text-[10px] font-black text-sky-700 tracking-[0.2em] mb-2">
									KETERANGAN
								</label>
								<input
									type="text"
									required
									name="keterangan"
									value={formData.keterangan}
									onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
									placeholder="Sedang"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-medium"
								/>
							</div>

							<div className="flex gap-3 pt-4">
								<Button
									type="button"
									onClick={() => {
										setAddForm(false);
										setEditForm(false);
									}}
									className="flex-1 px-4 py-2.5 text-sm font-bold text-red-500 bg-white rounded-lg hover:bg-red-500 hover:text-white focus:outline-2 focus:outline-red-500 transition"
								>
									Batal
								</Button>
								<Button
									type="submit"
									className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-bold bg-transparent border border-sky-700 rounded-lg hover:bg-sky-700 hover:text-white text-sky-700 focus:outline-2 focus:outline-sky-700 transition"
								>
									{addForm ? "Simpan" : "Perbarui"}
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

function Table({ kriterias, handleEditClick, handleDelete }) {
	return (
		<table className="w-full">
			<thead>
				<tr className="bg-white text-gray-900 text-[11px] tracking-wider border-b border-gray-200">
					<th className="px-2 py-4 font-medium text-center">NO</th>
					<th className="px-4 py-4 font-medium text-left">KRITERIA</th>
					<th className="py-4 font-medium text-center">NAMA SUB KRITERIA</th>
					<th className="px-2 py-4 font-medium text-center">NILAI</th>
					<th className="px-2 py-4 font-medium text-center">KETERANGAN</th>
					<th className="px-0 py-4 font-medium text-center">AKSI</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-slate-100 text-sm">
				{kriterias.map((group) => (
					<React.Fragment key={group.id}>
						<tr className="bg-slate-50/50">
							<td
								colSpan={6}
								className="px-4 py-3 text-sky-800 font-black text-xs tracking-widest bg-slate-100/50"
							>
								KRITERIA: {group.kode} - {group.nama.toUpperCase()}
							</td>
						</tr>
						{group.sub_kriteria.map((sub, index) => {
							return (
								<tr key={sub.id} className="hover:bg-gray-50 transition">
									<td className="px-2 py-4 text-gray-700 text-center">{index + 1}</td>
									<td className="px-4 py-4 text-gray-600 font-bold text-left text-xs">
										{group.nama}
									</td>
									<td className="py-4 text-gray-600 text-center font-medium">{sub.nama_sub}</td>
									<td className="px-2 py-4 text-gray-600 text-center">{sub.nilai}</td>
									<td className="px-2 py-4 text-gray-600 text-center">{sub.keterangan}</td>
									<td className="px-0 py-5">
										<div className="flex justify-center gap-4">
											<Button
												onClick={() => handleEditClick(sub, group.id)}
												className="text-sky-700 flex items-center font-medium hover:underline mr-3"
											>
												<TbEdit size={20} />
												Ubah
											</Button>
											<Button
												onClick={() => handleDelete(sub.id)}
												className="text-red-500 flex items-center font-medium hover:underline"
											>
												<MdDelete size={20} />
												Hapus
											</Button>
										</div>
									</td>
								</tr>
							);
						})}
					</React.Fragment>
				))}
				{kriterias.length === 0 && (
					<tr>
						<td colSpan={6} className="py-10 text-center text-gray-400">
							Tidak ada data.
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
