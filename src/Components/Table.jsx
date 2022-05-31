import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import AddDataModal from "./AddDataModal";
import { useQuery } from "react-query";
import Spinner from "./Spinner";
import UpdateDataModal from "./UpdateDataModal";

const Table = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openAddDataModal, setOpenAddDataModal] = useState(false);
  const [openUpdateDataModal, setOpenUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () => {
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
    console.log(data);
  };

  const handleDeleteUser = async (id) => {
    const url = `http://localhost:5000/deleteUser?id=${id}`;
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();
    console.log(data);
    refetch();
  };

  const handleUpdateUser = (id) => {
    setOpenUpdateModal(true);
    setSelectedId(id);
  };

  return (
    <>
      <div className="flex justify-end items-center my-5">
        <label
          for="addDataModal"
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
            {users?.map((user, index) => {
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
