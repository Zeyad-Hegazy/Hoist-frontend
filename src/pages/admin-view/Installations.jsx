import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getAllIns, createOne, updateOneIns } from "./../../actions/installation";
import TableComponent from "../../components/UI/Table";
import InstallationForm from "../../components/UI/installation-form/InstallationForm";

const coulmns = [
      {
            id: "name",
            label: "Name",
            minWidth: 170,
            align: "center",
      },
      {
            id: "clientName",
            label: "Client Name",
            minWidth: 170,
            align: "center",
      },
      {
            id: "clientCountry",
            label: "Client Country",
            minWidth: 170,
            align: "center",
      },
];

const Installations = () => {
      const dispatch = useDispatch();
      const installations = useSelector((state) => state.installations);
      const selectedInstallation = useSelector((state) => state.select);

      const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
            action: "create",
            visible: false,
      });

      useEffect(() => {
            dispatch(getAllIns());
      }, [dispatch]);

      const toggleFormVisibility = () => {
            setFormVisibleAndAction({
                  action: "create",
                  visible: !FormVisibleAndAction,
            });
      };

      let form = (
            <InstallationForm
                  title={"Add New Installation"}
                  closeHandler={toggleFormVisibility}
                  confirmHandler={createOne}
                  getAll={getAllIns}
                  formAction={FormVisibleAndAction.action}
            />
      );

      if (FormVisibleAndAction.action === "view") {
            form = (
                  <InstallationForm
                        title={"View Installation Details"}
                        closeHandler={toggleFormVisibility}
                        selected={selectedInstallation}
                        confirmHandler={createOne}
                        formAction={FormVisibleAndAction.action}
                  />
            );
      }

      if (FormVisibleAndAction.action === "edit") {
            form = (
                  <InstallationForm
                        title={"Edit Installation"}
                        closeHandler={toggleFormVisibility}
                        selected={selectedInstallation}
                        confirmHandler={updateOneIns}
                        getAll={getAllIns}
                        formAction={FormVisibleAndAction.action}
                  />
            );
      }

      return (
            <div>
                  <Header
                        label={"Installations"}
                        confirmHandler={createOne}
                        setAction={setFormVisibleAndAction}
                  />
                  {FormVisibleAndAction.visible && form && <div>{form}</div>}
                  <main className="flex justify-center items-center">
                        {installations && (
                              <TableComponent
                                    columns={coulmns}
                                    rows={installations}
                                    openForm={setFormVisibleAndAction}
                                    formName="installations"
                              />
                        )}
                  </main>
            </div>
      );
};

export default Installations;
