const input_addTask = document.querySelector('.addTask');
const tasksLeft = document.querySelector('.taskLeft');
const tasksWrapper = document.querySelector('.tasksWrapper');
const main = document.querySelector('.main');


let tasks = [];
let completedTasks = [];
let inputValue;

let flag = false;

function renderTasks(items) {

    const tasksWrapper = document.querySelector('.tasksWrapper');
    tasksWrapper.innerHTML = '';

    items.forEach(task => {
        const newTask = `<div class="task">
          <div class="checkBox ${task.complete}" ></div>
          <p class="taskText" contenteditable="true">${task.text}</p>
          <div class="cross"><img src="images/icon-cross.svg" alt="Cross button"></div>
        </div>`;
        tasksWrapper.innerHTML += newTask;
    })

    tasksWrapper.innerHTML += `<div class = "tasksInformation">
            <p class = "taskLeft" > ${tasks.length} items left </p> 
            <p class = "clear" > Clear Completed </p> 
        </div>`;

    let crosses = document.querySelectorAll('.cross img');
    tasks.removeCrosses = [];
    crosses.forEach(cross => tasks.removeCrosses.push(cross))

    let checkBox = document.querySelectorAll('.checkBox');
    tasks.checkBox = [];
    checkBox.forEach(box => tasks.checkBox.push(box))

}

function taskText(e) {

    if (e.key === 'Enter') {
        inputValue = e.target.value;

        let newTask = {
            text: inputValue,
            complete: []
        }
        tasks.push(newTask)
        renderTasks(tasks)
    }

}
input_addTask.addEventListener('keydown', taskText)



function tasksOptions(e) {
    // remove task
    if (e.target.matches('.cross img')) {
        let index = tasks.removeCrosses.indexOf(e.target);
        tasks.splice(index, 1);
        renderTasks(tasks);
    }
    // *************
    // add Complete
    if (e.target.matches('.checkBox')) {
        let index = tasks.checkBox.indexOf(e.target);
        tasks.checkBox[index].classList.toggle('active');
        if (tasks[index].complete.join() === 'active') {
            tasks[index].complete = []
            return
        }
        tasks[index].complete.push('active');
    }
    // *************
    // clear Completed
    if (e.target.matches('.clear')) {
        let completeTasks = tasks.map(task => task.complete).join();
        completeTasks = completeTasks.split(',');
        let indexes = [];
        for (let i = 0; i < completeTasks.length; i++) {
            if (completeTasks[i] === "active") {
                indexes.push([i])
            }
        }
        for (let i = indexes.length - 1; i >= 0; i--) {
            completedTasks.push(tasks[indexes[i]])
            tasks.splice(indexes[i], 1)
        }
        renderTasks(tasks);
    }
    // *************
    // show completed
    if (e.target.matches('.Completed')) {
        renderTasks(completedTasks);
    }
    // *************
    // show active
    if (e.target.matches('.Active')) {
        renderTasks(tasks);
    }

}
main.addEventListener('click', tasksOptions)