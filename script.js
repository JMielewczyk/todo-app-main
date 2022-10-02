const input_addTask = document.querySelector('.addTask');
const tasksLeft = document.querySelector('.taskLeft');
const tasksWrapper = document.querySelector('.tasksWrapper');
const main = document.querySelector('.main');
const options = document.querySelector('.options');
const clear = document.querySelector('.clear');
const theme = document.querySelector('.theme');
const tasksStats = document.querySelector('.taskLeft')

let tasks = [];
let completedTasks = [];
let allTasks = [];
let inputValue;
let indexesOfCompleted;
let flag = 'all';
let tasksTheme = '';

function toggleTheme() {
    const lightElements = document.querySelectorAll('.toggle');
    const tasks = document.querySelectorAll('.task')
    if (theme.firstChild.classList[1] === 'toggleTheme') {
        tasksTheme = '';
        for (const el of lightElements) {
            el.classList.remove('light')
        }
        for (const task of tasks) {
            task.classList.remove('light')
        }

    } else {
        tasksTheme = 'light';
        for (const el of lightElements) {
            el.classList.add('light')
        }
        for (const task of tasks) {
            task.classList.add('light')
        }
    }
    for (const child of theme.children) {
        child.classList.toggle('toggleTheme');
    }
}
theme.addEventListener('click', toggleTheme)

function options_textColor(e, flag) {
    for (const child of options.children) {

    }
    if (e === false && flag === 'all') {
        options.childNodes[1].classList.add('active')
    } else if (e === false && flag === 'Active') {
        options.childNodes[3].classList.add('active')
    } else {
        for (const child of options.children) {
            if (e.target === child) {
                for (const child of options.children) {
                    child.classList.remove('active')
                }
                child.classList.add('active');
            }
        }
    }

}
options.addEventListener('click', options_textColor)


function renderTasks(items) {
    const tasksWrapper = document.querySelector('.tasksWrapper');
    tasksWrapper.innerHTML = '';

    items.forEach(task => {
        if (items !== completedTasks) {
            const newTask = `<div class="task ${tasksTheme}">
          <div class="checkBox toggle ${tasksTheme} ${task.complete}" ></div>
          <p class="taskText">${task.text}</p>
          <div class="cross"><img src="images/icon-cross.svg" alt="Cross button"></div>
        </div>`;
            tasksWrapper.innerHTML += newTask;
        } else {
            const newTask = `<div class="task ${tasksTheme}">
          <p class="taskText">${task.text}</p> 
          </div>`;
            tasksWrapper.innerHTML += newTask;
        }

    })
    tasksStats.textContent = `${items.length} items left`
    const crosses = document.querySelectorAll('.cross img');
    items.removeCrosses = [];
    crosses.forEach(cross => items.removeCrosses.push(cross))

    const checkBox = document.querySelectorAll('.checkBox');
    items.checkBox = [];
    checkBox.forEach(box => items.checkBox.push(box))

}

function newTask(e) {

    if (e.key === 'Enter') {
        inputValue = e.target.value;
        if (!e.target.value) return alert('Empty task... please write something');
        const newTask = {
            text: inputValue,
            complete: []
        }
        allTasks.push(newTask);
        tasks.push(newTask);
        if (flag === "all") {
            renderTasks(allTasks);
        } else {
            renderTasks(tasks)
        }
        options_textColor(false, flag)
    }

}
input_addTask.addEventListener('keydown', newTask)


function removeTask(items, target) {
    let index = items.removeCrosses.indexOf(target);
    if (flag === 'all') {
        if (allTasks[index].complete === 'active') {
            if (completedTasks.length === 1) {
                completedTasks = [];
            } else {
                let findIndex = indexesOfCompleted.indexOf(index)
                completedTasks.splice(findIndex, 1)
            }

        }
        allTasks.splice(index, 1)
    }
    if (flag === 'Active') {
        let indexActive = [];
        indexActive = allTasks.map((task, index) => {
            if (task.complete.length === 0) {
                return index;
            }
        })
        indexActive = indexActive.filter(task => typeof (task) === 'number')
        allTasks.splice([indexActive[index]], 1)
        tasks.splice(index, 1)
        renderTasks(tasks)
    }

}



function addComplete(items, target) {
    let index = items.checkBox.indexOf(target);
    items.checkBox[index].classList.toggle('active');
    completedTasks = [];
    if (items[index].complete === 'active') {
        items[index].complete = [];
    } else {
        items[index].complete = 'active';
    }

    let array = allTasks.map((item, index) => {
        if (item.complete === 'active') {
            return index;
        }
    })
    indexesOfCompleted = array.filter(item => {
        if (typeof (item) === 'number') {
            if (item === 0) {
                return indexesOfCompleted += '0'
            } else {
                return item;
            }
        }

    })
    for (let i = 0; i < indexesOfCompleted.length; i++) {
        completedTasks.push(allTasks[indexesOfCompleted[i]])
    }
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
        flag = 'all'

        function addColor() {
            e.target.classList.add('active')
            setTimeout(removeColor, 200)
        }

        function removeColor() {
            e.target.classList.remove('active')
        }
        addColor()
        if (indexesOfCompleted) {
            for (let i = indexesOfCompleted.length - 1; i >= 0; i--) {
                allTasks.splice(indexesOfCompleted[i], 1)
                completedTasks = [];
            }
            indexesOfCompleted = [];
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
            indexesOfCompleted = allTasks.map((task, index) => {
                if (task.complete === 'active') {
                    return index
                }
            })
            indexesOfCompleted = indexesOfCompleted.filter(task => typeof (task) === 'number')
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