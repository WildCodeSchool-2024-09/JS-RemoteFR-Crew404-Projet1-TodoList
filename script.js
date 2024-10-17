document.addEventListener("DOMContentLoaded", () => {
	const todoItems = document.getElementsByClassName("todo-item");
	const nbTodos = document.querySelector(".items-left");
	const todoInput = document.querySelector("#new-todo-input");
	const todoList = document.querySelector(".todo-list");
	const filter_all = document.querySelector(".filter-all");
	const filter_active = document.querySelector(".filter-active");
	const filter_completed = document.querySelector(".filter-completed");
	const clearCompleted = document.querySelector(".clear-completed");
	const theme = document.querySelector("#theme");

	function resetActiveFilter() {
		filter_all.classList.remove("active");
		filter_active.classList.remove("active");
		filter_completed.classList.remove("active");
	}

	theme.addEventListener("click", () => {
		document.body.classList.toggle("dark-theme");
		if (document.body.classList.contains("dark-theme")) {
			document.querySelector("#icon").src = "./images/icon-sun.svg";
		} else {
			document.querySelector("#icon").src = "./images/icon-moon.svg";
		}
	});

	// Add new todo
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

	// Delete all todos
	clearCompleted.addEventListener("click", () => {
		Array.from(todoItems).forEach((todo) => {
			todo.remove();
			nbTodos.textContent = "No items left";
		});
	});

	// Display only completed todos
	filter_active.addEventListener("click", () => {
		Array.from(todoItems).forEach((todo) => {
			if (todo.querySelector(".todo-checkbox").checked) {
				todo.style.display = "none";
			} else {
				todo.style.display = "flex";
			}
		});
		resetActiveFilter();
		filter_active.classList.add("active");
	});

	// Display only active todos
	filter_completed.addEventListener("click", () => {
		Array.from(todoItems).forEach((todo) => {
			if (todo.querySelector(".todo-checkbox").checked) {
				todo.style.display = "flex";
			} else {
				todo.style.display = "none";
			}
		});
		resetActiveFilter();
		filter_completed.classList.add("active");
	});

	// Display all todos
	filter_all.addEventListener("click", () => {
		Array.from(todoItems).forEach((todo) => {
			todo.style.display = "flex";
		});
		resetActiveFilter();
		filter_all.classList.add("active");
	});

	// Remove todo
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
