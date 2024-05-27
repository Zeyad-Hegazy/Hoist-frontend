import logo from "../assets/images/Final logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClipboardList,
	faBell,
	faTools,
	faSignOutAlt,
	faSearch,
	faHandPaper,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import "./Layout.css";

const EmployeeLayout = () => {
	const userName = useSelector((state) => state.auth.profile.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div className="flex">
			<div className="sticky w-48 min-h-[100vh]  bg-gray-900 text-[0.9rem] text-white">
				<div className="p-4">
					<img src={logo} alt="logo image" />
				</div>
				<ul className="mt-8 layout-links">
					<NavLink className="li mt-2" to="dashboard">
						<FontAwesomeIcon className="mr-2" icon={faClipboardList} />
						Dashboard
					</NavLink>

					<NavLink className="li mt-7" to="client-not">
						<FontAwesomeIcon className="mr-2" icon={faBell} /> Client
						Notification
					</NavLink>
					<NavLink className="li mt-7" to="equipments">
						<FontAwesomeIcon className="mr-2" icon={faTools} /> Equipments
					</NavLink>
				</ul>
			</div>
			<div className="flex-1">
				<div className="bg-gray-900 text-white p-4">
					<ul className="flex justify-between items-center">
						<li className="mr-4">
							<div className="hello">
								<FontAwesomeIcon
									icon={faHandPaper}
									className="mr-3 icon shake text-yellow-400"
								/>
								<span>Hello, {userName.name}</span>
							</div>
						</li>
						<li className="w-[30%] relative">
							<input
								type="search"
								className="w-full p-2 pl-8 rounded-lg bg-gray-800 text-white outline-none border-none"
								placeholder="Search"
							/>
							<FontAwesomeIcon
								icon={faSearch}
								className="absolute left-3 top-3 text-gray-400"
							/>
						</li>
						<li>
							<button
								className="px-4 py-2  border-red-800 rounded-lg logout  flex  justify-center items-center"
								onClick={logoutHandler}
							>
								<span className=" mr-2">Logout</span>
								<FontAwesomeIcon
									icon={faSignOutAlt}
									flip="horizontal"
									className="text-red-600"
								/>
							</button>
						</li>
					</ul>
				</div>
				<main className="p-4 mx-auto">{<Outlet />}</main>
			</div>
		</div>
	);
};

export default EmployeeLayout;
