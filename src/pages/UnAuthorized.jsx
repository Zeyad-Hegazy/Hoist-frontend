import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
	const navigate = useNavigate();

	return (
		<div className="h-[100vh] flex flex-col justify-center items-center gap-4">
			<h1 className="text-4xl">Unauthorized</h1>
			<p className="text-xl">You do not have permission to view this page.</p>
			<div className="flex gap-4">
				<button
					onClick={() => navigate(-1)}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					Go Back
				</button>
				{/* <button
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
					onClick={() => navigate("/login")}
				>
					Login
				</button> */}
			</div>
		</div>
	);
};

export default UnAuthorized;
