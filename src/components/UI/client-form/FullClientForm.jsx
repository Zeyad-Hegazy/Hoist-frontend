/* eslint-disable react/prop-types */
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import "../../Header.css";

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullClientForm({ closeModal, state }) {
      const [fieldCount, setFieldCount] = useState(1);

      const handleAddField = () => {
            setFieldCount((prev) => (prev += 1));
      };

      const handleClose = () => {
            closeModal(false);
      };

      return (
            <React.Fragment>
                  <Dialog
                        fullScreen
                        open={state}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                  >
                        <AppBar sx={{ position: "relative" }}>
                              <Toolbar>
                                    <IconButton
                                          edge="start"
                                          color="inherit"
                                          onClick={handleClose}
                                          aria-label="close"
                                    >
                                          <FontAwesomeIcon icon={faClose} />
                                    </IconButton>
                                    <Typography
                                          sx={{ ml: 2, flex: 1 }}
                                          variant="h6"
                                          component="div"
                                    >
                                          Add New Client
                                    </Typography>
                                    <Button autoFocus color="inherit" onClick={handleClose}>
                                          Confirm
                                    </Button>
                              </Toolbar>
                        </AppBar>
                        <div className="m-4">
                              <div className="my-3 ">
                                    <h3 className="mb-2">Add Client Name</h3>
                                    <div className="shadow-md custom-border p-3 bg-gray-700">
                                          <form>
                                                {/* Name */}
                                                <div>
                                                      <TextField
                                                            fullWidth={false}
                                                            label={"Client Name"}
                                                            name={"name"}
                                                            type={"text"}
                                                            variant="outlined"
                                                            // value={formData["name"]}
                                                            // onChange={handleChange}
                                                            // onBlur={(e) =>
                                                            //       validateField(e.target.name, e.target.value)
                                                            // }
                                                            // disabled={formAction === "view"}
                                                            // error={errors["name"] ? true : false}
                                                            // helperText={errors["name"]}
                                                      />
                                                </div>
                                          </form>
                                    </div>
                              </div>
                              <div className="my-4">
                                    <div className="flex gap-3 justify-between mb-2">
                                          <h3>Add Departments</h3>
                                          <div
                                                className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-700 text-white cursor-pointer"
                                                onClick={handleAddField}
                                          >
                                                <FontAwesomeIcon icon={faPlus} />
                                          </div>
                                    </div>
                                    <div className="shadow-md custom-border p-3 bg-gray-700">
                                          <form className="flex flex-wrap gap-2">
                                                {[...Array(fieldCount)].map((_, index) => (
                                                      <div key={index}>
                                                            <TextField
                                                                  fullWidth={false}
                                                                  label={`Department Name ${
                                                                        index + 1
                                                                  }`}
                                                                  name={`name${index}`}
                                                                  type="text"
                                                                  variant="outlined"
                                                                  // Add your onChange, value, and other props as needed
                                                            />
                                                      </div>
                                                ))}
                                          </form>
                                    </div>
                              </div>

                              <div className="my-4">
                                    <div className="flex gap-3 justify-between mb-2">
                                          <h3>Add Branches</h3>
                                          <div
                                                className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-700 text-white cursor-pointer"
                                                onClick={handleAddField}
                                          >
                                                <FontAwesomeIcon icon={faPlus} />
                                          </div>
                                    </div>
                                    <div className="shadow-md custom-border p-3 bg-gray-700">
                                          <form className="flex flex-wrap gap-2">
                                                {[...Array(fieldCount)].map((_, index) => (
                                                      <div key={index}>
                                                            <TextField
                                                                  fullWidth={false}
                                                                  label={`Department Name ${
                                                                        index + 1
                                                                  }`}
                                                                  name={`name${index}`}
                                                                  type="text"
                                                                  variant="outlined"
                                                                  // Add your onChange, value, and other props as needed
                                                            />
                                                      </div>
                                                ))}
                                          </form>
                                    </div>
                              </div>
                        </div>
                  </Dialog>
            </React.Fragment>
      );
}
