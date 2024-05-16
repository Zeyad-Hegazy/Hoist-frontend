/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./../../actions/auth";
import Input from "../../components/UI/Input";
import logo from "../../assets/images/Final logo.png";
import logoPattern from "../../assets/images/logo-pattern.png";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const initialState = {
      email: "",
      password: "",
};
const Login = () => {
      const [formData, setFormData] = useState(initialState);
      const [showPassword, setShowPassword] = useState(false);
      const dispatch = useDispatch();
      const navigate = useNavigate();

      // const user = useSelector((state) => state.auth.profile);

      const handleShowPassword = () => {
            setShowPassword((prevShowPasswrd) => !prevShowPasswrd);
      };

      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
            e.preventDefault();

            dispatch(login(formData));

            navigate("/dashboard");
      };

      return (
            <div className="w-[100vw]  h-[100vh] flex justify-center items-center bg-gradient-to-r from-gray-800  to-gray-900 text-black">
                  <div className="bg-gray-600 shadow-white login bg-gradient-to-r from-sky-950  to-sky-900  w-[35vw] px-14 rounded-l-3xl rounded-br-3xl  rounded-tr-md rounded-bl-md h-[85%] flex flex-col justify-evenly align-baseline ">
                        <div className=" flex justify-center">
                              <img src={logo} width={"200px"} alt="logo" />
                        </div>
                        <div className="w-[100%]">
                              <form onSubmit={handleSubmit} className="w-[100%]">
                                    <div className="flex flex-col w-[100%]">
                                          <Input
                                                name="email"
                                                label="Emial Address"
                                                handleChange={handleChange}
                                                type="email"
                                          />
                                          <div style={{ position: "relative" }}>
                                                <Input
                                                      name="password"
                                                      label="Password"
                                                      handleChange={handleChange}
                                                      type={showPassword ? "text" : "password"}
                                                      handleShowPassword={handleShowPassword}
                                                />
                                                <div
                                                      style={{
                                                            position: "absolute",
                                                            top: "30%",
                                                            right: "10px",
                                                            transform: "translateY(-50%)",
                                                            cursor: "pointer",
                                                      }}
                                                >
                                                      <FontAwesomeIcon
                                                            icon={showPassword ? faEye : faEyeSlash}
                                                            onClick={handleShowPassword}
                                                            className={
                                                                  showPassword ? "text-red-600" : ""
                                                            }
                                                      />
                                                </div>
                                          </div>

                                          <button
                                                type="submit"
                                                className="p-4 transition-all hover:-translate-y-1 hover:from-sky-800 hover:to-sky-600 w-full bg-gradient-to-l shadow-lg from-sky-900  to-sky-800  text-white rounded-md"
                                          >
                                                Login
                                          </button>
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default Login;
