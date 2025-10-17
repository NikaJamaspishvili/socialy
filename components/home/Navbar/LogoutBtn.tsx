"use client";
import React from "react";

function Logout({ className }: { className?: string }) {
	return (
		<button className={className + " bg-red-500 hover:bg-red-400"} onClick={() => console.log("logout")}>
			Logout
		</button>
	);
}

export default Logout;
