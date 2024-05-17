import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/admin-view/Dashboard";
import WorkOrder from "./pages/admin-view/WorkOrder";
import Employees from "./pages/admin-view/Employees";
import Auth from "./pages/admin-view/Auth";
import Clients from "./pages/admin-view/Clients";
import ClientNot from "./pages/admin-view/ClientNot";
import Equipments from "./pages/admin-view/Equipments";
import Accounts from "./pages/admin-view/Accounts";
import Login from "./pages/auth/Login";
import Toastar from "./components/UI/Toastar";
import Standards from "./pages/admin-view/Standards";
import Installations from "./pages/admin-view/Installations";
import Category from "./pages/admin-view/Category";
import Type from "./pages/admin-view/Type";
import Department from "./pages/admin-view/Department";
import EquipmentInfo from "./components/UI/equipment-form/EquipmentInfo";

import { useSelector } from "react-redux";

const App = () => {
	const toastar = useSelector((state) => state.toastar);

	return (
		<div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Layout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/workorder" element={<WorkOrder />} />
					<Route path="/employees" element={<Employees />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/clients" element={<Clients />} />
					<Route path="/client-not" element={<ClientNot />} />
					<Route path="/equipments" element={<Equipments />} />
					<Route path="equipments/info" element={<EquipmentInfo />} />
					<Route path="/accounts" element={<Accounts />} />
					<Route path="/standards" element={<Standards />} />
					<Route path="/installations" element={<Installations />} />
					<Route path="/category" element={<Category />} />
					<Route path="/types" element={<Type />} />
					<Route path="/departments" element={<Department />} />
				</Route>
			</Routes>
			<Toastar openSnackbar={toastar.open} snackbarMessage={toastar.message} />
		</div>
	);
};

export default App;
