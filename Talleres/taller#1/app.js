document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const addButton = document.getElementById('addTask');
    const taskList = document.getElementById('lista');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Renderizar tareas al cargar la página
    renderTasks();

    // Evento para agregar tarea
    addButton.addEventListener('click', () => {
        const taskText = input.value.trim();
        if (taskText) {
            addTask(taskText);
            input.value = '';
        }
    });

    // Delegación de eventos para manejar clics en la lista de tareas
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const index = target.dataset.index;

        if (target.classList.contains('btn-delete')) {
            removeTask(index);
        } else if (target.classList.contains('radio')) {
            toggleTaskCompletion(index);
        }
    });

    /**
     * Añadir una nueva tarea a la lista y guardarla en localStorage
     * @param {string} taskText - El texto de la tarea a agregar
     */
    function addTask(taskText) {
        tasks.push({ text: taskText, completed: false });
        updateTasks();
    }

    /**
     * Eliminar una tarea de la lista según el índice y actualizar localStorage
     * @param {number} index - El índice de la tarea a eliminar
     */
    function removeTask(index) {
        tasks.splice(index, 1);
        updateTasks();
    }

    /**
     * Marcar o desmarcar una tarea como completada y actualizar localStorage
     * @param {number} index - El índice de la tarea a marcar/desmarcar
     */
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        updateTasks();
    }

    /**
     * Actualizar la lista de tareas en el DOM y en localStorage
     */
    function updateTasks() {
        saveTasks();
        renderTasks();
    }

    /**
     * Guardar las tareas en localStorage
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Renderizar las tareas en el DOM
     */
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <div class="task-actions">
                    <div class="radio ${task.completed ? 'completed' : ''}" data-index="${index}"></div>
                    <p class="text ${task.completed ? 'completed' : ''}">${task.text}</p>
                </div>
                <div>
                    <button class="btn-delete" data-index="${index}">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
});

