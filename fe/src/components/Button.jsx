import React from "react";
export default function Button({ className, onClick, type, children }) {
	return (
		<button onClick={onClick} type={type} className={`cursor-pointer ${className}`}>
			{children}
		</button>
	);
}
