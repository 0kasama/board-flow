"use client";

import { findUser, updateUser } from "@/fetch/user";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await findUser();
        if (userData) {
          setUser(userData.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (e) => setName(e.target.value);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleEditModal = (user) => {
    setName(user.name);
    setEmail(user.email);
    document.getElementById("editUser").showModal();
  };

  const handleEditUser = async () => {
    const data = {
      name,
      email,
    };

    if (password) {
      data.password = password;
    }

    try {
      await updateUser(data);
      document.getElementById("editUser").close();
    } catch (err) {
      console.error("Error updating user data", err);
    }
  };

  return (
    <div className='flex w-full h-screen flex-col justify-center items-center'>
      {user && (
        <div key={user.id}>
          <div className='relative card bg-neutral text-neutral-content w-96'>
            <div className='card-body items-between text-center'>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
            <div className='absolute top-3 right-3'>
              <button
                onClick={() => handleEditModal(user)}
                className='btn btn-ghost btn-sm btn-circle'
              >
                <Pencil size={18} />
              </button>
            </div>
          </div>
          <dialog id='editUser' className='modal modal-middle sm:modal-middle'>
            <div className='modal-box flex flex-col items-center gap-2'>
              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text text-lg font-medium'>Name</span>
                </div>
                <input
                  type='text'
                  value={name}
                  onChange={handleNameChange}
                  placeholder='Enter your name'
                  className='input input-bordered input-info w-full max-w-xs'
                />
              </label>

              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text text-lg font-medium'>Email</span>
                </div>
                <input
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='Enter your email'
                  className='input input-bordered input-info w-full max-w-xs'
                />
              </label>

              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text text-lg font-medium'>
                    Password
                  </span>
                </div>
                <input
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Enter your password'
                  className='input input-bordered input-info w-full max-w-xs'
                />
              </label>

              <div className='modal-action justify-center'>
                <button className='btn btn-info' onClick={handleEditUser}>
                  Save Changes
                </button>
                <button
                  className='btn'
                  onClick={() => document.getElementById("editUser").close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
}
