import axios from "axios";
import { useEffect, useCallback, useState } from "react";

// 1. Inisialisasi Instance Axios
const apiClient = axios.create({
	baseURL: "http://127.0.0.1:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// 2. Interceptor Request: Menambahkan Token Otomatis
apiClient.interceptors.request.use(
	(config) => {
		// Sesuaikan kunci token dengan 'adminToken' agar sinkron dengan ProtectedRoute
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// 3. Interceptor Response: Menangani Error 401 (Unauthorized)
// Perbaikan: Sebelumnya Anda menulis request.use, seharusnya response.use
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			// Hapus token jika sesi kadaluarsa
			localStorage.removeItem("token");
			localStorage.removeItem("role");
		}
		return Promise.reject(error);
	}
);

// 4. Custom Hook useFetch
const useFetch = (url, method = "GET", payload = null, options = { autoFetch: true }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(options.autoFetch);
	const [error, setError] = useState(null);

	const execute = useCallback(
		async (dynamicPayload = payload) => {
			const controller = new AbortController();
			try {
				setLoading(true);
				setError(null);

				const response = await apiClient({
					method: method,
					url: url,
					data: dynamicPayload, // Axios secara otomatis mengabaikan data pada method GET
					signal: controller.signal,
				});

				setData(response.data);
				return response.data;
			} catch (err) {
				if (axios.isCancel(err)) {
					console.log("Request canceled");
				} else {
					const errMsg = err.response?.data?.message || err.message || "Something went wrong";
					setError(errMsg);
					throw err;
				}
			} finally {
				setLoading(false);
			}
		},
		[url, method, payload]
	);

	useEffect(() => {
		if (options.autoFetch) {
			execute();
		}
	}, [execute, options.autoFetch]);

	return { data, loading, error, execute };
};

export default useFetch;
