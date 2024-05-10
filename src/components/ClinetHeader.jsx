/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
// import { useState } from "react";

const ClinetHeader = ({ label, setAction, openFullForm }) => {
      return (
            <div className="flex justify-between items-center custom-border">
                  <h1 className="text-[30px]">{label} Page</h1>
                  <div className="flex gap-2">
                        <button
                              className="px-4 py-2 bg-purple-500 text-white rounded-lg"
                              onClick={() => {
                                    setAction({
                                          action: "create",
                                          visible: true,
                                    });
                              }}
                        >
                              <FontAwesomeIcon icon={faPlus} />
                              <span className="ml-1">Add Branch</span>
                        </button>
                        {/* <button
                              className="px-4 py-2 bg-blue-700 text-white rounded-lg"
                              // onClick={() => {
                              //       setAction({
                              //             action: "create",
                              //             visible: true,
                              //       });
                              // }}
                        >
                              <FontAwesomeIcon icon={faPlus} />
                              <span className="ml-1">Add Client</span>
                        </button> */}
                        <button
                              className="px-4 py-2 bg-blue-700 text-white rounded-lg"
                              onClick={openFullForm}
                        >
                              <FontAwesomeIcon icon={faPlus} />
                              <span className="ml-1">Add Client</span>
                        </button>
                  </div>
            </div>
      );
};

export default ClinetHeader;
