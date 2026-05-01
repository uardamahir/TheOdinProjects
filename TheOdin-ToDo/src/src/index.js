import './style.css';
import createTodo from './todo';
import createProject from './project';
import { renderProjects, renderTodos } from './dom';
import { saveProjects, loadProjects } from './storage';

// DOM elemanları
const projectContainer = document.getElementById('project-list');
const todoContainer = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const titleInput = document.getElementById('todo-title');
const descInput = document.getElementById('todo-desc');
const dateInput = document.getElementById('todo-date');
const priorityInput = document.getElementById('todo-priority');
const notesInput = document.getElementById('todo-notes'); // 🆕
const checklistInput = document.getElementById('todo-checklist'); // 🆕
const projectForm = document.getElementById('project-form');
const projectNameInput = document.getElementById('project-name');

// Durum
let allProjects = [];
let activeProjectIndex = 0;
let editMode = false;
let editIndex = null;

// Yükle veya örnek oluştur
const saved = loadProjects();
if (saved.length > 0) {
  allProjects = reviveProjects(saved);
} else {
  const p1 = createProject('Bugün');
  const p2 = createProject('Yarın');
  const t1 = createTodo('Kitap Oku', 'Felsefe', '2025-08-10', 'high');
  const t2 = createTodo('Mail Gönder', 'İşe cevap ver', '2025-08-11', 'low');
  p1.addTodo(t1);
  p2.addTodo(t2);
  allProjects.push(p1, p2);
  saveProjects(allProjects);
}

// İlk yükleme
renderProjects(allProjects, projectContainer);
if (allProjects.length > 0) {
  renderTodos(allProjects[activeProjectIndex], todoContainer);
}

// Proje seçim/silme
projectContainer.addEventListener('click', (e) => {
  const index = Number(e.target.dataset.index);

  if (e.target.classList.contains('project-del-btn')) {
    allProjects.splice(index, 1);

    if (index === activeProjectIndex) {
      activeProjectIndex = 0;
    } else if (index < activeProjectIndex) {
      activeProjectIndex--;
    }

    saveProjects(allProjects);
    renderProjects(allProjects, projectContainer);

    if (allProjects.length > 0) {
      renderTodos(allProjects[activeProjectIndex], todoContainer);
    } else {
      todoContainer.innerHTML = '<p>Hiç proje yok.</p>';
    }

    return;
  }

  if (e.target.classList.contains('project-btn')) {
    activeProjectIndex = index;
    renderTodos(allProjects[activeProjectIndex], todoContainer);
    saveProjects(allProjects);
  }
});

// Görev işlemleri (sil, tamamla, düzenle)
todoContainer.addEventListener('click', (e) => {
  const index = Number(e.target.dataset.index);
  const activeProject = allProjects[activeProjectIndex];
  const todos = activeProject.getTodos();

  if (e.target.classList.contains('delete-btn')) {
    activeProject.removeTodo(index);
    saveProjects(allProjects);
    renderTodos(activeProject, todoContainer);
  }

  if (e.target.classList.contains('todo-checkbox')) {
    todos[index].completed = e.target.checked;
    saveProjects(allProjects);
    renderTodos(activeProject, todoContainer);
  }

  if (e.target.classList.contains('edit-btn')) {
    const todo = todos[index];
    titleInput.value = todo.title;
    descInput.value = todo.description;
    dateInput.value = todo.dueDate;
    priorityInput.value = todo.priority;
    notesInput.value = todo.notes || ''; // 🆕
    checklistInput.value = (todo.checklist || []).join(', '); // 🆕

    editMode = true;
    editIndex = index;
    form.querySelector('button[type="submit"]').textContent = 'Güncelle';
  }
});

// Görev ekle/güncelle
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const checklistArray = checklistInput.value
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '');

  const newTodo = createTodo(
    titleInput.value,
    descInput.value,
    dateInput.value,
    priorityInput.value,
    notesInput.value,
    checklistArray
  );

  const activeProject = allProjects[activeProjectIndex];

  if (editMode) {
    activeProject.getTodos()[editIndex] = newTodo;
    editMode = false;
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Ekle';
  } else {
    activeProject.addTodo(newTodo);
  }

  saveProjects(allProjects);
  renderTodos(activeProject, todoContainer);

  form.reset();
  notesInput.value = '';
  checklistInput.value = '';
});

// Yeni proje ekleme
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = projectNameInput.value.trim();
  if (name === '') return;

  const newProject = createProject(name);
  allProjects.push(newProject);
  activeProjectIndex = allProjects.length - 1;

  saveProjects(allProjects);
  renderProjects(allProjects, projectContainer);
  renderTodos(newProject, todoContainer);
  projectForm.reset();
});

// localStorage'tan geri dönerken metotları yeniden yükle
function reviveProjects(data) {
  return data.map((proj) => {
    const revived = createProject(proj.name);
    proj.todos.forEach((todo) => {
      const revivedTodo = createTodo(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority,
        todo.notes,
        todo.checklist
      );
      revivedTodo.completed = todo.completed;
      revived.addTodo(revivedTodo);
    });
    return revived;
  });
}
