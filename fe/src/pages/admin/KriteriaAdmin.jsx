import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetch from "../../api/useFetch";
/* icons */
import { TbEdit } from "react-icons/tb";
import { MdDelete, MdTune } from "react-icons/md";

export default function KriteriaAdmin() {
	const [kriterias, setKriterias] = useState([]);
	const [addForm, setAddForm] = useState(false);
	const [editForm, setEditForm] = useState(false);
	const [formData, setFormData] = useState({ id: "", kode: "", nama: "", sifat: "benefit" });

	const { data, execute: executeGET } = useFetch("/kriteria", "GET", null, { autoFetch: false });
	const { execute: executePOST } = useFetch("/kriteria", "POST", null, { autoFetch: false });
	const { execute: executePUT } = useFetch("", "PUT", null, { autoFetch: false });
	const { execute: executeDELETE } = useFetch("", "DELETE", null, { autoFetch: false });

	useEffect(() => {
		executeGET();
	}, [executeGET]);

	useEffect(() => {
		if (data) {
			setKriterias(data.data);
		}
	}, [data]);

	const handleEditClick = (item) => {
		setFormData({ id: item.id, kode: item.kode, nama: item.nama, sifat: item.sifat });
		setEditForm(true);
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			await executePOST({ kode: formData.kode, nama: formData.nama, sifat: formData.sifat });
			await executeGET();
			setAddForm(false);
			setFormData({ id: "", kode: "", nama: "", sifat: "benefit" });
		} catch (err) {
			console.error("Gagal tambah kriteria:", err);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await executePUT(formData, `/kriteria/${formData.id}`);
			await executeGET();
			setEditForm(false);
		} catch (err) {
			console.error("Gagal update kriteria:", err);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Hapus kriteria ini? Ini akan mempengaruhi perhitungan SPK.")) {
			try {
				await executeDELETE(null, `/kriteria/${id}`);
				await executeGET();
			} catch (err) {
				console.error("Gagal hapus:", err);
			}
		}
	};

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-2xl font-bold text-gray-800 mb-8">Data Kriteria</h1>
					<p className="text-gray-500 text-sm font-medium">
						Kelola atribut penilaian motor listrik
					</p>
				</div>
				<Button
					onClick={() => {
						setFormData({ id: "", kode: "", nama: "", sifat: "benefit" });
						setAddForm(true);
					}}
					className="bg-sky-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-800 transition shadow-lg shadow-sky-100 flex items-center gap-2"
				>
					<MdTune size={20} /> Tambah Kriteria
				</Button>
			</div>

			<div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
				<Table
					kriterias={kriterias}
					handleEditClick={handleEditClick}
					handleDelete={handleDelete}
				/>
			</div>

			{/* MODAL FORM (REUSABLE FOR ADD/EDIT) */}
			{(addForm || editForm) && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-900/20 p-4">
					<div className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden border border-white">
						<div className="px-8 pt-8 text-center">
							<h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
								{addForm ? "Tambah Kriteria" : "Ubah Kriteria"}
							</h2>
							<p className="text-gray-400 mt-1 text-xs font-bold uppercase tracking-widest">
								Dataset SPK
							</p>
						</div>

						<form onSubmit={addForm ? handleAdd : handleUpdate} className="p-8 space-y-5 text-left">
							<div>
								<label className="block text-[10px] font-black text-sky-700 uppercase tracking-[0.2em] mb-2">
									Kode Kriteria (C*)
								</label>
								<input
									type="text"
									required
									value={formData.kode}
									onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
									placeholder="Contoh: C1"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-bold"
								/>
							</div>

							<div>
								<label className="block text-[10px] font-black text-sky-700 uppercase tracking-[0.2em] mb-2">
									Nama Kriteria
								</label>
								<input
									type="text"
									required
									value={formData.nama}
									onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
									placeholder="Contoh: Harga Motor"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-medium"
								/>
							</div>

							<div>
								<label className="block text-[10px] font-black text-sky-700 uppercase tracking-[0.2em] mb-2">
									Sifat (Cost/Benefit)
								</label>
								<select
									value={formData.sifat}
									onChange={(e) => setFormData({ ...formData, sifat: e.target.value })}
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-bold"
								>
									<option value="benefit">Benefit (Semakin besar semakin baik)</option>
									<option value="cost">Cost (Semakin kecil semakin baik)</option>
								</select>
							</div>

							<div className="flex gap-3 pt-4">
								<Button
									type="button"
									onClick={() => {
										setAddForm(false);
										setEditForm(false);
									}}
									className="flex-1 px-4 py-2.5 text-sm font-bold text-red-500 bg-white rounded-lg hover:bg-red-500 hover:text-white transition"
								>
									Batal
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
		</>
	);
}

function Table({ kriterias, handleEditClick, handleDelete }) {
	return (
		<table className="w-full text-left border-collapse">
			<thead>
				<tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em] border-b border-slate-100">
					<th className="px-8 py-5 text-center">No</th>
					<th className="px-6 py-5">Kode</th>
					<th className="px-6 py-5">Nama Kriteria</th>
					<th className="px-6 py-5">Sifat</th>
					<th className="px-8 py-5 text-center">Aksi</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-slate-50 text-sm">
				{kriterias.map((item, index) => (
					<tr key={item.id} className="hover:bg-sky-50/30 transition-colors group">
						<td className="px-8 py-5 text-center font-bold text-slate-300">{index + 1}</td>
						<td className="px-6 py-5 font-black text-sky-700">{item.kode}</td>
						<td className="px-6 py-5 font-bold text-slate-700">{item.nama}</td>
						<td className="px-6 py-5">
							<span
								className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
									item.sifat === "cost"
										? "bg-amber-100 text-amber-700"
										: "bg-emerald-100 text-emerald-700"
								}`}
							>
								{item.sifat}
							</span>
						</td>
						<td className="px-8 py-5">
							<div className="flex justify-center gap-4">
								<button
									onClick={() => handleEditClick(item)}
									className="text-slate-400 hover:text-sky-700 transition-colors"
								>
									<TbEdit size={20} />
								</button>
								<button
									onClick={() => handleDelete(item.id)}
									className="text-slate-400 hover:text-red-500 transition-colors"
								>
									<MdDelete size={20} />
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
