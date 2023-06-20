import React, { useState } from "react";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function TaskAssignment() {
  // array of teams and its members
  const [teams, setTeams] = useState([
    {
      name: "Team1",
      members: [
        {
          member: "M1-Scott",
          priority: 2,
          currentIndex: 0,
        },
        { member: "M2-Dean", priority: 1, currentIndex: 0 },
        {
          member: "M3-Tom",
          priority: 3,
          currentIndex: 0,
        },
      ],
    },
    {
      name: "Team2",
      members: [
        {
          member: "M1-Roy",
          priority: 1,
          currentIndex: 0,
        },
        { member: "M2-Raven", priority: 2, currentIndex: 0 },
        {
          member: "M3-Greg",
          priority: 3,
          currentIndex: 0,
        },
      ],
    },
  ]);
  // task assingment array w.r.t its team
  const [task, setTask] = useState([]);

  // task name or title
  const [taskName, setTaskName] = useState("");
  // selected team by user
  const [selectedTeam, setSelectedTeam] = useState("");

  const updateItemName = (team_name, member_name, updated_index) => {
    const teamIndex = teams.findIndex((team) => team.name === team_name);

    if (teamIndex !== -1) {
      // Update the name of the team
      const updatedTeams = [...teams];
      updatedTeams[teamIndex].name = team_name;

      // Update the value of "currentIndex" for the member with name "updated_index"
      const memberIndex = updatedTeams[teamIndex].members.findIndex(
        (member) => member.member === member_name
      );
      if (memberIndex !== -1) {
        updatedTeams[teamIndex].members[memberIndex].currentIndex =
          updated_index;
      }

      // Update the state with the modified array
      setTeams(updatedTeams);
    }
  };

  function addTask(team_name, task_title) {
    console.log(team_name)
    let team = teams.find((element) => {
      if (element.name === team_name) {
        return element;
      }
    });
    let members = team.members.sort((a, b) => b.priority - a.priority);
    // sort according to priorities of the team members
    let selected_member = members.reduce((prev, curr) =>
      prev.currentIndex < curr.currentIndex ? prev : curr
    );

    if (team_name.length > 0 && task_title.length) {
      setTask([
        ...task,
        { name: team_name, task: task_title, member: selected_member.member },
      ]);
      updateItemName(
        team.name,
        selected_member.member,
        selected_member.currentIndex + 1
      );
      alert(`Task Assigned To ${team_name} and task ${task_title}`);
    } else {
      alert("Invalid Inputs! Enter valid inputs.");
    }
    setTaskName("");
    setSelectedTeam("");
  }

  return (
    <Card className="Task_card">
      <h1> Task and Team Management</h1>
      <br></br>
      <br></br>
      <h3>Enter the task:</h3>
      <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <br></br>
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">Select Team</option>
        {teams &&
          teams.map((team, index) => (
            <option key={index} value={team.name}>
              {team.name}
            </option>
          ))}
      </select>
      <br></br>
      <br></br>
      <Button onClick={() => addTask(selectedTeam, taskName)}>
        Assign Task To Team
      </Button>
      <br></br>
      <br></br>
      {task && (
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Team Name</th>
              <th>Team Task</th>
              <th>Member Name</th>
            </tr>
          </thead>
          <tbody>
            {task.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.task}</td>
                <td>{item.member}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export default TaskAssignment;