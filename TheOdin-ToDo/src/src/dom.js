export function renderProjects(projects, container) {
  container.innerHTML = '';
  projects.forEach((project, index) => {
    const btn = document.createElement('button');
    btn.textContent = project.name;
    btn.classList.add('project-btn');
    btn.dataset.index = index;

    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.classList.add('delete-project');
    del.addEventListener('click', () => {
      projects.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(projects));
      renderProjects(projects, container);
    });

    container.appendChild(btn);
    container.appendChild(del);
  });
}

export function renderTodos(project, container, projects = []) {
  container.innerHTML = '';

  project.todos.forEach((todo, index) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('todo');

    // ✅ Priority'ye göre sol border
    const p = (todo.priority || '').toLowerCase();
    if (p === 'high') wrapper.style.borderLeft = '5px solid red';
    else if (p === 'medium') wrapper.style.borderLeft = '5px solid orange';
    else if (p === 'low') wrapper.style.borderLeft = '5px solid green';
    else wrapper.style.borderLeft = '5px solid gray';
    wrapper.style.paddingLeft = '10px';

    const title = document.createElement('h3');
    title.textContent = `${index + 1}. ${todo.title} (${todo.dueDate})`;
    if (todo.completed) {
      title.classList.add('completed');
    }
    title.style.cursor = 'pointer';

    // Detaylar bölümü
    const details = document.createElement('div');
    details.classList.add('details');
    details.style.display = 'none';

    const desc = document.createElement('p');
    desc.textContent = `📌 ${todo.description}`;
    details.appendChild(desc);

    if (todo.notes) {
      const notes = document.createElement('p');
      notes.textContent = `📝 Not: ${todo.notes}`;
      details.appendChild(notes);
    }

    if (todo.checklist && todo.checklist.length > 0) {
      const clTitle = document.createElement('p');
      clTitle.textContent = '✔️ Kontrol Listesi:';
      details.appendChild(clTitle);

      const cl = document.createElement('ul');
      todo.checklist.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cl.appendChild(li);
      });
      details.appendChild(cl);
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.classList.add('todo-checkbox');
    checkbox.dataset.index = index;
    details.appendChild(checkbox);

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group');

    const edit = document.createElement('button');
    edit.textContent = '✏️';
    edit.classList.add('edit-btn');
    edit.dataset.index = index;

    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.classList.add('delete-btn');
    del.dataset.index = index;

    btnGroup.appendChild(edit);
    btnGroup.appendChild(del);
    details.appendChild(btnGroup);

    title.addEventListener('click', () => {
      details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    wrapper.appendChild(title);
    wrapper.appendChild(details);
    container.appendChild(wrapper);
  });
}
