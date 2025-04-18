import React, { useState } from 'react'
import {
    ToastContainer,
    toast
} from 'react-toastify'
import { addtask } from '../../services/api.js';
const TaskModal = ({ setrefereshList }) => {

    const [taskdesc, setTaskdesc] = useState('');


    const hanldeAddTask = async () => {
        console.log(taskdesc);
        if (taskdesc === '') {
            toast("Task is required")
        }

        try {
            const result = await addtask({ desc: taskdesc });


            if (result.status === 200) {
                toast("task Added");
                setrefereshList(new Date());
                setTaskdesc('');
            } else {
                toast(result.data.message);
            }
        } catch (error) {
            if (error.response) {

                console.error('Server responded with error:', error.response.status, error.response.data);
            } else if (error.request) {

                console.error('No response received:', error.request);
            } else {

                console.error('Error:', error.message);
            }
        }

    }

    
    return (
        <div className="modal mt-5" id='exampleModal'>
            <ToastContainer />
            <div className="modal-dialog" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <span arial-hidden="true"></span>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <textarea
                                name=""
                                className='form-control'
                                placeholder='write tasks...'
                                rows={3}
                                onChange={(e) => setTaskdesc(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-secondary'
                            onClick={hanldeAddTask} data-bs-dismiss="modal"
                        >Save Task</button>
                        <button className='btn btn-secondary'
                            onClick={() => { setTaskdesc('') }} data-bs-dismiss="modal">Close Task</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskModal