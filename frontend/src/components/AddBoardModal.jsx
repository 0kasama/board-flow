"use client";

import { useState } from "react";
import { createBoard } from "@/fetch/board";

export default function AddBoardModal({ fetchBoards }) {
  const [title, setTitle] = useState("");

  const handleAddModal = () => {
    document.getElementById("addBoard").showModal();
  };

  const handleCreate = async () => {
    const data = {
      title,
    };

    try {
      const response = await createBoard(data);
      fetchBoards();
      document.getElementById("addBoard").close();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <div className='w-1/2 mb-5'>
      <button
        className='btn btn-active btn-success w-full'
        onClick={handleAddModal}
      >
        Add New Board
      </button>

      <dialog id='addBoard' className='modal modal-middle sm:modal-middle'>
        <div className='modal-box flex flex-col items-center gap-2'>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text text-lg font-medium'>Title</span>
            </div>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter board title'
              className='input input-bordered input-info w-full max-w-xs'
            />
          </label>

          <div className='w-full modal-action justify-center'>
            <button className='btn btn-success w-1/2' onClick={handleCreate}>
              Add Board
            </button>
            <button
              className='btn w-1/2'
              onClick={() => document.getElementById("addBoard").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
