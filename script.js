const input_addTask = document.querySelector('.addTask')
const tasksLeft = document.querySelector('.taskLeft')
const tasksWrapper = document.querySelector('.tasksWrapper');


let tasks = [];
let inputValue;



function renderTasks() {
    const tasksWrapper = document.querySelector('.tasksWrapper');
    tasksWrapper.innerHTML = '';
    tasks.forEach(task => {
        const newTask = `<div class="task">
          <div class="checkBox"></div>
          <p class="taskText" contenteditable="true">${task.text}</p>
          <div class="cross"><img src="images/icon-cross.svg" alt="Cross button"></div>
        </div>`;
        tasksWrapper.innerHTML += newTask
    })
    let crosses = document.querySelectorAll('.cross img');
    tasks.removeCrosses = [];
    crosses.forEach(cross => tasks.removeCrosses.push(cross))
    let completes = document.querySelectorAll('.checkBox');
    tasks.completeTasks = [];
    completes.forEach(task => tasks.completeTasks.push(task))
}

function taskText(e) {
    if (e.key === 'Enter') {
        inputValue = e.target.value;
        let newTask = {
            text: inputValue,
            removeCrosses: [],
            completeTasks: []
        }
        tasks.push(newTask)
        renderTasks()
    }

}
input_addTask.addEventListener('keydown', taskText)



function tasksOptions(e) {
    // remove task
    if (e.target.matches('.cross img')) {
        let index = tasks.removeCrosses.indexOf(e.target);
        tasks.splice(index, 1);
        renderTasks();
    }
    // *************
    // add Complete
    if (e.target.matches('.checkBox')) {
        let index = tasks.completeTasks.indexOf(e.target);
        tasks.completeTasks[index].classList.toggle('active');
        console.log(e.target)
    }

}

tasksWrapper.addEventListener('click', tasksOptions)