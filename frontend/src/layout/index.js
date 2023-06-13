import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import CompletedTaskList from "../components/CompletedTaskItem";
import CompletionRate from "../components/CompeltionRate";

const Layout = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completionRate, setCompletionRate] = useState([]);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  //fetching tasks which are completed

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/tasks/completed`
      );
      setCompletedTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  //fetching tasks which are completion rate

  const fetchCompletedTaskRate = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/tasks/completion-rate`
      );
      setCompletionRate(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Call fetchTasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  useEffect(() => {
    fetchCompletedTaskRate();
  }, []);

  // Function to handle task creation
  const onCreateTask = async (task) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        {
          task: task,
        }
      );
      const newTask = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  console.log(completedTasks);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <TaskForm onCreateTask={onCreateTask} />

      <h2 className="text-lg font-bold mt-8 mb-4">Todo Tasks</h2>
      <TaskList tasks={tasks} />

      <h2 className="text-lg font-bold mt-8 mb-4">Completed Tasks</h2>
      <CompletedTaskList tasks={completedTasks} />

      <CompletionRate tasks={completionRate} />
    </div>
  );
};

export default Layout;
