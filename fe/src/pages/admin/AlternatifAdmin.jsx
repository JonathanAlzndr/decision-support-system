import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export default function AlternatifAdmin() {
	const [editForm, setEditForm] = useState(false);
	const [alternatifs, setAlternatifs] = useState([]);
	const [addForm, setAddForm] = useState(false);
	const [editData, setEditData] = useState({ id: "", kode: "", nama_motor: "", deskripsi: "" });

	const { data, execute: executeGET } = useFetch("/alternatif", "GET", null, { autoFetch: false });
	const { execute: executePUT } = useFetch("", "PUT", null, { autoFetch: false });
	const { execute: executeDELETE } = useFetch("", "DELETE", null, { autoFetch: false });
	const { execute: executePOST } = useFetch("/alternatif", "POST", null, { autoFetch: false });

	useEffect(() => {
		executeGET();
	}, [executeGET]);

	useEffect(() => {
		if (data) {
			setAlternatifs(data.data);
		}
	}, [data]);

	const handleEditClick = (item) => {
		setEditData({
			id: item.id,
			kode: item.kode,
			nama_motor: item.nama_motor,
			deskripsi: item.deskripsi,
		});
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await executePUT(editData, `/alternatif/${editData.id}`);
			await executeGET();
			setEditForm(false);
		} catch (err) {
			console.error("Gagal update data alternatif:", err);
		}
	};

	const handleDelete = async (id) => {
		try {
			await executeDELETE(null, `/alternatif/${id}`);
			await executeGET();
			alert("Data berhasil dihapus!");
		} catch (err) {
			console.log("Gagal menghapus data:", err);
		}
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			const payload = {
				kode: editData.kode,
				nama_motor: editData.nama_motor,
				deskripsi: editData.deskripsi,
			};
			await executePOST(payload);
			await executeGET();
			setEditData({ id: "", kode: "", nama_motor: "", deskripsi: "" });
			setAddForm(false);
		} catch (err) {
			console.error("Gagal menambah data alternatif:", err);
		}
	};

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
					<Button
						onClick={() => {
							setEditData({ id: "", kode: "", nama_motor: "", deskripsi: "" });
							setAddForm(true);
						}}
						className="bg-sky-700 text-white px-5 py-2 w-1/3 rounded-lg text-sm font-semibold hover:bg-sky-800 transition shadow-md"
					>
						+ Tambah Alternatif
					</Button>
				</div>
				<Table
					className="w-full"
					alternatifs={alternatifs}
					handleEditClick={handleEditClick}
					setEditForm={setEditForm}
					handleDelete={handleDelete}
				/>

				{(addForm || editForm) && (
					<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-900/20 p-4">
						<div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-white">
							<div className="px-8 pt-8 text-center">
								<h2 className="text-2xl font-bold text-black">
									{addForm ? "Tambah Kriteria" : "Ubah Kriteria"}
								</h2>
								<p className="text-gray-400 mt-1 text-xs font-bold uppercase tracking-widest">
									Sesuaikan informasi data motor di bawah ini.
								</p>
							</div>

							<form onSubmit={addForm ? handleAdd : handleUpdate} className="p-6 space-y-4">
								<div>
									<label className="block text-xs font-black text-sky-700 uppercase tracking-wider mb-1">
										Kode *
									</label>
									{addForm ? (
										<input
											type="text"
											required
											name="kode"
											value={editData.kode}
											onChange={(e) => setEditData({ ...editData, kode: e.target.value })}
											placeholder="Contoh: A1"
											className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-bold"
										/>
									) : (
										<input
											type="text"
											readOnly
											name="kode"
											value={editData.kode}
											onChange={(e) => setEditData({ ...editData, kode: e.target.value })}
											className="w-full cursor-not-allowed px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-0  outline-none transition-all font-bold"
										/>
									)}
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
										Nama Motor *
									</label>
									<input
										type="text"
										name="nama_motor"
										value={editData.nama_motor}
										onChange={(e) => setEditData({ ...editData, nama_motor: e.target.value })}
										placeholder="Masukkan Nama Motor"
										className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-medium"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
										deskripsi *
									</label>
									<textarea
										rows="3"
										name="deskripsi"
										value={editData.deskripsi}
										onChange={(e) => setEditData({ ...editData, deskripsi: e.target.value })}
										placeholder="Motor matic premium"
										className="w-full bg-slate-50 border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all placeholder:text-gray-400"
									></textarea>
								</div>
								<div className="p-4 flex gap-3">
									<Button
										type="button"
										onClick={() => {
											setAddForm(false);
											setEditForm(false);
										}}
										className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-bold text-red-500 bg-white rounded-lg hover:bg-red-500 hover:text-white transition"
									>
										BATAL
									</Button>
									<Button
										type="submit"
										className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-bold bg-transparent border border-sky-700 rounded-lg hover:bg-sky-700 hover:text-white text-sky-700 transition"
									>
										{addForm ? "Simpan" : "Perbarui"}
									</Button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

function Table({ className, alternatifs = [], handleEditClick, setEditForm, handleDelete }) {
	return (
		<table className={className}>
			<thead>
				<tr className="bg-white text-gray-900 uppercase text-[11px] tracking-wider border-b border-gray-200">
					<th className="px-2 py-4 font-medium text-center">No</th>
					<th className="px-6 py-4 font-medium text-start">Kode</th>
					<th className="px-6 py-4 font-medium text-start">Nama Motor</th>
					<th className="px-9 py-4 font-medium text-start">deskripsi</th>
					<th className="px-6 py-4 font-medium text-center">Aksi</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-100 text-sm">
				{alternatifs.map((alternatif, index) => {
					return (
						<tr className="hover:bg-gray-50 transition" key={alternatif.id}>
							<td className="px-2 py-4 text-gray-700 text-center">{index + 1}</td>
							<td className="px-6 py-4 font-semibold text-gray-800">{alternatif.kode}</td>
							<td className="px-6 py-4 text-gray-600">{alternatif.nama_motor}</td>
							<td className="px-6 py-4 text-gray-600 text-start">{alternatif.deskripsi}</td>
							<td className="flex justify-center gap-2 py-4">
								<Button
									onClick={() => {
										handleEditClick(alternatif);
										setEditForm(true);
									}}
									className="text-sky-700 flex items-center font-medium hover:underline mr-3"
								>
									<TbEdit />
									Ubah
								</Button>
								<Button
									onClick={() => {
										handleDelete(alternatif.id);
									}}
									className="text-red-500 flex items-center font-medium hover:underline"
								>
									<MdDelete />
									Hapus
								</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
