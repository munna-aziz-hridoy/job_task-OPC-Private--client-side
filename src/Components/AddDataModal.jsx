import React from "react";
import { useForm } from "react-hook-form";

const AddDataModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddData = (inputData) => {
    console.log(inputData);
  };

  return (
    <div>
      <input type="checkbox" id="addDataModal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box bg-white">
          <label
            for="addDataModal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            X
          </label>
          <h3 class="font-bold text-lg text-center">Add Data</h3>
          <form
            onSubmit={handleSubmit(handleAddData)}
            className="p-4 my-6 w-full"
          >
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name Here"
              {...register("name", { required: "Please enter a name" })}
              class="input bg-transparent shadow w-full "
            />
            {errors.name && (
              <p className="text-red-300 text-xs my-2">
                {errors?.name.message}
              </p>
            )}
            <label class="label">
              <span class="label-text">Email</span>
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
              class="input bg-transparent shadow  w-full "
            />
            {errors.email && (
              <p className="text-red-300 text-xs my-2">
                {errors?.email.message}
              </p>
            )}
            <label class="label">
              <span class="label-text">Phone</span>
            </label>
            <input
              type="number"
              {...register("phone", {
                required: "Please enter a phone number",
              })}
              placeholder="Phone Here"
              class="input bg-transparent shadow  w-full "
            />
            {errors.phone && (
              <p className="text-red-300 text-xs my-2">
                {errors?.phone.message}
              </p>
            )}
            <label class="label">
              <span class="label-text">Hobbies</span>
            </label>
            <input
              type="text"
              {...register("hobbies", { required: "What is your hobbies?" })}
              placeholder="Hobbies"
              class="input bg-transparent shadow  w-full "
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
