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

	let draggedItem = null;

	// Load todos from localStorage
	function loadTodos() {
		const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
		savedTodos.forEach((todo) => {
			addTodoElement(todo.text, todo.completed);
		});
		updateItemsLeft();
	}

	function resetActiveFilter() {
		filter_all.classList.remove("active");
		filter_active.classList.remove("active");
		filter_completed.classList.remove("active");
	}

	// Save todos to localStorage
	function saveTodos() {
		const todos = Array.from(todoItems).map((todo) => ({
			text: todo.querySelector(".todo-text").textContent,
			completed: todo.querySelector(".todo-checkbox").checked,
		}));
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	// Add a new todo element
	function addTodoElement(text, completed = false) {
		const newTodo = document.createElement("li");
		newTodo.draggable = true;
		newTodo.classList.add("todo-item");
		newTodo.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${
				completed ? "checked" : ""
			} />
            <span class="todo-text ${
				completed ? "completed" : ""
			}">${text}</span>
            <button class="delete-btn">
				<img src="./images/icon-cross.svg" alt="delete todo" />
			</button>
        `;
		todoList.appendChild(newTodo);

		// Add event listener to the checkbox
		newTodo
			.querySelector(".todo-checkbox")
			.addEventListener("change", (e) => {
				e.target.nextElementSibling.classList.toggle(
					"completed",
					e.target.checked
				);
				updateItemsLeft();
				saveTodos();
			});

		// Add event listener drag and drop
		newTodo.addEventListener("dragstart", (e) => {
			draggedItem = newTodo;
			setTimeout(() => {
				newTodo.style.display = "none";
			}, 0);
		});

		newTodo.addEventListener("dragend", () => {
			setTimeout(() => {
				draggedItem.style.display = "flex";
				draggedItem = null;
				saveTodos(); // save the new order
			}, 0);
		});

		newTodo.addEventListener("dragover", (e) => {
			e.preventDefault();
		});

		newTodo.addEventListener("drop", () => {
			if (draggedItem !== newTodo) {
				todoList.insertBefore(draggedItem, newTodo);
			}
		});
	}

	// Update the number of items left
	function updateItemsLeft() {
		const itemsLeft = Array.from(todoItems).filter(
			(item) => !item.querySelector(".todo-checkbox").checked
		).length;
		nbTodos.textContent =
			itemsLeft === 1 ? "1 item left" : `${itemsLeft} items left`;
	}

	// Dark mode
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
			addTodoElement(todoInput.value);
			todoInput.value = "";
			updateItemsLeft();
			saveTodos();
		}
	});

	// Delete all todos
	clearCompleted.addEventListener("click", () => {
		Array.from(todoItems).forEach((todo) => {
			todo.remove();
		});
		updateItemsLeft();
		saveTodos();
	});

	// Display active todos
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

	// Display completed todos
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

	// Delete a specific todo
	todoList.addEventListener("click", (e) => {
		if (e.target.parentElement.classList.contains("delete-btn")) {
			e.target.parentElement.parentElement.remove();
			updateItemsLeft();
			saveTodos();
		}
	});

	// Load todos
	loadTodos();
});
