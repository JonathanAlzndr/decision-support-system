import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
/* icons */
import { IoCloseSharp } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export default function AlternatifAdmin() {
	const [editForm, setEditForm] = useState(false);

	const [alternatifs, setAlternatifs] = useState([]);
	const { data, execute: executeGet } = useFetch("/alternatif", "GET", null, {
		autoFetch: false,
	});
	useEffect(() => {
		executeGet();
	}, [executeGet]);

	useEffect(() => {
		if (data) {
			setAlternatifs(data.data);
		}
	}, [data]);

	const [editData, setEditData] = useState({ id: "", kode: "", nama_motor: "", deskripsi: "" });
	const { execute: executeUpdate } = useFetch(`/alternatif/${editData.id}`, "PUT", null, {
		autoFetch: false,
	});

	const handleEditClick = (item) => {
		setEditData({
			id: item.id,
			kode: item.kode,
			nama_motor: item.nama_motor,
			deskripsi: item.deskripsi,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await executeUpdate(editData);
			await executeGet();
			setEditForm(false);
		} catch (err) {
			console.error("Gagal update data alternatif:", err);
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
					<Button className="bg-sky-700 text-white px-5 py-2 w-1/3 rounded-lg text-sm font-semibold hover:bg-sky-800 transition shadow-md">
						+ Tambah Alternatif
					</Button>
				</div>
				<Table
					className="w-full"
					alternatifs={alternatifs}
					handleEditClick={handleEditClick}
					setEditForm={setEditForm}
				/>
				{editForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs p-4 font-sans">
						<div className="ring-3 ring-slate-100 relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
							<div className="px-6 pt-6 text-center">
								<h2 className="text-2xl font-bold text-black">Ubah Data Alternatif</h2>
								<p className="text-gray-500 mt-1 text-sm">
									Sesuaikan informasi data motor di bawah ini.
								</p>
							</div>

							<form onSubmit={handleSubmit} className="p-6 space-y-4">
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
										Kode *
									</label>
									<input
										type="text"
										value={editData.kode}
										placeholder="A1"
										readOnly
										className="w-full cursor-not-allowed px-4 py-3 outline focus:outline text-slate-900 font-bold border-gray-400 rounded-lg text-sm"
									/>
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
										className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring focus:ring-slate-700 focus:outline-none text-sm"
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
										className="w-full bg-white border border-gray-400 px-4 py-2.5 rounded-lg focus:ring focus:ring-slate-700 focus:outline-none transition placeholder:text-gray-400"
									></textarea>
								</div>
								<div className="p-4 flex gap-3">
									<Button
										type="button"
										onClick={() => setEditForm((e) => !e)}
										className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-bold text-red-500 bg-white rounded-lg hover:bg-red-500 hover:text-white transition"
									>
										BATAL
									</Button>
									<Button
										type="submit"
										className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-bold bg-transparent border border-sky-700 rounded-lg hover:bg-sky-700 hover:text-white text-sky-700 transition"
									>
										UBAH
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

function Table({ className, alternatifs = [], handleEditClick, setEditForm }) {
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
										setEditForm((e) => !e);
									}}
									className="text-sky-700 flex items-center font-medium hover:underline mr-3"
								>
									<TbEdit />
									Edit
								</Button>
								<Button className="text-red-500 flex items-center font-medium hover:underline">
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
