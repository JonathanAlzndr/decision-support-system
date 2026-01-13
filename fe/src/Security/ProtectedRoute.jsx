import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	if (!token || role !== "Admin") {
		return <Navigate to="/admin/login" replace />;
	}
	return children;
};

export const ProtectedUserRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	if (!token || role !== "user") {
		return <Navigate to="/user/login" replace />;
	}
	return children;
};
