import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdElectricBolt } from "react-icons/md";
import Button from "../components/Button";
import useFetch from "../api/useFetch";
import Loading from "../components/Loading";
import Back from "../components/Back";

export default function Login({ portal = "User" }) {
	const navigate = useNavigate();
	const { loading, error, execute } = useFetch("/auth/login", "POST", null, { autoFetch: false });
	const [formData, setFormData] = useState({ username: "", password: "" });
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const result = await execute(formData);

			if (result && result.token) {
				localStorage.setItem("token", result.token);
				localStorage.setItem("role", portal);
				navigate("/admin");
			}
		} catch (err) {
			console.error("Gagal login:", err);
		}
	};

	return (
		<>
			{loading && <Loading />}
			<section className="flex justify-center h-screen w-screen items-center">
				<div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-sky-300/30 rounded-full blur-[100px] -z-10 animate-pulse"></div>
				<div className="fixed bottom-[-10%] right-[-10%] w-150 h-150 bg-purple-300/30 rounded-full blur-[120px] -z-10"></div>
				<div className="fixed top-[40%] left-[40%] w-75 h-75 bg-pink-300/20 rounded-full blur-[80px] -z-10"></div>
				<div className="glass-morphism shadow-xl p-10 md:p-12 rounded-3xl bg-gray-100 flex flex-col w-xl items-center text-center animate-fade-in relative overflow-hidden">
					<div className="flex items-center w-full h-full mb-10">
						<Back />
						<div className="mb-4 w-full flex justify-center">
							<span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] border border-sky-200 shadow-sm">
								Portal {portal ? "Pengguna" : "Admin"}
							</span>
						</div>
						<div className="w-4" />
					</div>
					<div
						className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center shadow-lg mb-6 text-sky-500 border border-white
                hover:scale-110 transition-transform duration-300 ease-in-out"
					>
						<MdElectricBolt size={50} />
					</div>
					<h2 className="text-slate-800 text-lg font-bold mb-2 leading-tight">
						Pemilihan Motor Listrik Menggunakan Metode
						<br />
						<span className="text-sky-600">SAW dan TOPSIS</span>
					</h2>

					<form className="w-full space-y-5 mt-6" onSubmit={handleLogin}>
						<div className="relative group">
							<div className="text-left mb-1 ml-1">
								<label className="text-xs font-bold text-slate-500 uppercase">Username</label>
							</div>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-white/60 border border-white focus:border-sky-400 focus:bg-white rounded-xl text-slate-700 outline-none transition-all shadow-sm placeholder-slate-400"
								placeholder="Masukkan username"
								required
							/>
						</div>

						<div className="relative group">
							<div className="text-left mb-1 ml-1">
								<label className="text-xs font-bold text-slate-500 uppercase">Kata sandi</label>
							</div>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-white/60 border border-white focus:border-sky-400 focus:bg-white rounded-xl text-slate-700 outline-none transition-all shadow-sm placeholder-slate-400"
								placeholder="Masukkan kata sandi"
								required
							/>
						</div>
						{error && (
							<p className="text-red-500 text-sm font-bold text-center mt-2">
								Username atau Kata Sandi tidak cocok
							</p>
						)}

						<Button
							type="submit"
							className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-slate-300 transition-all transform hover:-translate-y-1 mt-6"
							disabled={loading}
						>
							Masuk
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
