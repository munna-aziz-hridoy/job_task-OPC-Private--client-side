import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import AddDataModal from "./AddDataModal";
import { useQuery } from "react-query";
import Spinner from "./Spinner";

const Table = () => {
  const { data: users, isLoading } = useQuery("users", () => {
    return fetch("http://localhost:5000/allUser").then((res) => res.json());
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex justify-end items-center my-5">
        <label
          for="addDataModal"
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
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>{index + 1}</td>
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
                      <button className="btn btn-xs bg-green-700 border-green-700 text-slate-100">
                        Update
                      </button>
                      <button className="btn btn-xs bg-red-700 border-red-700 text-slate-100">
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
        <button className="btn btn-outline  flex justify-center items-center gap-2 border-2 rounded-lg shadow-lg hover:text-white px-4">
          <FontAwesomeIcon className="text-2xl" icon={faPaperPlane} />
          <span>send information</span>
        </button>
      </div>
      <AddDataModal />
    </>
  );
};

export default Table;
