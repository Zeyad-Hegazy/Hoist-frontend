/* eslint-disable react/prop-types */

const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword }) => {
      return (
            <div className={`w-full ${half ? "sm:w-1/2" : "sm:w-full"} mb-4`}>
                  <input
                        className="relative w-full p-4 	border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        name={name}
                        onChange={handleChange}
                        placeholder={label}
                        autoFocus={autoFocus}
                        type={type}
                        required
                  />
                  {name === "password" && (
                        <button
                              onClick={handleShowPassword}
                              className="top-0 right-0 mt-2 mr-3 focus:outline-none"
                        ></button>
                  )}
            </div>
      );
};

export default Input;
