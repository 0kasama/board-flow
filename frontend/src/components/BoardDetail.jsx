"use client";

import { useState, useEffect } from "react";
import { findBoard } from "@/fetch/board";
import { createList } from "@/fetch/list";
import ListCard from "./ListCard";

export default function BoardDetail({ slug }) {
  const [board, setBoard] = useState("");
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardData = await findBoard(slug);
        if (boardData && boardData.board) {
          setBoard(boardData.board);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [slug]);

  const handleAddListModal = () => {
    document.getElementById("addList").showModal();
  };

  const handleCreateList = async () => {
    const data = {
      boardId: board.id,
      title: listTitle,
    };

    try {
      const response = await createList(data);
      if (response && response.list) {
        document.getElementById("addList").close();
        setListTitle("");
      }
    } catch (err) {
      console.error("Error creating list:", err);
    }
  };

  return (
    <div className='flex flex-col mt-10'>
      {board && (
        <div key={board.id} className='text-center mb-5'>
          <h2 className='font-bold border-b border-slate-500 text-3xl pb-2 mb-2'>
            {board.title}
          </h2>
          <button
            className='btn btn-neutral w-1/2 lg:w-1/4'
            onClick={handleAddListModal}
          >
            Add New Section
          </button>

          <dialog id='addList' className='modal modal-middle sm:modal-middle'>
            <div className='modal-box flex flex-col items-center gap-2'>
              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text text-lg font-medium'>Title</span>
                </div>
                <input
                  type='text'
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                  placeholder='Enter section title'
                  className='input input-bordered input-info w-full max-w-xs'
                />
              </label>

              <div className='w-full modal-action justify-center'>
                <button
                  className='btn btn-success w-1/2'
                  onClick={handleCreateList}
                >
                  Add Section
                </button>
                <button
                  className='btn w-1/2'
                  onClick={() => {
                    document.getElementById("addList").close();
                    setListTitle("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
      <ListCard boardId={board.id} />
    </div>
  );
}
