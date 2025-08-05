import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTasks from "../components/Dashboard/AddTasks";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import axios from "axios";
import EditTask from "../components/Dashboard/EditTask";

function Dashboard() {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [Tasks, setTasks] = useState([]);
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
  const [EditTaskId, setEditTaskId] = useState();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/userDetails",
          { withCredentials: true }
        );
        console.log(res.data.tasks);
        setTasks(res.data.tasks);
      } catch (error) {}
    };
    fetchUserDetails();
    if (window.sessionStorage.getItem("editTaskId")) {
      setEditTaskDiv("block");
      console.log(window.sessionStorage.getItem("editTaskId"));
      setEditTaskId(window.sessionStorage.getItem("editTaskId"));
    }
  }, [AddTaskDiv]);
  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv}></Header>
      </div>

      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h-auto">
        <div className="w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            {Tasks[0]?.yetToStart && <YetToStart task={Tasks[0].yetToStart} />}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
            {Tasks[1]?.inProgress && <InProgress task={Tasks[1].inProgress} />}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
            {Tasks[2]?.completed && <Completed task={Tasks[2].completed} />}
          </div>
        </div>
      </div>

      <div
        className={`w-full ${AddTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <AddTasks setAddTaskDiv={setAddTaskDiv}></AddTasks>
      </div>
      <div
        className={`w-full ${EditTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <EditTask
          EditTaskId={EditTaskId}
          setEditTaskDiv={setEditTaskDiv}
        ></EditTask>
      </div>
    </div>
  );
}

export default Dashboard;
