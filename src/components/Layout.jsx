import logo from "../assets/images/Final logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClipboardList,
	faUserLock,
	faUsers,
	faBell,
	faTools,
	faMoneyBill,
	faSignOutAlt,
	faSearch,
	faHandPaper,
	faCogs,
	faMapMarkerAlt,
	faAngleUp,
	faAngleDown,
	faSuitcase,
	faLayerGroup,
	faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import "./Layout.css";
import { useState } from "react";

const Layout = () => {
	const userName = useSelector((state) => state.auth.profile.result.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showDropdown, setShowDropdown] = useState(false);

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
					<NavLink className="li mt-2" to="/dashboard">
						<FontAwesomeIcon className="mr-2" icon={faClipboardList} />{" "}
						Dashboard
					</NavLink>

					<NavLink className="li mt-7" to="/workorder">
						<FontAwesomeIcon className="mr-2" icon={faClipboardList} /> Work
						Order
					</NavLink>
					<NavLink className="li mt-7" to="/employees">
						<FontAwesomeIcon className="mr-2" icon={faUsers} /> Employees
					</NavLink>
					<NavLink className="li mt-7" to="/auth">
						<FontAwesomeIcon className="mr-2" icon={faUserLock} />
						Authentication
					</NavLink>
					<NavLink className="li mt-7" to="/clients">
						<FontAwesomeIcon className="mr-2" icon={faUsers} /> Clients
					</NavLink>
					<NavLink className="li mt-7" to="/client-not">
						<FontAwesomeIcon className="mr-2" icon={faBell} /> Client
						Notification
					</NavLink>
					<NavLink className="li mt-7" to="/equipments">
						<FontAwesomeIcon className="mr-2" icon={faTools} /> Equipments
					</NavLink>
					<li
						className="py-2 px-4 "
						onClick={() => setShowDropdown(!showDropdown)}
					>
						<hr />
						<div className="flex items-center mt-5 cursor-pointer">
							{/* <FontAwesomeIcon className="mr-2" icon={faClipboardList} /> */}
							Others
							<FontAwesomeIcon
								className="ml-auto transition-transform duration-300 transform"
								icon={showDropdown ? faAngleUp : faAngleDown}
							/>
						</div>
						{showDropdown && (
							<ul>
								<NavLink className="li mt-7" to="/category">
									<FontAwesomeIcon className="mr-2" icon={faSuitcase} />
									Categories
								</NavLink>
								<NavLink className="li mt-7" to="/types">
									<FontAwesomeIcon className="mr-2" icon={faLayerGroup} />
									Types
								</NavLink>
								<NavLink className="li mt-7" to="/installations">
									<FontAwesomeIcon className="mr-2" icon={faMapMarkerAlt} />
									Installations
								</NavLink>
								<NavLink className="li mt-7" to="/departments">
									<FontAwesomeIcon className="mr-2" icon={faBuilding} />
									Departments
								</NavLink>
								<NavLink className="li mt-7" to="/accounts">
									<FontAwesomeIcon className="mr-2" icon={faMoneyBill} />
									Accounts
								</NavLink>
								<NavLink className="li mt-7" to="/standards">
									<FontAwesomeIcon className="mr-2" icon={faCogs} /> Standards
								</NavLink>
							</ul>
						)}
					</li>
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

export default Layout;
