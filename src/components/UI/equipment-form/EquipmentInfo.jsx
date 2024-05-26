/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Reports from "../../../pages/admin-view/Reports";

const InfoCard = ({ title, value, className }) => {
	return (
		<div className={"flex gap-4 w-[30%] pl-4 py-2 rounded-md " + className}>
			<div className="font-bold">{title}:</div>
			<div style={{ color: value ? "inherit" : "rgb(185 28 28)" }}>
				{value ? value : "None"}
			</div>
		</div>
	);
};

const CustomTabPanel = ({ children, value, index, ...other }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
};

const EquipmentInfo = () => {
	const equipmentInfo = useSelector((state) => state.equipmentInfo)["0"];

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
			>
				<Tab label="Equipment Info" />
				<Tab label="Reports" />
			</Tabs>
			<CustomTabPanel value={value} index={0}>
				<div className="flex flex-wrap gap-8 mt-4">
					<InfoCard
						title={"Installation"}
						value={equipmentInfo.installationName}
					/>
					<InfoCard
						title={"Serial Number"}
						value={equipmentInfo.serialNumber}
					/>
					<InfoCard title={"Department"} value={equipmentInfo.departmentName} />

					<InfoCard title={"Category"} value={equipmentInfo.categoryName} />
					<InfoCard title={"Client"} value={equipmentInfo.clientName} />
					<InfoCard title={"Country"} value={equipmentInfo.country} />

					<InfoCard title={"Standard"} value={equipmentInfo.standard[0].name} />

					<InfoCard title={"Discription"} value={equipmentInfo.discription} />
				</div>
				<hr className="my-16" />

				<div className="flex flex-wrap gap-8 ">
					<InfoCard title={"Location"} value={equipmentInfo.location} />
					<InfoCard
						title={"Load Test Number"}
						value={equipmentInfo.loadTestNumber}
					/>
					<InfoCard title={"SWL"} value={equipmentInfo.swl} />
					<InfoCard
						title={"Load Test Company"}
						value={equipmentInfo.loadTestCompany}
					/>
					<InfoCard title={"Manufacturer"} value={equipmentInfo.manufacturer} />

					<InfoCard
						title={"Load Test Date"}
						value={equipmentInfo.loadTestDate}
					/>

					<InfoCard
						title={"Manufacturer Date"}
						value={equipmentInfo.manufacturerDate}
					/>

					<InfoCard
						title={"Date Of Last Inspection"}
						value={equipmentInfo.dateOfLastInsp}
					/>

					<InfoCard
						title={"Main Serial Number"}
						value={equipmentInfo.mainSerialNumber}
					/>
					<InfoCard
						title={"Date Of Next Inspection"}
						value={equipmentInfo.dateOfNextInsp}
					/>
					<InfoCard
						title={"Last Inspector"}
						value={equipmentInfo.lastInspectorName}
					/>
					<InfoCard
						title={"Last Inspector Number"}
						value={equipmentInfo.lastInspectorNumber}
					/>
					<InfoCard title={"Comment"} value={equipmentInfo.comment} />
				</div>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				{/* Reports page here */}
				<div className="mt-4">
					<Reports
						equipmentId={equipmentInfo._id}
						equipmentStandard={equipmentInfo.standard[0].name}
					/>
				</div>
			</CustomTabPanel>
		</>
	);
};

export default EquipmentInfo;
