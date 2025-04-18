import React, { useEffect, useState } from "react";
import Header from "./Main/Header";
import Task from "./Main/Task";
import TaskModal from "./Main/TaskModal";
import { getTaskList, getToken } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [tasklist, setTasklist] = useState([]);
  const [refereshList, setrefereshList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [filteredList, setSetFilteredList] = useState([]);
  console.log(tasklist, filteredList);

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
    getAlltask();
  }, [refereshList]);

  useEffect(() => {
    if (searchText === "") {
      setSetFilteredList(tasklist);
    } else {
      const filterlist = tasklist.filter((task) =>
        task.desc.toLowerCase().includes(searchText.toLocaleLowerCase().trim())
      );
      setSetFilteredList(filterlist);
    }
  });

  const getAlltask = async () => {
    try {
      const result = await getTaskList();
      console.log("Tasklist ", result);

      if (result.status === 200 && result.data.status === 200) {
        const tasks = result.data.data.tasks;
        setTasklist(tasks.reverse());
      } else {
        console.error(
          "Received a non-200 status or data status:",
          result.status
        );
      }
    } catch (error) {
      console.error("Error while fetching tasks:", error);
    }
  };

  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} />

      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {filteredList?.map((task) => {
            return (
              <Task
                task={task}
                key={task._id}
                setrefereshList={setrefereshList}
              />
            );
          })}

          {filteredList.length === 0 && (
            <div className="notFoundTasks">No tasks Found</div>
          )}
        </div>
      </div>

      <div style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal" // Corrected modal ID
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>

      <TaskModal setrefereshList={setrefereshList} />
    </>
  );
};

export default Home;
