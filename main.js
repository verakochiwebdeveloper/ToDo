const toDoComplete = document.querySelector('.toDo-complete');
const toDoList = document.querySelector('.toDo-list');
const toDoControl = document.querySelector('.toDo-control');
const headerInput = document.querySelector('.header-input');

let toDoData = JSON.parse(localStorage.getItem('toDoData')) || [];

const render = function() {
    toDoList.innerHTML = '';
    toDoComplete.innerHTML = '';

    toDoData.forEach(function(item, index) {
        const li = document.createElement('li');
        li.classList.add('toDo-item');
        li.innerHTML = '<span class="text-toDo">' + item.text + '</span>' +
            '<div class="toDo-buttons">' +
            '<button class="toDo-remove" data-index="' + index + '">Удалить</button>' +
            '<button class="toDo-complete" data-index="' + index + '">Выполнено</button>' +
            '</div>';

        if (item.completed) {
            toDoComplete.append(li);
        } else {
            toDoList.append(li);
        }

        li.querySelector('.toDo-complete').addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.toDo-remove').addEventListener('click', function() {
            toDoData.splice(index, 1);
            render();
        });
    });
};

toDoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newToDo = {
        text: headerInput.value,
        completed: false
    };

    if (newToDo.text.trim() !== '') {
        toDoData.push(newToDo);
        localStorage.setItem('toDoData', JSON.stringify(toDoData));
        headerInput.value = '';
        render();
    }
});

window.addEventListener('DOMContentLoaded', function() {
    render();
});
