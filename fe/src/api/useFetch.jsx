import axios from "axios";
import { useEffect, useCallback, useState } from "react";

const apiClient = axios.create({
	baseURL: "http://127.0.0.1:5000/api",
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		if (config.data instanceof FormData) {
			delete config.headers["Content-Type"];
		} else {
			config.headers["Content-Type"] = "application/json";
		}

		return config;
	},
	(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("token");
			localStorage.removeItem("role");
		}
		return Promise.reject(error);
	}
);

const useFetch = (url, method = "GET", payload = null, options = { autoFetch: true }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(options.autoFetch);
	const [error, setError] = useState(null);

	const execute = useCallback(
		async (dynamicPayload = payload, overrideUrl = url) => {
			const controller = new AbortController();
			try {
				setLoading(true);
				setError(null);

				const response = await apiClient({
					method: method,
					url: overrideUrl,
					data: dynamicPayload,
					signal: controller.signal,
				});

				setData(response.data);
				return response.data;
			} catch (err) {
				setError(err);
				console.error("API Error:", err);
				throw err;
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
