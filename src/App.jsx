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

const App = () => {
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
					<Route path="/accounts" element={<Accounts />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
