import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import ClinetHeader from "../../components/ClinetHeader";
import { useEffect, useState } from "react";
import { getAllClients, createOneClient, updateOneClient } from "./../../actions/clients";
import TableComponent from "../../components/UI/Table";
import ClientForm from "../../components/UI/client-form/ClientForm";

const coulmns = [
      {
            id: "name",
            label: "Name",
            minWidth: 170,
            align: "center",
      },
      {
            id: "email",
            label: "E-mail",
            minWidth: 170,
            align: "center",
      },
      {
            id: "phone",
            label: "Phone",
            minWidth: 170,
            align: "center",
      },
      {
            id: "fax",
            label: "Fax",
            minWidth: 170,
            align: "center",
      },
      {
            id: "address",
            label: "Address",
            minWidth: 170,
            align: "center",
      },
      {
            id: "parentClient",
            label: "Parent Client",
            minWidth: 170,
            align: "center",
      },
      {
            id: "country",
            label: "Country",
            minWidth: 170,
            align: "center",
      },
];

const Standards = () => {
      const dispatch = useDispatch();
      const clients = useSelector((state) => state.clients);
      const selectedClient = useSelector((state) => state.select);

      const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
            action: "create",
            visible: false,
      });

      useEffect(() => {
            dispatch(getAllClients());
      }, [dispatch]);

      const toggleFormVisibility = () => {
            setFormVisibleAndAction({
                  action: "create",
                  visible: !FormVisibleAndAction,
            });
      };

      let form = (
            <ClientForm
                  title={"Add New Client"}
                  closeHandler={toggleFormVisibility}
                  confirmHandler={createOneClient}
                  getAll={getAllClients}
                  formAction={FormVisibleAndAction.action}
            />
      );

      if (FormVisibleAndAction.action === "view") {
            form = (
                  <ClientForm
                        title={"View Client Details"}
                        closeHandler={toggleFormVisibility}
                        selected={selectedClient}
                        confirmHandler={createOneClient}
                        formAction={FormVisibleAndAction.action}
                  />
            );
      }

      if (FormVisibleAndAction.action === "edit") {
            form = (
                  <ClientForm
                        title={"Edit Client"}
                        closeHandler={toggleFormVisibility}
                        selected={selectedClient}
                        confirmHandler={updateOneClient}
                        getAll={getAllClients}
                        formAction={FormVisibleAndAction.action}
                  />
            );
      }

      return (
            <div>
                  <ClinetHeader
                        label={"Clients"}
                        confirmHandler={createOneClient}
                        setAction={setFormVisibleAndAction}
                  />
                  {FormVisibleAndAction.visible && form && <div>{form}</div>}
                  <main className="flex justify-center items-center">
                        {clients && (
                              <TableComponent
                                    columns={coulmns}
                                    rows={clients}
                                    openForm={setFormVisibleAndAction}
                                    formName="clients"
                              />
                        )}
                  </main>
            </div>
      );
};

export default Standards;
