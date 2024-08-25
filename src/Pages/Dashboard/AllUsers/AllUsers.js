import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [search, setSearchTerm] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_API}/users`);
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_API}/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin successful.");
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-center m-3 bg-blue-900 rounded text-white">
        All Users
      </h2>
      {/* search bar  */}
      <div className="flex items-center justify-center mb-8 m-3">
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by name or email"
          required
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>User Role</th>
            </tr>
          </thead>
          <tbody>
            {users
              ?.filter((user) => {
                return search.toLowerCase() === ""
                  ? user
                  : user.name.includes(search.toLowerCase()) ||
                      user?.email === search;
              })
              .map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user?.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className={`${
                        user?.role === "admin"
                          ? `bg-green-500 text-white rounded-sm p-1 w-20`
                          : user?.role === "doctor"
                          ? `bg-blue-900 text-white rounded-sm p-1 w-20`
                          : `bg-amber-500 text-white rounded-sm p-1 w-20`
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
