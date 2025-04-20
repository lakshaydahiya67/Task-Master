const api = "/todos/";
let editingId = null;
let deletingId = null;
let isLoading = true;

// DOM Elements
const todoForm = document.getElementById("todo-form");
const todosList = document.getElementById("todos");
const loader = document.querySelector(".loader");
const emptyState = document.getElementById("empty-state");
const editModal = document.getElementById("edit-modal");
const confirmModal = document.getElementById("confirm-modal");
const toast = document.getElementById("toast");

// Show/hide loader
function toggleLoader(show) {
  isLoading = show;
  if (show) {
    loader.style.display = "block";
    todosList.style.opacity = "0.5";
  } else {
    loader.style.display = "none";
    todosList.style.opacity = "1";
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Modal functions
function openModal(modal) {
  document.body.style.overflow = "hidden";
  modal.classList.add("show");
  setTimeout(() => {
    modal.querySelector("input, button").focus();
  }, 100);
}

function closeModal(modal) {
  document.body.style.overflow = "";
  modal.classList.remove("show");
}

// Event listeners for modals
document.querySelector(".close").addEventListener("click", () => closeModal(editModal));
document.getElementById("cancel-edit").addEventListener("click", () => closeModal(editModal));
document.getElementById("cancel-delete").addEventListener("click", () => closeModal(confirmModal));

document.getElementById("save-edit").addEventListener("click", async () => {
  const title = document.getElementById("edit-title").value.trim();
  const description = document.getElementById("edit-description").value.trim();
  
  if (!title || !description) {
    showToast("Please fill in all fields", "error");
    return;
  }
  
  await updateTodo(editingId, { title, description });
  closeModal(editModal);
  showToast("Task updated successfully");
});

document.getElementById("confirm-delete").addEventListener("click", async () => {
  await deleteTodo(deletingId);
  closeModal(confirmModal);
  showToast("Task deleted successfully");
});

// Fetch and render todos
async function fetchTodos() {
  toggleLoader(true);
  try {
    const res = await fetch(api);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const list = await res.json();
    
    // Empty state handling
    if (list.length === 0) {
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
    }
    
    renderTodos(list);
  } catch (error) {
    console.error("Error fetching todos:", error);
    showToast("Failed to load tasks", "error");
  } finally {
    toggleLoader(false);
  }
}

function renderTodos(list) {
  todosList.innerHTML = "";
  list.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.innerHTML = `
      <span class="${todo.completed ? 'done' : ''}">
        ${escapeHtml(todo.title)}
        <small>${escapeHtml(todo.description)}</small>
      </span>
      <div class="action-buttons">
        <button class="btn-success" onclick="toggleTodo(${todo.id}, ${todo.completed})">
          <i class="fas fa-${todo.completed ? 'undo' : 'check'}"></i>
          ${todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="edit-btn btn-warning" data-id="${todo.id}">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="delete-btn btn-danger" data-id="${todo.id}">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `;
    
    todosList.appendChild(li);
    
    // Staggered animation
    setTimeout(() => {
      li.style.opacity = "1";
    }, 50 * todosList.children.length);
  });
  
  // Add event listeners
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const id = parseInt(this.getAttribute("data-id"));
      const todoItem = list.find(item => item.id === id);
      if (todoItem) openEditModal(todoItem);
    });
  });
  
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      deletingId = parseInt(this.getAttribute("data-id"));
      openModal(confirmModal);
    });
  });
}

// Open edit modal and populate fields
function openEditModal(todo) {
  editingId = todo.id;
  document.getElementById("edit-title").value = todo.title;
  document.getElementById("edit-description").value = todo.description;
  openModal(editModal);
}

// CRUD operations
async function addTodo(e) {
  e.preventDefault();
  const title = e.target.title.value.trim();
  const description = e.target.description.value.trim();
  
  if (!title || !description) {
    showToast("Please fill in all fields", "error");
    return;
  }
  
  const btn = e.target.querySelector("button");
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
  btn.disabled = true;
  
  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title, description})
    });
    
    if (!res.ok) throw new Error("Failed to add task");
    
    e.target.reset();
    fetchTodos();
    showToast("Task added successfully");
  } catch (error) {
    console.error("Error adding todo:", error);
    showToast("Failed to add task", "error");
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

async function toggleTodo(id, completed) {
  try {
    const res = await fetch(api + id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({completed: !completed})
    });
    
    if (!res.ok) throw new Error("Failed to update task");
    
    fetchTodos();
    showToast(`Task marked as ${!completed ? 'completed' : 'active'}`);
  } catch (error) {
    console.error("Error updating todo:", error);
    showToast("Failed to update task", "error");
  }
}

async function updateTodo(id, data) {
  try {
    const res = await fetch(api + id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    
    if (!res.ok) throw new Error("Failed to update task");
    
    fetchTodos();
  } catch (error) {
    console.error("Error updating todo:", error);
    showToast("Failed to update task", "error");
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(api + id, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");
    
    // Find and animate the deleted item
    const item = document.querySelector(`li[data-id="${id}"]`);
    if (item) {
      item.style.opacity = "0";
      item.style.transform = "translateX(100px)";
      setTimeout(() => {
        fetchTodos();
      }, 300);
    } else {
      fetchTodos();
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    showToast("Failed to delete task", "error");
  }
}

// Helper for safely rendering HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Event listeners
todoForm.addEventListener("submit", addTodo);

// Initialize
fetchTodos();
