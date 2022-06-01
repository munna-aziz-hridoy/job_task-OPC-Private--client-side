import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddDataModal = ({ refetch, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddData = async (inputData) => {
    const res = await fetch(
      "https://evening-peak-26972.herokuapp.com/addUser",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputData),
      }
    );
    const data = await res.json();
    if (!data?.success) {
      return toast.error(data?.message);
    }
    setOpenModal(false);
    if (data?.success) {
      toast.success("Successfully added a new data");

      reset();
      refetch();
    }
  };

  return (
    <div>
      <input type="checkbox" id="addDataModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <label
            htmlFor="addDataModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            X
          </label>
          <h3 className="font-bold text-lg text-center">Add Data</h3>
          <form
            onSubmit={handleSubmit(handleAddData)}
            className="p-4 my-6 w-full"
          >
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name Here"
              {...register("name", { required: "Please enter a name" })}
              className="input bg-transparent shadow w-full "
            />
            {errors.name && (
              <p className="text-red-300 text-xs my-2">
                {errors?.name.message}
              </p>
            )}
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="Email Here"
              className="input bg-transparent shadow  w-full "
            />
            {errors.email && (
              <p className="text-red-300 text-xs my-2">
                {errors?.email.message}
              </p>
            )}
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="number"
              {...register("phone", {
                required: "Please enter a phone number",
              })}
              placeholder="Phone Here"
              className="input bg-transparent shadow  w-full "
            />
            {errors.phone && (
              <p className="text-red-300 text-xs my-2">
                {errors?.phone.message}
              </p>
            )}
            <label className="label">
              <span className="label-text">Hobbies</span>
            </label>
            <input
              type="text"
              {...register("hobbies", { required: "What is your hobbies?" })}
              placeholder="Hobbies"
              className="input bg-transparent shadow  w-full "
            />
            {errors.hobbies && (
              <p className="text-red-300 text-xs my-2">
                {errors?.hobbies.message}
              </p>
            )}
            <input
              type="submit"
              value="Save"
              className="btn btn-outline  flex justify-center items-center gap-2 border-2 rounded-lg shadow-lg hover:text-white px-8 my-4"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDataModal;
