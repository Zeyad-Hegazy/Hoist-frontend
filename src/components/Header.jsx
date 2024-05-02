/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Form from "./UI/Form";

import Toastar from "./UI/Toastar";
import { useSelector } from "react-redux";
import "./Header.css"; // Import the CSS file

const Header = ({ label, fields, confirmHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toastar = useSelector((state) => state.toastar);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-700 p-3 shadow rounded-lg custom-border">
      <h5 className="text-[20px]">{label} Page</h5>
      <button
        className="px-4 py-2 bg-indigo-600 add shadow-md text-white rounded-lg"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faPlus} /> <span className="ml-1 ">Add New</span>
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-gray-950 p-8 rounded-lg">
            <Form
              title={"Add New Employee"}
              fields={fields}
              closeHandler={closeModal}
              confirmHandler={confirmHandler}
            />
          </div>
        </div>
      )}
      <Toastar openSnackbar={toastar.open} snackbarMessage={toastar.message} />
    </div>
  );
};

export default Header;
