import React from "react";

const FormattedDate = ({ dateString }) => {
	const formatDate = (dateStr) => {
		const date = new Date(dateStr);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		};
		return date.toLocaleString("en-US", options);
	};

	return <div>{formatDate(dateString)}</div>;
};

export default FormattedDate;
