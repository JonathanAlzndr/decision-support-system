import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdElectricBolt } from "react-icons/md";
import Button from "../components/Button";
import useFetch from "../api/useFetch";
import Loading from "../components/Loading";
import Back from "../components/Back";

export default function Register() {
	const navigate = useNavigate();
	const [popUp, setPopUp] = useState(false);
	const { loading, error, execute } = useFetch("/auth/register", "POST", null, {
		autoFetch: false,
	});
	const [formData, setFormData] = useState({ username: "", password: "", role: "user" });
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await execute(formData);
			setPopUp(true);
		} catch (err) {
			console.error("Gagal register:", err);
		}
	};

	return (
		<>
			{loading && <Loading />}
			{popUp && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-slate-900/40 p-4 font-sans">
					<div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
						{/* Icon Success */}
						<div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={3}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
							</svg>
						</div>

						<h1 className="text-2xl font-bold text-slate-800 mb-2">Berhasil Masuk!</h1>
						<p className="text-slate-500 mb-8">
							Akun Anda telah terverifikasi. Silakan lanjut ke halaman login.
						</p>

						<Button
							onClick={() => {
								setPopUp(false);
								navigate("/user/login");
							}}
							className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-200"
						>
							Pergi Masuk
						</Button>
					</div>
				</div>
			)}
			<section className="flex justify-center h-screen w-screen items-center">
				<div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-sky-300/30 rounded-full blur-[100px] -z-10 animate-pulse"></div>
				<div className="fixed bottom-[-10%] right-[-10%] w-150 h-150 bg-purple-300/30 rounded-full blur-[120px] -z-10"></div>
				<div className="fixed top-[40%] left-[40%] w-75 h-75 bg-pink-300/20 rounded-full blur-[80px] -z-10"></div>
				<div className="glass-morphism shadow-xl p-10 md:p-12 rounded-3xl bg-gray-100 flex flex-col w-xl items-center text-center animate-fade-in relative overflow-hidden">
					<div className="flex items-center w-full h-full">
						<Back />
					</div>
					<div
						className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center shadow-lg mb-6 text-sky-500 border border-white
                hover:scale-110 transition-transform duration-300 ease-in-out"
					>
						<MdElectricBolt size={40} />
					</div>
					<h2 className="text-slate-800 text-lg font-bold mb-2 leading-tight">
						Daftar Akun Pengguna
					</h2>

					<form className="w-full space-y-5 mt-6" onSubmit={handleRegister}>
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
						{error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}
						<Button
							type="submit"
							className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-slate-300 transition-all transform hover:-translate-y-1 mt-6"
							disabled={loading}
						>
							Daftar
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
