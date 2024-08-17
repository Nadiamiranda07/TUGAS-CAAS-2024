class Task {
    constructor(description, dueDate) {
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.completed = false;
    }

    markAsCompleted() {
        this.completed = true;
    }

    setDueDate(newDueDate) {
        this.dueDate = new Date(newDueDate);
    }
}

class Member {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(description, dueDate) {
        const task = new Task(description, dueDate);
        this.tasks.push(task);
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
    }

    listTasks() {
        return this.tasks;
    }
}

const members = [];

function addMember() {
    const memberName = document.getElementById('memberName').value;
    if (memberName) {
        const newMember = new Member(memberName);
        members.push(newMember);
        updateMemberSelect();
        document.getElementById('memberName').value = '';
    }
}

function updateMemberSelect() {
    const memberSelect = document.getElementById('memberSelect');
    memberSelect.innerHTML = '';

    members.forEach((member, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = member.name;
        memberSelect.add(option);
    });
}

function addTask() {
    const memberIndex = document.getElementById('memberSelect').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    if (memberIndex !== '' && taskDescription && dueDate) {
        const selectedMember = members[memberIndex];
        selectedMember.addTask(taskDescription, dueDate);
        displayTasks();
        document.getElementById('taskDescription').value = '';
        document.getElementById('dueDate').value = '';
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const memberIndex = document.getElementById('memberSelect').value;
    if (memberIndex !== '') {
        const selectedMember = members[memberIndex];
        selectedMember.listTasks().forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item' + (task.completed ? ' completed' : '');

            const taskInfo = document.createElement('div');
            taskInfo.innerHTML = `${task.description} - Due: ${task.dueDate.toDateString()}`;

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const completeButton = document.createElement('button');
            completeButton.className = 'complete-btn';
            completeButton.innerText = 'Complete';
            completeButton.onclick = () => {
                task.markAsCompleted();
                displayTasks();
            };

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => {
                selectedMember.deleteTask(index);
                displayTasks();
            };

            const setDueButton = document.createElement('button');
            setDueButton.className = 'due-btn';
            setDueButton.innerText = 'Set Due Date';
            setDueButton.onclick = () => {
                const newDueDate = prompt("Enter new due date (YYYY-MM-DD):", task.dueDate.toISOString().split('T')[0]);
                if (newDueDate) {
                    task.setDueDate(newDueDate);
                    displayTasks();
                }
            };

            taskActions.appendChild(completeButton);
            taskActions.appendChild(deleteButton);
            taskActions.appendChild(setDueButton);

            taskItem.appendChild(taskInfo);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    }
}
