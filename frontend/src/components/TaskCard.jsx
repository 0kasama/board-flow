"use client";

import { useState, useEffect } from "react";
import { findAllTasks, updateTask, destroyTask } from "@/fetch/task";
import {
  Clock,
  Pencil,
  Trash2,
  CircleArrowLeft,
  CircleArrowRight,
} from "lucide-react";
import dayjs from "dayjs";

export default function TaskCard({ listId, fetchLists }) {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState("");

  const fetchTasks = async () => {
    try {
      const taskData = await findAllTasks({ listId });
      if (taskData && taskData.tasks) {
        setTasks(taskData.tasks);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    if (listId) {
      fetchTasks();
    }
  }, [listId]);

  const handleEditTaskModal = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setCurrentTaskId(taskId);
      setTaskTitle(task.title);
      setTaskDescription(task.description || "");
      setTaskDueDate(
        task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD") : ""
      );
      document.getElementById(`editTask-${taskId}`).showModal();
    }
  };

  const handleUpdateTask = async () => {
    const data = {
      title: taskTitle,
      description: taskDescription || null,
      dueDate: taskDueDate || null,
    };

    try {
      const response = await updateTask(currentTaskId, data);
      if (response) {
        fetchTasks();
        document.getElementById(`editTask-${currentTaskId}`).close();
        setTaskTitle("");
        setTaskDescription("");
        setTaskDueDate("");
        setCurrentTaskId("");
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTaskModal = (taskId) => {
    setCurrentTaskId(taskId);
    document.getElementById(`deleteTask-${taskId}`).showModal();
  };

  const handleDeleteTask = async () => {
    try {
      await destroyTask(currentTaskId);
      fetchTasks();
      document.getElementById(`deleteTask-${currentTaskId}`).close();
      setCurrentTaskId("");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleTaskLeft = (currentTaskId, currentListId) => {
    const data = {
      listId: currentListId - 1,
    };

    updateTask(currentTaskId, data)
      .then(() => {
        fetchTasks();
        fetchLists();
      })
      .catch((err) => {
        console.error("Error updating task:", err);
      });
  };

  const handleTaskRight = (currentTaskId, currentListId) => {
    const data = {
      listId: currentListId + 1,
    };

    updateTask(currentTaskId, data)
      .then(() => {
        fetchTasks();
        fetchLists();
      })
      .catch((err) => {
        console.error("Error updating task:", err);
      });
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className='mb-2 min-w-80 p-2 bg-slate-800 text-white rounded-none'
        >
          <div className='flex flex-row justify-between items-center'>
            <p className='font-bold'>{task.title}</p>
            <div>
              <button className='btn btn-ghost btn-sm btn-circle'>
                <Pencil
                  size={16}
                  onClick={() => handleEditTaskModal(task.id)}
                />
              </button>
              <button className='btn btn-ghost btn-sm btn-circle'>
                <Trash2
                  color='red'
                  size={16}
                  onClick={() => handleDeleteTaskModal(task.id)}
                />
              </button>
            </div>
          </div>

          {task.dueDate && (
            <div className='flex flex-row items-center gap-2 mt-1 text-sm'>
              <Clock size={16} />
              {dayjs(task.dueDate).format("DD MMM YYYY")}
            </div>
          )}

          {task.description && (
            <div className='mt-1'>
              <p className='text-sm'>{task.description}</p>
            </div>
          )}

          <div className='flex justify-center'>
            <button
              className='btn btn-ghost btn-sm btn-circle'
              onClick={() => handleTaskLeft(task.id, task.listId)}
            >
              <CircleArrowLeft size={16} />
            </button>
            <button
              className='btn btn-ghost btn-sm btn-circle'
              onClick={() => handleTaskRight(task.id, task.listId)}
            >
              <CircleArrowRight size={16} />
            </button>
          </div>

          <dialog
            id={`editTask-${task.id}`}
            className='modal modal-middle sm:modal-middle'
          >
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
                  onClick={handleUpdateTask}
                >
                  Save Change
                </button>
                <button
                  className='btn w-1/2'
                  onClick={() => {
                    document.getElementById(`editTask-${task.id}`).close();
                    setTaskTitle("");
                    setTaskDescription("");
                    setTaskDueDate("");
                    setCurrentTaskId("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>

          <dialog
            id={`deleteTask-${task.id}`}
            className='modal modal-middle sm:modal-middle'
          >
            <div className='modal-box flex flex-col items-center gap-2'>
              <p>Are you sure you want to delete this task? </p>
              <div className='modal-action justify-center'>
                <button className='btn btn-error' onClick={handleDeleteTask}>
                  Confirm
                </button>
                <button
                  className='btn'
                  onClick={() => {
                    document.getElementById(`deleteTask-${task.id}`).close();
                    setCurrentTaskId("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </div>
      ))}
    </div>
  );
}
