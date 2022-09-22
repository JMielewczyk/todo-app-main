const input_addTask = document.querySelector('.addTask');
const tasksLeft = document.querySelector('.taskLeft');
const tasksWrapper = document.querySelector('.tasksWrapper');
const main = document.querySelector('.main');


let tasks = [];
let completedTasks = [];
let allTasks = [];
let inputValue;

let flag = 'all';

function renderTasks(items) {

    const tasksWrapper = document.querySelector('.tasksWrapper');
    tasksWrapper.innerHTML = '';

    items.forEach(task => {
        if (items !== completedTasks) {
            const newTask = `<div class="task">
          <div class="checkBox ${task.complete}" ></div>
          <p class="taskText" contenteditable="true">${task.text}</p>
          <div class="cross"><img src="images/icon-cross.svg" alt="Cross button"></div>
        </div>`;
            tasksWrapper.innerHTML += newTask;
        } else {
            const newTask = `<div class="task">
          <p class="taskText" contenteditable="true">${task.text}</p>
          <div class = "cross"><img src = "images/icon-cross.svg"
          alt = "Cross button" ></div> 
          </div>`;
            tasksWrapper.innerHTML += newTask;
        }

    })

    tasksWrapper.innerHTML += `<div class = "tasksInformation">
            <p class = "taskLeft" > ${items.length} items left </p> 
            <p class = "clear" > Clear Completed </p> 
        </div>`;

    let crosses = document.querySelectorAll('.cross img');
    items.removeCrosses = [];
    crosses.forEach(cross => items.removeCrosses.push(cross))

    let checkBox = document.querySelectorAll('.checkBox');
    items.checkBox = [];
    checkBox.forEach(box => items.checkBox.push(box))

}

function newTask(e) {

    if (e.key === 'Enter') {
        inputValue = e.target.value;

        let newTask = {
            text: inputValue,
            complete: []
        }
        allTasks.push(newTask)
        tasks.push(newTask)
        renderTasks(allTasks)
    }

}
input_addTask.addEventListener('keydown', newTask)


function removeTask(items, target) {
    if (flag === 'Active') {
        let index = items.removeCrosses.indexOf(target);
        let array = [];
        array = allTasks.filter((item, index) => {
            if (item.complete === 'active') {
                return array.push(index)
            }
        })
        tasks.splice(index, 1)
        allTasks = array.concat(tasks)
        console.log(array)
        // tasks.splice(index, 1)
        // allTasks.splice()
    }
    // console.log(allTasks.find(item => item === tasks[index]))


    // if (flag === 'Active') {
    //     if (completedTasks.length !== 0) {
    //         tasks = []
    //         allTasks.forEach(task => tasks.push(task))
    //         for (let i = indexesOfCompleted.length - 1; i >= 0; i--) {
    //             tasks.splice(indexesOfCompleted[i], 1)
    //         }
    //     } else {
    //         tasks = [];
    //         allTasks.forEach(task => tasks.push(task))
    //     }
    // }



}

let indexesOfCompleted;
let indexesOfNotCompleted = [];

function addComplete(items, target) {
    let index = items.checkBox.indexOf(target);
    items.checkBox[index].classList.toggle('active');
    completedTasks = [];
    indexesOfNotCompleted = [];
    if (items[index].complete === 'active') {
        items[index].complete = [];
    } else {
        items[index].complete = 'active';
    }

    let array = allTasks.map((item, index) => {
        if (item.complete === 'active') {
            return index;
        } else {
            indexesOfNotCompleted.push(index)
        }
    })
    indexesOfCompleted = array.filter(item => {
        if (typeof (item) === 'number') {
            completedTasks.push(items[index])
            return item;
        }
    })
}

function tasksOptions(e) {
    // remove task
    if (e.target.matches('.cross img')) {
        switch (flag) {
            case 'Completed':
                removeTask(completedTasks, e.target)
                renderTasks(completedTasks)
                break;
            case 'Active':
                removeTask(tasks, e.target)
                renderTasks(tasks)
                break;
            case 'all':
                removeTask(allTasks, e.target)
                renderTasks(allTasks)
        }
    }
    // *************
    // add Complete
    if (e.target.matches('.checkBox')) {
        if (flag === 'Active') {
            addComplete(tasks, e.target)
        }
        if (flag === 'Completed') {
            addComplete(completedTasks, e.target)
        }
        if (flag === 'all') {
            addComplete(allTasks, e.target)
        }
    }
    // *************
    // clear Completed
    if (e.target.matches('.clear')) {
        if (indexesOfCompleted) {
            for (let i = indexesOfCompleted.length - 1; i >= 0; i--) {
                allTasks.splice(indexesOfCompleted[i], 1)
                completedTasks = [];
            }
            renderTasks(allTasks)
        } else {
            return
        }

    }
    // *************
    // show completed
    if (e.target.matches('.Completed')) {
        renderTasks(completedTasks);
        flag = 'Completed';
    }
    // *************
    // show active
    if (e.target.matches('.Active')) {
        if (completedTasks.length !== 0) {
            tasks = []
            allTasks.forEach(task => tasks.push(task))
            for (let i = indexesOfCompleted.length - 1; i >= 0; i--) {
                tasks.splice(indexesOfCompleted[i], 1)
            }
        } else {
            tasks = [];
            allTasks.forEach(task => tasks.push(task))
        }
        renderTasks(tasks);
        flag = 'Active';
    }
    // *************
    // show All
    if (e.target.matches('.all')) {
        flag = 'all';
        renderTasks(allTasks);
    }
}
main.addEventListener('click', tasksOptions)