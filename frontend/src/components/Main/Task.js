import React, { useState } from 'react'
import moment from 'moment/moment';
import { deleteTask, markReadTask } from '../../services/api.js';
import { toast } from 'react-toastify';
import './Task.css';

const Task = ({ task, setrefereshList }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handelDelete = async () => {
        try {
            setIsDeleting(true);
            const result = await deleteTask({
                task_id: task._id
            });

            if (result.data.status === 200) {
                setTimeout(() => {
                    setrefereshList(new Date());
                    toast("Deleted");
                }, 400);
            } else {
                setIsDeleting(false);
                toast("Failed to delete, please try again");
            }
        } catch (error) {
            setIsDeleting(false);
            if (error.response) {
                console.error("Server responded with:", error.response.status, error.response.data);
            }
        }
    };

    const handleMarkTask = async () => {
        try {
            const result = await markReadTask({
                task_id: task._id
            });

            if (result.data.status === 200) {
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                    setrefereshList(new Date());
                }, 600);
                toast("Task is Completed");
            } else {
                toast("Failed to complete, please try again");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server responded with:", error.response.status, error.response.data);
            }
        }
    };

    return (
        <div className={`task-card ${isAnimating ? 'task-complete-animation' : ''} ${isDeleting ? 'task-delete-animation' : ''}`}>
            <div className="task-header">
                <div className={`task-status ${task?.isCompleted ? 'completed' : ''}`}>
                    {task?.isCompleted ? "Completed" : "Not Completed"}
                </div>
            </div>
            <div className="task-body">
                <h5 className={`task-title ${task?.isCompleted ? 'completed' : ''}`}>
                    {task?.desc}
                </h5>
                <p className="task-date">{moment(task?.date).fromNow()}</p>
            </div>
            <div className="task-actions">
                <button 
                    className="task-button delete-button"
                    onClick={handelDelete}
                    disabled={isDeleting}
                >
                    Delete
                </button>
                <button
                    className={`task-button complete-button ${task?.isCompleted ? 'completed' : ''}`}
                    onClick={handleMarkTask}
                    disabled={task?.isCompleted || isDeleting}
                >
                    {task?.isCompleted ? "Completed" : "Mark Completed"}
                </button>
            </div>
        </div>
    );
};

export default Task;