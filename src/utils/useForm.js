import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getall } from "../actions/employees";
import convertToBase64, { isValidBase64 } from "./convertToBase64";

const useForm = ({
	selected,
	formAction,
	initialState,
	closeHandler,
	confirmHandler,
	schema,
}) => {
	const dispatch = useDispatch();

	const [imagePreview, setImagePreview] = useState("");
	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const fetchSelectedData = async () => {
			if (selected) {
				const base64Image = await convertToBase64(selected.signeture);
				setImagePreview(base64Image);
				setFormData({ ...selected, signeture: base64Image });
			}
		};

		fetchSelectedData();
	}, [selected]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
		validateField(name, value);
	};

	const validateField = async (fieldName, value) => {
		try {
			await schema.validateAt(fieldName, { [fieldName]: value });
			setErrors((prevErrors) => ({
				...prevErrors,
				[fieldName]: null,
			}));
		} catch (error) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[fieldName]: error.message,
			}));
		}
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const base64 = await convertToBase64(file);
			if (isValidBase64(base64)) {
				setImagePreview(base64);
				setFormData((prevState) => ({
					...prevState,
					signeture: base64,
				}));
			} else {
				console.error("Invalid base64 string");
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await schema.validate(formData, { abortEarly: false });

			if (formAction === "create") {
				await dispatch(confirmHandler(formData));
			} else if (formAction === "edit") {
				delete formData.password;
				await dispatch(confirmHandler(formData, selected._id));
			}

			dispatch(getall());
			closeHandler();
		} catch (validationErrors) {
			const formattedErrors = {};
			validationErrors.inner.forEach((error) => {
				formattedErrors[error.path] = error.message;
			});
			setErrors(formattedErrors);
		}
	};

	useEffect(() => {
		const isValid =
			Object.values(errors).some((err) => err === null) &&
			!areAllFieldsEmpty(formData);
		setIsFormValid(isValid);
	}, [formData, errors]);

	const areAllFieldsEmpty = (data) => {
		return Object.values(data).some((value) => value === "");
	};

	return {
		formData,
		errors,
		isFormValid,
		validateField,
		imagePreview,
		handleChange,
		handleImageChange,
		handleSubmit,
	};
};

export default useForm;
