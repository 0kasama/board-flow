"use client";

import { useState, useEffect } from "react";
import { findAllLists, updateList, destroyList } from "@/fetch/list";
import { createTask } from "@/fetch/task";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import TaskCard from "./TaskCard";

export default function ListCard({ boardId }) {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [currentListId, setCurrentListId] = useState("");

  const fetchLists = async () => {
    try {
      const listData = await findAllLists({ boardId });
      if (listData && listData.lists) {
        setLists(listData.lists);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    if (boardId) {
      fetchLists();
    }
  }, [boardId]);

  const handleAddTaskModal = (listId) => {
    setCurrentListId(listId);
    document.getElementById("addTask").showModal();
  };

  const handleCreateTask = async () => {
    const data = {
      listId: currentListId,
      title: taskTitle,
      description: taskDescription || null,
      dueDate: taskDueDate || null,
    };

    try {
      const response = await createTask(data);
      if (response && response.list) {
        document.getElementById("addTask").close();
        setTaskTitle("");
        setTaskDescription("");
        setTaskDueDate("");
        fetchLists();
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleEditListModal = (listId) => {
    const list = lists.find((list) => list.id === listId);
    if (list) {
      setCurrentListId(listId);
      setListTitle(list.title);
      document.getElementById("editList").showModal();
    }
  };

  const handleUpdateList = async () => {
    const data = {
      title: listTitle,
    };

    try {
      const response = await updateList(currentListId, data);
      if (response && response.list) {
        document.getElementById("editList").close();
        setListTitle("");
        fetchLists();
      }
    } catch (err) {
      console.error("Error updating list:", err);
    }
  };

  const handleDeleteListModal = (listId) => {
    setCurrentListId(listId);
    document.getElementById("deleteList").showModal();
  };

  const handleDeleteList = async () => {
    try {
      await destroyList(currentListId);
      setLists(lists.filter((list) => list.id !== currentListId));
      setCurrentListId("");
      document.getElementById("deleteList").close();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <div className='flex flex-wrap lg:flex-row flex-col gap-10 justify-center'>
      {lists.map((list) => (
        <div key={list.id}>
          <div className='border-b font-bold text-lg min-w-80 p-2 border-slate-500 rounded-none mb-2 relative'>
            {list.title}
            <div className='absolute right-2 top-2'>
              <button className='btn btn-ghost btn-sm btn-circle'>
                <CirclePlus
                  size={18}
                  onClick={() => handleAddTaskModal(list.id)}
                />
              </button>
              <button className='btn btn-ghost btn-sm btn-circle'>
                <Pencil
                  size={18}
                  onClick={() => handleEditListModal(list.id)}
                />
              </button>
              <button className='btn btn-ghost btn-sm btn-circle'>
                <Trash2
                  color='red'
                  size={18}
                  onClick={() => handleDeleteListModal(list.id)}
                />
              </button>
            </div>
          </div>

          <dialog id='addTask' className='modal modal-middle sm:modal-middle'>
            <div className='modal-box flex flex-col items-center gap-2'>
              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text text-lg font-medium'>Title</span>
                </div>
                <input
                  type='text'
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder='Enter task title'
                  className='input input-bordered input-info w-full max-w-xs'
                />
              </label>

              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text text-lg font-medium'>
                    Due Date
                  </span>
                </div>
                <input
                  type='date'
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  placeholder='Enter task due date'
                  className='input input-bordered input-info w-full max-w-xs'
                />
              </label>

              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text text-lg font-medium'>
                    Description
                  </span>
                </div>
                <input
                  type='text'
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder='Enter task description'
                  className='input input-bordered input-info w-full max-w-xs'
                />
              </label>

              <div className='w-full modal-action justify-center'>
                <button
                  className='btn btn-success w-1/2'
                  onClick={handleCreateTask}
                >
                  Add Task
                </button>
                <button
                  className='btn w-1/2'
                  onClick={() => {
                    document.getElementById("addTask").close();
                    setTaskTitle("");
                    setTaskDescription("");
                    setTaskDueDate("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>

          <dialog id='editList' className='modal modal-middle sm:modal-middle'>
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
                  onClick={handleUpdateList}
                >
                  Save Change
                </button>
                <button
                  className='btn w-1/2'
                  onClick={() => {
                    document.getElementById("editList").close();
                    setListTitle("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>

          <dialog
            id='deleteList'
            className='modal modal-middle sm:modal-middle'
          >
            <div className='modal-box flex flex-col items-center gap-2'>
              <p>Are you sure you want to delete this section? </p>
              <div className='modal-action justify-center'>
                <button className='btn btn-error' onClick={handleDeleteList}>
                  Confirm
                </button>
                <button
                  className='btn'
                  onClick={() => {
                    document.getElementById("deleteList").close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>

          <TaskCard listId={list.id} fetchLists={fetchLists} />
        </div>
      ))}
    </div>
  );
}
