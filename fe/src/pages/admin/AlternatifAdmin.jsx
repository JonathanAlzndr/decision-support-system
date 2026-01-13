import React, { useEffect, useState, useRef } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
import { TbEdit } from "react-icons/tb";
import { MdDelete, MdErrorOutline } from "react-icons/md";

export default function AlternatifAdmin() {
	const [alternatifs, setAlternatifs] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [addForm, setAddForm] = useState(false);
	const [editForm, setEditForm] = useState(false);
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [editData, setEditData] = useState({ id: "", kode: "", nama_motor: "", deskripsi: "" });
	const [selectedFile, setSelectedFile] = useState(null);
	const [preview, setPreview] = useState(null);

	const fileInputRef = useRef(null);

	const { data, execute: executeGET } = useFetch("/alternatif", "GET", null, { autoFetch: false });
	const { execute: executePOST } = useFetch("/alternatif", "POST", null, { autoFetch: false });
	const { execute: executePUT } = useFetch("", "PUT", null, { autoFetch: false });
	const { execute: executeDELETE } = useFetch("", "DELETE", null, { autoFetch: false });

	useEffect(() => {
		executeGET();
	}, [executeGET]);

	useEffect(() => {
		if (data && data.status === "success") {
			setAlternatifs(data.data);
		}
	}, [data]);

	const filteredAlternatifs = alternatifs.filter((item) =>
		item.nama_motor.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const resetState = () => {
		setEditData({ id: "", kode: "", nama_motor: "", deskripsi: "" });
		setSelectedFile(null);
		setPreview(null);
		setAddForm(false);
		setEditForm(false);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleEditClick = (item) => {
		setEditData({
			id: item.id,
			kode: item.kode,
			nama_motor: item.nama_motor,
			deskripsi: item.deskripsi || "",
		});
		setPreview(item.gambar_url || null);
		setEditForm(true);
	};

	const handleAdd = async (e) => {
		e.preventDefault();

		if (!editData.kode || !editData.nama_motor) {
			setErrorMessage("Kode dan Nama Motor wajib diisi!");
			setShowError(true);
			return;
		}

		const isDuplicate = alternatifs.some(
			(item) => item.kode.toLowerCase() === editData.kode.toLowerCase()
		);
		if (isDuplicate) {
			setErrorMessage(`Kode Alternatif "${editData.kode}" sudah digunakan!`);
			setShowError(true);
			return;
		}

		const formData = new FormData();
		formData.append("kode", editData.kode);
		formData.append("nama_motor", editData.nama_motor);
		formData.append("deskripsi", editData.deskripsi || "");
		if (selectedFile) {
			formData.append("gambar", selectedFile);
		}

		try {
			await executePOST(formData);
			await executeGET();
			resetState();
		} catch (err) {
			setErrorMessage(err.response?.data?.message || "Gagal menyimpan data.");
			setShowError(true);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("kode", editData.kode);
		formData.append("nama_motor", editData.nama_motor);
		formData.append("deskripsi", editData.deskripsi || "");
		if (selectedFile) {
			formData.append("gambar", selectedFile);
		}

		try {
			await executePUT(formData, `/alternatif/${editData.id}`);
			await executeGET();
			resetState();
		} catch (err) {
			setErrorMessage("Gagal memperbarui data.");
			setShowError(true);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Yakin ingin menghapus data ini?")) {
			try {
				await executeDELETE(null, `/alternatif/${id}`);
				await executeGET();
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<>
			{showError && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40 font-sans">
					<div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border border-white animate-in fade-in zoom-in duration-200">
						<div className="p-8 text-center">
							<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4 text-red-500">
								<MdErrorOutline size={40} />
							</div>
							<h3 className="text-xl font-black text-slate-800 tracking-tighter mb-2 uppercase">
								Gagal
							</h3>
							<p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
								{errorMessage}
							</p>
						</div>
						<div className="p-4 bg-slate-50">
							<button
								onClick={() => setShowError(false)}
								className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition shadow-lg shadow-slate-200 uppercase tracking-widest"
							>
								Tutup
							</button>
						</div>
					</div>
				</div>
			)}

			<h1 className="text-2xl font-bold text-gray-800 mb-8">Data Alternatif</h1>
			<div className="bg-white border border-gray-200 rounded-xl shadow-sm font-sans">
				<div className="p-5 border-b border-gray-200 flex flex-col gap-4 justify-between bg-gray-50">
					<input
						type="text"
						placeholder="Cari Nama Motor..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-700 focus:outline-none text-sm"
					/>
					<Button
						onClick={() => {
							resetState();
							setAddForm(true);
						}}
						className="bg-sky-700 text-white px-5 py-2 w-1/3 rounded-lg text-sm font-semibold hover:bg-sky-800 transition shadow-md"
					>
						+ Tambah Alternatif
					</Button>
				</div>

				<Table
					className="w-full"
					alternatifs={filteredAlternatifs}
					handleEditClick={handleEditClick}
					handleDelete={handleDelete}
				/>

				{(addForm || editForm) && (
					<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-900/20 p-4 font-sans">
						<div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-white">
							<div className="px-8 pt-8 text-center">
								<h2 className="text-2xl font-bold text-black">
									{addForm ? "Tambah Alternatif" : "Ubah Alternatif"}
								</h2>
								<p className="text-gray-400 mt-1 text-xs font-bold uppercase tracking-widest">
									Sesuaikan informasi data motor di bawah ini.
								</p>
							</div>

							<form
								onSubmit={addForm ? handleAdd : handleUpdate}
								className="p-6 space-y-4 text-left"
							>
								<div>
									<label className="block text-xs font-black text-sky-700 uppercase tracking-wider mb-1">
										Kode *
									</label>
									<input
										type="text"
										required
										readOnly={editForm}
										value={editData.kode}
										onChange={(e) => setEditData({ ...editData, kode: e.target.value })}
										placeholder="Contoh: A1"
										className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 outline-none transition-all font-bold ${
											editForm ? "cursor-not-allowed text-gray-400 bg-gray-50" : ""
										}`}
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
										Nama Motor *
									</label>
									<input
										type="text"
										required
										value={editData.nama_motor}
										onChange={(e) => setEditData({ ...editData, nama_motor: e.target.value })}
										placeholder="Masukkan Nama Motor"
										className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 outline-none transition-all font-medium"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
										Deskripsi
									</label>
									<textarea
										rows="3"
										value={editData.deskripsi}
										onChange={(e) => setEditData({ ...editData, deskripsi: e.target.value })}
										placeholder="Motor matic premium"
										className="w-full bg-slate-50 border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-700 outline-none transition-all placeholder:text-gray-400"
									></textarea>
								</div>
								<div>
									<label className="block text-[10px] font-black text-sky-700 uppercase tracking-wider mb-2">
										Gambar Motor
									</label>
									<div className="relative group">
										<label
											htmlFor="file-upload"
											className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-white hover:border-sky-700 transition-all cursor-pointer overflow-hidden relative"
										>
											{preview ? (
												<img
													src={preview.startsWith("blob") ? preview : `${preview}?t=${Date.now()}`}
													alt="Preview"
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
													<svg
														className="w-8 h-8 mb-3 text-sky-600"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
														></path>
													</svg>
													<p className="text-[10px] font-bold uppercase tracking-widest text-center px-4">
														Klik untuk pilih gambar
													</p>
												</div>
											)}
										</label>
										<input
											id="file-upload"
											type="file"
											accept="image/*"
											className="hidden"
											ref={fileInputRef}
											onChange={handleFileChange}
										/>
									</div>
								</div>
								<div className="p-4 flex gap-3">
									<Button
										type="button"
										onClick={resetState}
										className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-bold text-red-500 bg-white rounded-lg hover:bg-red-500 hover:text-white transition focus:outline-2 focus:outline-red-500"
									>
										BATAL
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
			</div>
		</>
	);
}

function Table({ className, alternatifs = [], handleEditClick, handleDelete }) {
	return (
		<table className={className}>
			<thead>
				<tr className="bg-white text-gray-900 uppercase text-[11px] tracking-wider border-b border-gray-200">
					<th className="px-2 py-4 font-medium text-center">No</th>
					<th className="px-6 py-4 font-medium text-start">Kode</th>
					<th className="px-6 py-4 font-medium text-start">Nama Motor</th>
					<th className="px-9 py-4 font-medium text-start">Deskripsi</th>
					<th className="px-9 py-4 font-medium text-center">Gambar</th>
					<th className="px-6 py-4 font-medium text-center">Aksi</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-100 text-sm text-left">
				{alternatifs.length > 0 ? (
					alternatifs.map((alternatif, index) => (
						<tr className="hover:bg-gray-50 transition" key={alternatif.id}>
							<td className="px-2 py-4 text-gray-700 text-center">{index + 1}</td>
							<td className="px-6 py-4 font-semibold text-gray-800">{alternatif.kode}</td>
							<td className="px-6 py-4 text-gray-600">{alternatif.nama_motor}</td>
							<td className="px-6 py-4 text-gray-600 text-start">{alternatif.deskripsi}</td>
							<td className="px-6 py-4 text-gray-600 text-center">
								<div className="w-16 h-12 mx-auto rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shadow-sm flex items-center justify-center">
									{alternatif.gambar_url ? (
										<img
											src={`${alternatif.gambar_url}?t=${Date.now()}`}
											alt={alternatif.nama_motor}
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">
											No Image
										</div>
									)}
								</div>
							</td>
							<td className="flex justify-center gap-2 py-4 text-center">
								<Button
									onClick={() => handleEditClick(alternatif)}
									className="text-sky-700 flex items-center font-medium hover:underline mr-3"
								>
									<TbEdit className="mr-1" /> Ubah
								</Button>
								<Button
									onClick={() => handleDelete(alternatif.id)}
									className="text-red-500 flex items-center font-medium hover:underline"
								>
									<MdDelete className="mr-1" /> Hapus
								</Button>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="6" className="text-center py-6 text-gray-500 italic">
							Data tidak ditemukan
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
