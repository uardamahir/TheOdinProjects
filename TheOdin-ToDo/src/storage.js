const saveProjects = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const loadProjects = () => {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : [];
};

export { saveProjects, loadProjects };
