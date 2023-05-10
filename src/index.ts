import { v4 as uuid } from "uuid";

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const h1 = document.querySelector("#h1");

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createAt: Date;
};

const tasks: Task[] = loadTask();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuid(),
    title: input.value,
    completed: false,
    createAt: new Date(),
  };

  tasks.push(newTask);
  saveTask();

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTask();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTask() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
