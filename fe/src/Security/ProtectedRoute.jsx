import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	// Jika tidak ada token ATAU role bukan Admin, lempar ke login admin
	if (!token || role !== "Admin") {
		return <Navigate to="/admin/login" replace />;
	}
	return children;
};

export const ProtectedUserRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	// Jika tidak ada token ATAU role bukan User, lempar ke login user
	if (!token || role !== "user") {
		return <Navigate to="/user/login" replace />;
	}
	return children;
};
