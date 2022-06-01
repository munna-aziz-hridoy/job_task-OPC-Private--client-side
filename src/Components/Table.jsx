import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import AddDataModal from "./AddDataModal";
import { useQuery } from "react-query";
import Spinner from "./Spinner";
import UpdateDataModal from "./UpdateDataModal";
import { toast } from "react-toastify";

const Table = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openAddDataModal, setOpenAddDataModal] = useState(false);
  const [openUpdateDataModal, setOpenUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { data, isLoading, refetch } = useQuery("users", () => {
    return fetch("http://localhost:5000/allUser").then((res) => res.json());
  });

  if (isLoading) {
    return <Spinner />;
  }

  const handleSelectUser = (event, id) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, id]);
    }
    if (!event.target.checked) {
      const restUser = selectedUsers.filter((userId) => userId !== id);
      setSelectedUsers(restUser);
    }
  };

  const handleSendEmail = async () => {
    const res = await fetch("http://localhost:5000/sendEmail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ids: selectedUsers }),
    });
    const data = await res.json();
    if (data?.success) {
      toast.success("Successfully sent data to the email ");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (!confirmDelete) return;
    const url = `http://localhost:5000/deleteUser?id=${id}`;
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();

    refetch();
    if (data?.success) {
      toast.error("Successfully remove data");
    }
  };

  const handleUpdateUser = (id) => {
    setOpenUpdateModal(true);
    setSelectedId(id);
  };

  return (
    <>
      <div className="flex justify-end items-center my-5">
        <label
          htmlFor="addDataModal"
          onClick={() => setOpenAddDataModal(true)}
          className="btn btn-outline  flex justify-center items-center gap-2 border-2 rounded-lg shadow-lg hover:text-white px-4"
        >
          <FontAwesomeIcon className="text-2xl" icon={faPlusSquare} />
          <span>add</span>
        </label>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-10"></th>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user, index) => {
              const { _id, name, email, hobbies, phone } = user;
              return (
                <tr key={_id}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(event) => handleSelectUser(event, _id)}
                      />
                    </label>
                  </th>
                  <td className="font-bold">{index + 1}</td>
                  <td>
                    <p className="font-bold">{name}</p>
                  </td>
                  <td>
                    <p>{phone}</p>
                  </td>
                  <td>
                    <p>{email}</p>
                  </td>
                  <td>
                    <p>{hobbies}</p>
                  </td>
                  <th>
                    <div className="flex justify-center items-center gap-2">
                      <label
                        htmlFor="updateDataModal"
                        onClick={() => handleUpdateUser(_id)}
                        className="btn btn-xs bg-green-700 border-green-700 text-slate-100"
                      >
                        Update
                      </label>
                      <button
                        onClick={() => handleDeleteUser(_id)}
                        className="btn btn-xs bg-red-700 border-red-700 text-slate-100"
                      >
                        delete
                      </button>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-10">
        <button
          onClick={handleSendEmail}
          className="btn btn-outline  flex justify-center items-center gap-2 border-2 rounded-lg shadow-lg hover:text-white px-4"
        >
          <FontAwesomeIcon className="text-2xl" icon={faPaperPlane} />
          <span>send information</span>
        </button>
      </div>
      {openAddDataModal && (
        <AddDataModal refetch={refetch} setOpenModal={setOpenAddDataModal} />
      )}

      {openUpdateDataModal && (
        <UpdateDataModal
          refetch={refetch}
          setOpenModal={setOpenUpdateModal}
          selectedId={selectedId}
        />
      )}
    </>
  );
};

export default Table;
