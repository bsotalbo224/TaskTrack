document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const pendingTasks = document.getElementById('pending-tasks');

    const statsContainer = document.querySelector('.stats-container');
    const taskSection = document.querySelector('.task-section');
    const taskContainer = document.querySelector('.task-container');
    
    if (statsContainer && taskSection && taskContainer) {
        taskSection.insertBefore(statsContainer, taskContainer);
    }

    // Load tasks when page loads
    loadTasks();

    // Add task form submission
    taskForm.addEventListener('submit', handleTaskSubmission);

    // Task list click event delegation for buttons
    taskList.addEventListener('click', handleTaskActions);

    async function loadTasks() {
        try {
            const response = await fetch('http://127.0.0.1:5000/tasks');
            const tasks = await response.json(); // The response is now a plain array
            if (!tasks) {
                console.error('No tasks found in the response:', data);
                throw new Error('Invalid response structure');
            }
            renderTasks(tasks);
            updateStats(tasks);


        } catch (error) {
            console.error('Error loading tasks:', error);
            showAlert('Failed to load tasks', 'error');
        }
    }

    function updateStats(tasks) {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;

        totalTasks.textContent = total;
        completedTasks.textContent = completed;
        pendingTasks.textContent = pending;
    }

    async function handleTaskSubmission(e) {
        e.preventDefault();

        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-desc').value.trim();
        const dueDate = document.getElementById('task-due-date').value;

        if (!title || !dueDate) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, due_date: dueDate }),
            });

            if (!response.ok) throw new Error('Failed to add task');

            await loadTasks(); // Reload all tasks
            taskForm.reset();
            showAlert('Task added successfully', 'success');
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to add task', 'error');
        }
    }

    async function handleTaskActions(e) {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = taskItem.dataset.taskId;

        if (e.target.closest('.complete')) {
            await toggleTaskCompletion(taskId, taskItem);
        } else if (e.target.closest('.delete')) {
            await deleteTask(taskId);
        } else if (e.target.closest('.edit')) {
            handleEditTask(taskItem);
        }
    }

    async function toggleTaskCompletion(taskId, taskItem) {
        try {
            const completed = !taskItem.classList.contains('completed');
            const response = await fetch(`http://127.0.0.1:5000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed }),
            });

            if (!response.ok) throw new Error('Failed to update task');

            await loadTasks(); // Reload to update stats
            showAlert('Task status updated', 'success');
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to update task status', 'error');
        }
    }

    async function deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            const response = await fetch(`http://127.0.0.1:5000/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete task');

            await loadTasks(); // Reload to update stats
            showAlert('Task deleted successfully', 'success');
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to delete task', 'error');
        }
    }

    function handleEditTask(taskItem) {
        const taskTitle = taskItem.querySelector('.task-title').textContent;
        const taskDesc = taskItem.querySelector('.task-description').textContent;
        const taskDueDate = taskItem.querySelector('.task-due-date').dataset.date;
        const taskId = taskItem.dataset.taskId;

        // Fill form with current task data
        document.getElementById('task-title').value = taskTitle;
        document.getElementById('task-desc').value = taskDesc;
        document.getElementById('task-due-date').value = taskDueDate;

        // Change form submit button to update
        const submitBtn = taskForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Task';
        taskForm.dataset.editTaskId = taskId;

        // Change form submission handler temporarily
        taskForm.removeEventListener('submit', handleTaskSubmission);
        taskForm.addEventListener('submit', handleTaskUpdate);
    }

    async function handleTaskUpdate(e) {
        e.preventDefault();
        const taskId = taskForm.dataset.editTaskId;

        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-desc').value.trim();
        const dueDate = document.getElementById('task-due-date').value;

        try {
            const response = await fetch(`http://127.0.0.1:5000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    due_date: dueDate
                }),
            });

            if (!response.ok) throw new Error('Failed to update task');

            await loadTasks();
            resetForm();
            showAlert('Task updated successfully', 'success');
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to update task', 'error');
        }
    }

    function resetForm() {
        taskForm.reset();
        const submitBtn = taskForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Add Task';
        delete taskForm.dataset.editTaskId;
        
        // Reset form submission handler
        taskForm.removeEventListener('submit', handleTaskUpdate);
        taskForm.addEventListener('submit', handleTaskSubmission);
    }

    function renderTasks(tasks) {
        taskList.innerHTML = tasks.length === 0 
            ? '<div class="empty-state"><p>No tasks yet. Add your first task above!</p></div>'
            : '';

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.taskId = task.id;

            taskItem.innerHTML = `
                <div class="task-content">
                    <h3 class="task-title">${escapeHtml(task.title)}</h3>
                    <p class="task-description">${escapeHtml(task.description || '')}</p>
                    <p class="task-due-date" data-date="${task.due_date}">
                        Due: ${formatDate(task.due_date)}
                    </p>
                </div>
                <div class="task-actions">
                    <button class="btn-icon complete" title="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-icon edit" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            taskList.appendChild(taskItem);
        });
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type === 'error' ? 'alert-error' : 'alert-success'}`;
        alertDiv.textContent = message;
        
        // Find the task-section specifically
        const taskSection = document.querySelector('.task-section');
        
        // Remove any existing alerts
        const existingAlerts = taskSection.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Insert the new alert at the beginning of task-section
        taskSection.insertBefore(alertDiv, taskSection.firstChild);
    
        // Remove the alert after 3 seconds
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
});