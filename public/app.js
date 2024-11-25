const API_URL = 'https://taskmaster22.onrender.com/api';
let token = localStorage.getItem('token');

// DOM Elements
const authContainer = document.getElementById('auth-container');
const taskContainer = document.getElementById('task-container');
const loginForm = document.getElementById('login-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const userInfo = document.getElementById('user-info');
const showRegister = document.getElementById('show-register');
const searchInput = document.getElementById('search-input');
const priorityFilter = document.getElementById('priority-filter');
const dueDateFilter = document.getElementById('due-date-filter');

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
taskForm.addEventListener('submit', handleAddTask);
showRegister.addEventListener('click', showRegistrationForm);
searchInput.addEventListener('input', handleSearch);
priorityFilter.addEventListener('change', handleFilter);
dueDateFilter.addEventListener('change', handleFilter);

// Check if user is logged in
if (token) {
    showTaskContainer();
} else {
    showAuthContainer();
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // try {
    //     const response = await fetch(`${API_URL}/auth/login`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ username, password }),
    //         credentials: 'include',

    //     });

    //     if (!response.ok) {
    //         throw new Error('Login failed');
    //     }

    //     const data = await response.json();
    //     token = data.token;
    //     localStorage.setItem('token', token);
    //     showTaskContainer();
    // } catch (error) {
    //     alert('Login failed. Please try again.');
    // }
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid details');
        }
    
        const data = await response.json();
        token = data.token;
        localStorage.setItem('token', token);
        showTaskContainer();
    } catch (error) {
        alert(error.message);
    }
    
}

function showRegistrationForm() {
    const registrationForm = `
     <div id="register-for">
        <h2 class= "loginH">Register</h2>
        <form id="register-form">
            <input type="text" id="register-username" placeholder="Username" required>
            <input type="password" id="register-password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="#" id="show-login">Login</a></p>
     </div>
    `;

    authContainer.innerHTML = registrationForm;
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('show-login').addEventListener('click', showLoginForm);
}

function showLoginForm() {
    authContainer.innerHTML = `
        <h2 class= "loginH">Login</h2>
        <form id="login-form">
            <input type="text" id="login-username" placeholder="Username" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#" id="show-register">Register</a></p>
    `;

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('show-register').addEventListener('click', showRegistrationForm);
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',

        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        alert('Registration successful. Please login.');
        showLoginForm();
    } catch (error) {
        alert('Registration failed. Please try again.');
    }
}

function showAuthContainer() {
    authContainer.style.display = 'block';
    taskContainer.style.display = 'none';
    userInfo.textContent = '';
}

function showTaskContainer() {
    authContainer.style.display = 'none';
    taskContainer.style.display = 'block';
    userInfo.innerHTML = `
        <span>Welcome!</span>
        <button id="logout-btn">Logout</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    fetchTasks();
}

function handleLogout() {
    localStorage.removeItem('token');
    token = null;
    window.location.href = 'index.html'; 
}

async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        alert('Failed to fetch tasks. Please try again.');
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
           <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Priority: <span class="priority">${task.priority}</span></p>
            <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
            <div class="task-actions">
                <button class="edit-btn" data-id="${task._id}" title="Edit Task"></button>
                <button class="delete-btn" data-id="${task._id}" title="Delete Task"></button>
            </div>
        `;
        taskList.appendChild(li);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditTask);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteTask);
    });
}

// async function handleAddTask(e) {
//     e.preventDefault();
//     const title = document.getElementById('task-title').value;
//     const description = document.getElementById('task-description').value;
//     const deadline = document.getElementById('task-deadline').value;
//     const priority = document.getElementById('task-priority').value;

//     try {
//         const response = await fetch(`${API_URL}/tasks`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,

//             },
//             body: JSON.stringify({ title, description, deadline, priority }),
//             credentials: 'include',

//         });

//         if (!response.ok) {
//             throw new Error('Failed to add task');
//         }

//         taskForm.reset();
//         fetchTasks();
//     } catch (error) {
//         alert('Failed to add task. Please try again.');
//     }
// }

async function handleAddTask(e) {
    e.preventDefault();
    const addButton = taskForm.querySelector('button[type="submit"]');
    addButton.disabled = true;
    addButton.textContent = 'Adding...';

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, deadline, priority }),
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        taskForm.reset();
        fetchTasks();
    } catch (error) {
        alert('Failed to add task. Please try again.');
    } finally {
        addButton.disabled = false;
        addButton.textContent = 'Add Task';
    }
}


async function handleEditTask(e) {
    const taskId = e.target.getAttribute('data-id');
    const taskItem = e.target.closest('.task-item');
    const title = taskItem.querySelector('h3').textContent;
    const description = taskItem.querySelector('p').textContent;
    const priority = taskItem.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
    const deadline = taskItem.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];

    const updatedTitle = prompt('Enter updated title:', title);
    const updatedDescription = prompt('Enter updated description:', description);
    const updatedPriority = prompt('Enter updated priority (low, medium, high):', priority);
    const updatedDeadline = prompt('Enter updated deadline (YYYY-MM-DD):', deadline);

    if (updatedTitle && updatedDescription && updatedPriority && updatedDeadline) {
        try {
            const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    description: updatedDescription,
                    priority: updatedPriority,
                    deadline: updatedDeadline,
                }),
                credentials: 'include',

            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            fetchTasks();
        } catch (error) {
            alert('Failed to update task. Please try again.');
        }
    }
}

async function handleDeleteTask(e) {
    const taskId = e.target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this task?')) {
        try {
            const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            fetchTasks();
        } catch (error) {
            alert('Failed to delete task. Please try again.');
        }
    }
}

async function handleSearch() {
    const query = searchInput.value;
    try {
        const response = await fetch(`${API_URL}/tasks/search?query=${query}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Failed to search tasks');
        }

        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        alert('Failed to search tasks. Please try again.');
    }
}

async function handleFilter() {
    const priority = priorityFilter.value;
    const dueDate = dueDateFilter.value;
    try {
        const response = await fetch(`${API_URL}/tasks/filter?priority=${priority}&dueDate=${dueDate}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Failed to filter tasks');
        }

        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        alert('Failed to filter tasks. Please try again.');
    }
}

