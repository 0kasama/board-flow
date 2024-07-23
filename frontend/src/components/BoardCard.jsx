"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { findAllBoards, updateBoard, destroyBoard } from "@/fetch/board";
import { findUser } from "@/fetch/user";
import AddBoardModal from "./AddBoardModal";
import Link from "next/link";

export default function BoardCard() {
  const [user, setUser] = useState("");
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const [boardIdToDelete, setBoardIdToDelete] = useState("");
  const [boardToEdit, setBoardToEdit] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await findUser();
        if (userData) {
          setUser(userData.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await findAllBoards();
      if (data && data.boards) {
        setBoards(data.boards);
      }
    } catch (err) {
      console.error("Error fetching boards", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleConfirmModal = (boardId) => {
    setBoardIdToDelete(boardId);
    document.getElementById("deleteBoard").showModal();
  };

  const handleDelete = async () => {
    try {
      await destroyBoard(boardIdToDelete);
      setBoards(boards.filter((board) => board.id !== boardIdToDelete));
      setBoardIdToDelete("");
      document.getElementById("deleteBoard").close();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const handleEditModal = (board) => {
    setBoardToEdit(board);
    setTitle(board.title);
    document.getElementById("editBoard").showModal();
  };

  const handleUpdate = async () => {
    if (!boardToEdit) return;

    const data = {
      id: boardToEdit.id,
      title,
    };

    try {
      await updateBoard(boardToEdit.id, data);
      fetchBoards();
      document.getElementById("editBoard").close();
      setBoardToEdit();
      setTitle("");
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <AddBoardModal fetchBoards={fetchBoards} />
      <div className='flex flex-col flex-wrap md:flex-row gap-4 justify-center items-center'>
        {boards.map((board) => (
          <div
            key={board.id}
            className='card bg-info text-info-content w-80 h-32 shadow-xl relative justify-center items-center'
          >
            <Link href={`/board/${board.slug}`}>
              <div className='card-body justify-center items-center'>
                <h2 className='card-title text-3xl'>{board.title}</h2>
              </div>
            </Link>

            {user && user.id === board.userId && (
              <div className='absolute top-1 right-1'>
                <button
                  className='btn btn-ghost btn-sm btn-circle'
                  onClick={() => handleEditModal(board)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleConfirmModal(board.id)}
                  className='btn btn-ghost btn-sm btn-circle'
                >
                  <Trash2 color='red' size={16} />
                </button>
              </div>
            )}
          </div>
        ))}

        <dialog id='deleteBoard' className='modal modal-middle sm:modal-middle'>
          <div className='modal-box flex flex-col items-center gap-2'>
            <p>Are you sure you want to delete this board? </p>
            <div className='modal-action justify-center'>
              <button className='btn btn-error' onClick={handleDelete}>
                Confirm
              </button>
              <button
                className='btn'
                onClick={() => document.getElementById("deleteBoard").close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>

        <dialog id='editBoard' className='modal modal-middle sm:modal-middle'>
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
              <button className='btn btn-success w-1/2' onClick={handleUpdate}>
                Save Changes
              </button>
              <button
                className='btn w-1/2'
                onClick={() => {
                  setBoardToEdit();
                  document.getElementById("editBoard").close();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
