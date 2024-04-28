import logo from "../assets/images/Final logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTachometerAlt,
	faClipboardList,
	faUserLock,
	faUsers,
	faBell,
	faTools,
	faMoneyBill,
	faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";

const Layout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div className="flex">
			<div className="w-48 h-[100vh] bg-gray-800 text-white">
				<div className="p-4">
					<img src={logo} alt="logo image" />
				</div>
				<ul className="mt-8">
					<li className="py-2 px-4 my-6">
						<Link to="/dashboard">
							<FontAwesomeIcon className="mr-2" icon={faTachometerAlt} />
							Dashboard
						</Link>
					</li>
					<li className="py-2 px-4 my-6">
						<Link to="/workorder">
							<FontAwesomeIcon className="mr-2" icon={faClipboardList} /> Work
							Order
						</Link>
					</li>
					<li className="py-2 px-4 my-6">
						<Link to="/employees">
							<FontAwesomeIcon className="mr-2" icon={faUsers} /> Employees
						</Link>
					</li>
					<li className="py-2 px-4 my-6">
						<Link to="/auth">
							<FontAwesomeIcon className="mr-2" icon={faUserLock} />
							Authentication
						</Link>
					</li>
					<li className="py-2 px-4 my-6">
						<Link to="/clients">
							<FontAwesomeIcon className="mr-2" icon={faUsers} /> Clients
						</Link>
					</li>
					<li className="py-2 px-4 my-6">
						<Link to="/client-not">
							<FontAwesomeIcon className="mr-2" icon={faBell} /> Client
							Notification
						</Link>
					</li>
					<li className="py-2 px-4 my-6">
						<Link to="/equipments">
							<FontAwesomeIcon className="mr-2" icon={faTools} /> Equipments
						</Link>
					</li>
					<li className="py-2 px-4 my-6">
						<Link to="/accounts">
							<FontAwesomeIcon className="mr-2" icon={faMoneyBill} /> Accounts
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex-1">
				<div className="bg-gray-900 text-white p-4">
					<ul className="flex justify-between items-center">
						<li className="mr-4">Hello userName</li>
						<li className="w-[30%]">
							<input
								type="search"
								className="w-full p-2 rounded-lg text-black outline-none border-none"
								placeholder="Search"
							/>
						</li>
						<li>
							<button
								className="px-4 py-2 bg-red-700 rounded-lg font-bold flex justify-center items-center"
								onClick={logoutHandler}
							>
								<FontAwesomeIcon icon={faLongArrowAltLeft} />
								<span className="pb-1 ml-2">Logout</span>
							</button>
						</li>
					</ul>
				</div>
				<div className="p-4 mx-auto">{<Outlet />}</div>
			</div>
		</div>
	);
};

export default Layout;
