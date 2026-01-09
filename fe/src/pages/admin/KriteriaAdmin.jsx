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
	const [formData, setFormData] = useState({
		id: "",
		kode: "",
		nama: "",
		sifat: "benefit",
		bobot: "",
	});

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
		setFormData({
			id: item.id,
			kode: item.kode,
			nama: item.nama,
			sifat: item.sifat,
			bobot: item.bobot,
		});
		setEditForm(true);
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			await executePOST({
				kode: formData.kode,
				nama: formData.nama,
				sifat: formData.sifat,
				bobot: formData.bobot,
			});
			await executeGET();
			setAddForm(false);
			setFormData({ id: "", kode: "", nama: "", sifat: "benefit", bobot: "" });
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
							<h2 className="text-2xl font-black text-slate-800  tracking-tighter">
								{addForm ? "TAMBAH KRITERIA" : "UBAH KRITERIA"}
							</h2>
							<p className="text-gray-400 mt-1 text-xs font-bold tracking-widest">DATASET SPK</p>
						</div>

						<form onSubmit={addForm ? handleAdd : handleUpdate} className="p-8 space-y-5 text-left">
							<div>
								<label className="block text-xs font-black text-sky-700  tracking-wider mb-2">
									Kode Kriteria (C*)
								</label>
								<input
									type="text"
									required
									name="kode"
									value={formData.kode}
									onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
									placeholder="Contoh: C1"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-bold"
								/>
							</div>

							<div>
								<label className="block text-[10px] font-black text-sky-700  tracking-[0.2em] mb-2">
									Nama Kriteria
								</label>
								<input
									type="text"
									required
									name="nama"
									value={formData.nama}
									onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
									placeholder="Contoh: Harga Motor"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-medium"
								/>
							</div>
							<div>
								<label className="block text-[10px] font-black text-sky-700  tracking-[0.2em] mb-2">
									Bobot
								</label>
								<input
									type="number"
									required
									name="bobot"
									value={formData.bobot}
									onChange={(e) => setFormData({ ...formData, bobot: e.target.value })}
									placeholder="Contoh: 0.3"
									className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-700 focus:bg-white outline-none transition-all font-medium"
								/>
							</div>

							<div>
								<label className="block text-[10px] font-black text-sky-700  tracking-[0.2em] mb-2">
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
				<tr className="bg-white text-gray-900  text-[11px] tracking-wider border-b border-gray-200">
					<th className="px-2 py-4 font-medium text-center">No</th>
					<th className="px-9 py-4 font-medium text-start">Kode</th>
					<th className="px-9 py-4 font-medium text-start">Nama Kriteria</th>
					<th className="px-9 py-4 font-medium text-start">Sifat</th>
					<th className="px-9 py-4 font-medium text-center">Bobot</th>
					<th className="px-2 py-4 font-medium text-center">Aksi</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-slate-100 text-sm">
				{kriterias.map((item, index) => (
					<tr key={item.id} className="hover:bg-gray-50 transition">
						<td className="px-2 py-4 text-gray-700 text-center">{index + 1}</td>
						<td className="px-9 py-4 font-semibold text-gray-800 text-start">{item.kode}</td>
						<td className="px-9 py-4 text-gray-600">{item.nama}</td>
						<td className="px-6 py-4 text-gray-600 text-start">
							<span
								className={`px-3 py-1 rounded-full text-[10px] font-black  tracking-widest ${
									item.sifat === "cost"
										? "bg-amber-100 text-amber-700"
										: "bg-emerald-100 text-emerald-700"
								}`}
							>
								{item.sifat}
							</span>
						</td>
						<td className="px-9 py-4 text-gray-600 text-center">{item.bobot}</td>
						<td className="px-8 py-5">
							<div className="flex justify-center gap-4">
								<Button
									onClick={() => handleEditClick(item)}
									className="text-sky-700 flex items-center font-medium hover:underline mr-3"
								>
									<TbEdit size={20} />
									Ubah
								</Button>
								<Button
									onClick={() => handleDelete(item.id)}
									className="text-red-500 flex items-center font-medium hover:underline"
								>
									<MdDelete size={20} />
									Hapus
								</Button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
