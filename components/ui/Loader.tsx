import React from "react";

const Loader = ({ message }: { message: string }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<h1 className="text-white text-lg">{message}</h1>
		</div>
	);
};

export default Loader;
