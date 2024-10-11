document.addEventListener("DOMContentLoaded", () => {
	const todoItems = document.getElementsByClassName("todo-item");
	const nbTodos = document.querySelector(".items-left");
	const todoInput = document.querySelector("#new-todo-input");
	const todoList = document.querySelector(".todo-list");

	todoInput.addEventListener("keypress", (e) => {
		if (e.key === "Enter" && todoInput.value.trim() !== "") {
			const newTodo = document.createElement("li");
			newTodo.draggable = true;
			newTodo.classList.add("todo-item");
			newTodo.innerHTML = `
                <input type="checkbox" class="todo-checkbox" />
                <span class="todo-text">${todoInput.value}</span>
                <button class="delete-btn">
					<img src="./images/icon-cross.svg" alt="delete todo" />
				</button>
            `;
			todoList.appendChild(newTodo);
			todoInput.value = "";

			if (todoItems.length === 1) {
				nbTodos.textContent = "1 item left";
			} else if (todoItems.length === 0) {
				nbTodos.textContent = "No items left";
			} else {
				nbTodos.textContent = `${todoItems.length} items left`;
			}
		}
	});

	todoList.addEventListener("click", (e) => {
		if (e.target.parentElement.classList.contains("delete-btn")) {
			e.target.parentElement.parentElement.remove();

			if (todoItems.length === 1) {
				nbTodos.textContent = "1 item left";
			} else if (todoItems.length === 0) {
				nbTodos.textContent = "No items left";
			} else {
				nbTodos.textContent = `${todoItems.length} items left`;
			}
		}
	});
});
