const input_addTask = document.querySelector('.addTask')
const tasksLeft = document.querySelector('.taskLeft')
let tasks = [{
    text: 'empty'
}];
let inputValue;


function taskText(e) {
    if (e.key === 'Enter') {
        inputValue = e.target.value;
        let newTask = {
            text: inputValue
        }
        tasks.push(newTask)
        renderContacts()
    }
}
input_addTask.addEventListener('keydown', taskText)

function renderContacts() {
    const tasksWrapper = document.querySelector('.tasksWrapper');
    tasksWrapper.innerHTML = '';
    tasks.forEach(task => {
        const newTask = `<div class="task" data-key='0'>
          <div class="checkBox"><img class="active" src="images/icon-check.svg" alt="Check"></div>
          <p class="taskText" contenteditable="true">${task.text}</p>
          <div class="cross"><img data-key='0' src="images/icon-cross.svg" alt="Cross button"></div>
        </div>`;
        tasksWrapper.innerHTML += newTask
    })

}
renderContacts();