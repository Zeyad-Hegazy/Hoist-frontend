import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/Layout";
import EmployeeLayout from "./components/EmployeeLayout";
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
import PrivateRoute from "./components/PrivateRoute";
import UnAuthorized from "./pages/UnAuthorized";

import { useSelector } from "react-redux";

import {
	ADMIN,
	EMPLOYEE,
	TECHNICIAN,
	SUPERVISOR,
	INSPECTOR,
	CLIENT,
} from "./constants/user-roles";
import EmpEquipments from "./pages/employee-view/EmpEquipments";
import EmpEquipmentInfo from "./components/Employee-UI/equipment/EmpEquipmentinfo";

import ClientLayout from "./components/ClientLayout";
import ClientAccounts from "./pages/client-view/ClientAccounts";
import ClientEquipments from "./pages/client-view/ClientEquipment";
import DefectedReports from "./pages/client-view/DefectedReports";
import Defects from "./pages/client-view/Defects";
import AdminDefects from "./pages/admin-view/AdminDefects";

const App = () => {
	const toastar = useSelector((state) => state.toastar);

	return (
		<div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<UnAuthorized />} />

				{/* Admin Routes */}
				<Route
					path="/admin"
					element={<PrivateRoute element={<AdminLayout />} roles={[ADMIN]} />}
				>
					<Route
						path="dashboard"
						element={<PrivateRoute element={<Dashboard />} roles={[ADMIN]} />}
					/>
					<Route
						path="workorder"
						element={<PrivateRoute element={<WorkOrder />} roles={[ADMIN]} />}
					/>
					<Route
						path="employees"
						element={<PrivateRoute element={<Employees />} roles={[ADMIN]} />}
					/>
					<Route
						path="auth"
						element={<PrivateRoute element={<Auth />} roles={[ADMIN]} />}
					/>
					<Route
						path="clients"
						element={<PrivateRoute element={<Clients />} roles={[ADMIN]} />}
					/>
					<Route
						path="client-not"
						element={<PrivateRoute element={<ClientNot />} roles={[ADMIN]} />}
					/>
					<Route
						path="client-not/defects/:reportId"
						element={
							<PrivateRoute element={<AdminDefects />} roles={[ADMIN]} />
						}
					/>
					<Route
						path="equipments"
						element={<PrivateRoute element={<Equipments />} roles={[ADMIN]} />}
					/>
					<Route
						path="equipments/info"
						element={
							<PrivateRoute element={<EquipmentInfo />} roles={[ADMIN]} />
						}
					/>
					<Route
						path="accounts"
						element={<PrivateRoute element={<Accounts />} roles={[ADMIN]} />}
					/>
					<Route
						path="standards"
						element={<PrivateRoute element={<Standards />} roles={[ADMIN]} />}
					/>
					<Route
						path="installations"
						element={
							<PrivateRoute element={<Installations />} roles={[ADMIN]} />
						}
					/>
					<Route
						path="category"
						element={<PrivateRoute element={<Category />} roles={[ADMIN]} />}
					/>
					<Route
						path="types"
						element={<PrivateRoute element={<Type />} roles={[ADMIN]} />}
					/>
					<Route
						path="departments"
						element={<PrivateRoute element={<Department />} roles={[ADMIN]} />}
					/>
				</Route>

				{/* Employee Routes */}
				<Route
					path="/employee"
					element={
						<PrivateRoute
							element={<EmployeeLayout />}
							roles={[EMPLOYEE, TECHNICIAN, SUPERVISOR, INSPECTOR]}
						/>
					}
				>
					<Route
						path="dashboard"
						element={
							<PrivateRoute
								element={<Dashboard />}
								roles={[EMPLOYEE, TECHNICIAN, SUPERVISOR, INSPECTOR]}
							/>
						}
					/>
					<Route
						path="equipments"
						element={
							<PrivateRoute
								element={<EmpEquipments />}
								roles={[EMPLOYEE, TECHNICIAN, SUPERVISOR, INSPECTOR]}
							/>
						}
					/>
					<Route
						path="equipments/info"
						element={
							<PrivateRoute
								element={<EmpEquipmentInfo />}
								roles={[EMPLOYEE, TECHNICIAN, SUPERVISOR, INSPECTOR]}
							/>
						}
					/>
				</Route>

				{/* Client Routes */}
				<Route
					path="/client"
					element={<PrivateRoute element={<ClientLayout />} roles={CLIENT} />}
				>
					<Route
						path="dashboard"
						element={<PrivateRoute element={<Dashboard />} roles={[CLIENT]} />}
					/>
					<Route
						path="accounts"
						element={
							<PrivateRoute element={<ClientAccounts />} roles={[CLIENT]} />
						}
					/>
					<Route
						path="equipments"
						element={
							<PrivateRoute element={<ClientEquipments />} roles={[CLIENT]} />
						}
					/>
					<Route
						path="reports"
						element={
							<PrivateRoute element={<DefectedReports />} roles={[CLIENT]} />
						}
					/>

					<Route
						path="reports/defects/:reportId"
						element={<PrivateRoute element={<Defects />} roles={[CLIENT]} />}
					/>
				</Route>
			</Routes>
			<Toastar openSnackbar={toastar.open} snackbarMessage={toastar.message} />
		</div>
	);
};

export default App;
