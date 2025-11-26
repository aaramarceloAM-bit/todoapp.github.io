let tasks = [];

const taskInput = document.getElementById("task-input");
const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-btn");
const noTasksMsg = document.getElementById("no-tasks-msg");

function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    noTasksMsg.style.display = "block";
    clearBtn.style.display = "none";
  } else {
    noTasksMsg.style.display = "none";
    clearBtn.style.display = "block";
    tasks.forEach((task, idx) => {
      const li = document.createElement("li");
      li.className = "todo-item" + (task.completed ? " completed" : "");


      const checkBtn = document.createElement("span");
      checkBtn.className = "todo-check" + (task.completed ? " checked" : "");
      checkBtn.onclick = () => {
        task.completed = !task.completed;
        renderTasks();
      };


      const span = document.createElement("span");
      span.className = "flex-1 cursor-pointer select-none";
      span.textContent = task.text;


      const delBtn = document.createElement("button");
      delBtn.className = "todo-delete";
      delBtn.innerHTML = "&#128465;";
      delBtn.title = "Delete";
      delBtn.onclick = () => {
        tasks.splice(idx, 1);
        renderTasks();
      };

      li.appendChild(checkBtn);
      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }
}

todoForm.onsubmit = (e) => {
  e.preventDefault();
  const val = taskInput.value.trim();
  if (val) {
    tasks.push({ text: val, completed: false });
    taskInput.value = "";
    renderTasks();
  }
};
clearBtn.onclick = () => { tasks = []; renderTasks(); };
renderTasks();
