let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);

  const list = document.querySelector(".js-todo-list");
  list.insertAdjacentHTML(
    "beforeend",
    `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `
  );
}

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);
  if (todoItems[index].checked) {
    item.classList.add("done");
  } else {
    item.classList.remove("done");
  }
}

function deleteTodo(key) {
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();

  const output = document.getElementById("ideaOutput");
  const list = document.querySelector(".js-todo-list");
  if (todoItems.length === 0) {
    output.innerHTML = "";
    list.innerHTML = "";
  }
}

const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

const randomBTN = document.getElementById("randomIdea");
let output = document.getElementById("ideaOutput");
randomBTN.addEventListener("click", newMessage);

/*
//calculates random idea, filters for done marks
function newMessage() {
  if (todoItems.length === 0) {
    output.innerText = "You need to add some ideas first.";
  } else {
    let undone = todoItems.filter((item) => item.checked !== true);
    console.log(undone);
    if (undone === 0) {
      //let mess = document.getElementById("ideasOutput");
      //output.innerText = `You've done everything! Add more ideas and keep going!`;
    } else {
      let randomItem = undone[Math.floor(Math.random() * undone.length)];
      output.innerText = `I think you should get up and ${randomItem.text}.`;
    }
  }
}
*/

function newMessage() {
  if (todoItems.length === 0) {
    output.innerText = "You need to add some ideas first.";
  }
  let undone = todoItems.filter((item) => item.checked !== true);
  if (undone.length === 0) {
    output.innerText = `You've done everything! Great work! Add more ideas and keep going!`;
  } else {
    let randomItem = undone[Math.floor(Math.random() * undone.length)];
    output.innerText = `I think you should get up and ${randomItem.text}.`;
  }
}
