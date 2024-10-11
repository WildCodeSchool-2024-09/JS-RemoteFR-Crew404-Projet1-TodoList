/**
 * Drag'n Drop !
 */

const todoList = document.querySelector(".todo-list");
let draggedItem = null;

// Quand je récupère un élément
todoList.addEventListener("dragstart", (e) => {
	if (e.target && e.target.classList.contains("todo-item")) {
		draggedItem = e.target;
		e.target.classList.add("dragging");
	}
});

// Ici, j'arrête de le drag
todoList.addEventListener("dragend", (e) => {
	if (e.target && e.target.classList.contains("todo-item")) {
		e.target.classList.remove("dragging");
		draggedItem = null;
	}
});

// Je passe sur un autre élément de ma liste
todoList.addEventListener("dragover", (e) => {
	e.preventDefault(); //Je n'ai pas le choix de mettre ça pour que le drop fonctionne
	const afterElement = getDragAfterElement(todoList, e.clientY);
	const currentItem = draggedItem;
	if (afterElement == null) {
		todoList.appendChild(currentItem);
	} else {
		todoList.insertBefore(currentItem, afterElement);
	}
});

// Cette fonction me permet de connaître le nouvel emplacement de mon élément
function getDragAfterElement(container, y) {
	const draggableElements = [
		...container.querySelectorAll(".todo-item:not(.dragging)"),
	];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}
