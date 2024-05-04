const convertToBase64 = async (fileOrUrl) => {
	if (typeof fileOrUrl === "string" && /^data:image\//.test(fileOrUrl)) {
		return fileOrUrl;
	}

	if (typeof fileOrUrl === "string" && /^(http|https):\/\//.test(fileOrUrl)) {
		const response = await fetch(fileOrUrl);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(fileOrUrl);
	});
};

export const isValidBase64 = (str) => {
	return /^data:image\//.test(str);
};

export default convertToBase64;
