import React, { useEffect } from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import {
  updateProfileAPI,
  getProfileAPI,
} from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  // ================= FETCH PROFILE =================
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
  });

  // ================= UPDATE PROFILE =================
  const {
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateProfileAPI,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profile?.email || "",
      username: profile?.username || "",
    },
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-6xl" />
            <div>
              <h2 className="text-2xl font-bold">{profile?.username}</h2>
              <p className="text-sm opacity-90">{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Update Profile
          </h3>

          {/* Alerts */}
          {isPending && (
            <AlertMessage type="loading" message="Updating profile..." />
          )}
          {isError && (
            <AlertMessage
              type="error"
              message={error?.response?.data?.message}
            />
          )}
          {isSuccess && (
            <AlertMessage type="success" message="Profile updated successfully" />
          )}

          {/* FORM */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* USERNAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 flex items-center gap-3">
                <FaUserCircle className="text-xl text-gray-400" />
                <input
                  {...formik.getFieldProps("username")}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 flex items-center gap-3">
                <FaEnvelope className="text-xl text-gray-400" />
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* SAVE */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* PASSWORD SECTION */}
      <div className="max-w-4xl mx-auto mt-6">
        <UpdatePassword />
      </div>
    </>
  );
};

export default UserProfile;
