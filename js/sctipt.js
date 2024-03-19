let theme; //declar a theme variable
let themeIcon = document.getElementById('theme-icon'); // to get Theme Icon refrunce

if (localStorage.getItem('theme')) { // if we have a theme in local storage === true
    theme = localStorage.getItem('theme'); //giv theme value of theme in local storage
    themeChange(); // if we have a local storage with theme key run themeChange function
} else { // if we don't have theme in local storage
    theme = 'light'; //giv theme the default value ==> "light"
}

// for change background with resize
window.addEventListener('resize', () => {
    backgroundChange();
});

// for add event on theme icon
themeIcon.addEventListener('click', () => { // to add click event on themeIcon
    if (theme === 'light') {
        localStorage.setItem('theme', 'dark'); //  set a value for theme key
        theme = 'dark';
    } else {
        localStorage.setItem('theme', 'light'); // set a value for theme key
        theme = 'light';
    }
    themeChange(); // call back themeChange funciton
})

// this function for theme changes
function themeChange() {
    backgroundChange();
    if (theme === 'dark') { // if theme value = "dark"
        document.body.classList.add('dark');
        themeIcon.className = 'fa-solid fa-sun'; // change theme icon to sun
    } else { // if theme value = 'light'
        document.body.classList.remove('dark');
        themeIcon.className = 'fa-solid fa-moon'; //change theme icon to moon
    }
}

// this function for background change with size and theme
function backgroundChange() {
    if (document.body.offsetWidth < 470) { // add mobile back ground if body size is smaller than 470px
        document.getElementById('background').src = `./images/bg-mobile-${theme}.jpg`;
    } else { // add mobile back ground if body size is bigger than or equal 470px
        document.getElementById('background').src = `./images/bg-desktop-${theme}.jpg`;
    }
}
// END OF THEME CHANGE SCRIPT /////////////////////////////////////////////////////////////////////////////////////////////////

// Start of adding new todo ///////////////////////////////////////////////////////////////////////////////////////////////

let todoInput = document.getElementById('todo-input'); // to access toto input
let addingBtn = document.getElementById('adding-btn'); // to access adding button in todo creator
let todos = document.getElementById('todos'); // to access todos element (todo list)
let newTodoValue; // to declare a variable have a todo input value
let adding; // well have TRUE of FALSE value if it TRUE createNewTodo() will be called

if (localStorage.getItem('todos')) {
    todos.innerHTML = localStorage.getItem('todos');
} else {
    todos.innerHTML = `<p id="if-empty" >Let's add it and do it !`;
}

addingBtn.addEventListener('click', addingTodo); // when click on addingBtn call back addingTodo function
function addingTodo() {
    getNewTodoValue(); // call back getNewTodoValue function
    if (adding) {
        if (document.getElementById('if-empty') != null) { // if empty paragraph is exist it well be removed
            document.getElementById('if-empty').remove();
        }
        createNewTodo(); // call back createNewTodo function
        itemsLeft(); // call back itemsLeft
        hideAndSHowFilter(); // for hide active todo if filter is copleted
        saveTodos(); // call back this function to save todos in local storage after adding
    }
}

//this function to get new todo value from todoInput.value
function getNewTodoValue() {
    if (todoInput.value != '') { // if todo input not empty
        newTodoValue = todoInput.value; // to add todoInput.vale for newTodoValue variable
        console.log(newTodoValue);
        // to add active effect for addingBtn
        addingBtn.classList.add('active');
        addingBtn.parentElement.classList.add('active');
        // to remove active effect after a 300ms
        setTimeout(() => {
            addingBtn.classList.remove('active');
            addingBtn.parentElement.classList.remove('active');
        }, 300);
        todoInput.value = ''; // to delete todo inpute value after take it in newTodo variable
        adding = true; // call createNewTodo()
    } else { // if todo input is empty
        alert('أكتب حاجة وبطل عبط'); // to show a message if a user click the button and todoInput.value in empty
        adding = false; // dont call createNewTodo()
    }
}

// this function to create a new todo and 
function createNewTodo() {
    let newTodo = document.createElement('div'); //create a new todo (div)
    newTodo.setAttribute('class', 'todo'); // add class todo to (todo created element) so can be styling by css files
    let todoBtnContainer = document.createElement('div'); // create todo button container 
    todoBtnContainer.setAttribute('class', 'todo-button'); // add class for todo button container
    todoBtnContainer.innerHTML = '<button onclick="thisTodoIsDone(this)" class=""><i class="fa-solid fa-check"></i></button>'; // add button with check icon with his classes in todo button container
    let todoP = document.createElement('p'); // create Paragraph
    todoP.innerHTML = `${newTodoValue}`; // add newTodoValue in new todo paragraph
    let deleteIcon = document.createElement('i'); // delete icon (X shape)
    deleteIcon.setAttribute('class', 'fa-solid fa-x'); // adding fontAwesome class for delete icon (X shape)
    deleteIcon.setAttribute('onclick', 'deleteThisTodo(this)') // to call function will delete this todo
    // to appent all of those element in new todo element
    newTodo.appendChild(todoBtnContainer);
    newTodo.appendChild(todoP);
    newTodo.appendChild(deleteIcon);

    document.getElementById('todos').appendChild(newTodo); // to add new todo on Todos (todo list)
}

// End of adding new todo ///////////////////////////////////////////////////////////////////////////////////////////////

// Start of deleting todo with X mark ////////////////////////////////////////////////////////////////////////////////////
function deleteThisTodo(xMark) { // this function called from HTML element
    xMark.parentElement.remove();
    saveTodos(); // call back this function for saving todos in local storage
    itemsLeft(); // call back itemsLeft
    if (todos.innerHTML === '') { // if todos is empty show this message
        todos.innerHTML = `<p id="if-empty" >Let's add it and do it !`;
    }
}
// End of deleting todo with X mark ////////////////////////////////////////////////////////////////////////////////////

// Start of mark is DONE ////////////////////////////////////////////////////////////////////////////////////
function thisTodoIsDone(doneBtn) {
    doneBtn.parentElement.parentElement.classList.toggle('done'); // if todo have a done class it well be removed // if have't it well add a done class
    itemsLeft(); // call back itemsLeft
    setTimeout(() => {
        hideAndSHowFilter(); // to hide done todo if filter is active
        saveTodos(); // call back this function for saving todos in local storage
    }, 300);
}
// End of mark is DONE ////////////////////////////////////////////////////////////////////////////////////

// Start of Clear Completed  ////////////////////////////////////////////////////////////////////////////////////

document.getElementById('clear-completed').addEventListener('click', clearCompleted);

function clearCompleted() {
    let todosItems = todos.children;
    for (let i = 0; i < todosItems.length; i++) {
        if (todosItems[i].classList.contains('done')) {
            todosItems[i].remove();
            i--;
        }
    }
    if (todos.innerHTML === '') { // if todos is empty show this message
        todos.innerHTML = `<p id="if-empty" >Let's add it and do it !`;
    }
    saveTodos(); // call back this function for saving todos in local storage
}
// End of Clear Completed  ////////////////////////////////////////////////////////////////////////////////////

// Start of filtering    ///////////////////////////////////////////////////////////////////////////////////////
let filterMobile = document.getElementById('fliter-mobile'); // to get access on mobile filter
let filterPc = document.getElementById('fliter-pc');    // to get access on PC filter
let todosChidren = todos.children; // to access 
let clickedCategory = 'All'; // to save category chosen
function filtering(category) {
    let bros = category.parentElement.children; // to acces brothers of clicked category
    clickedCategory = category.innerHTML;
    for (let i = 0; i < bros.length; i++) {
        bros[i].classList.remove('active'); // to remove active class from all filter elements
    }
    category.classList.add('active'); // to add active class on clicked element

    // this if condetion for add active class on other version of app (MOBILE or PC)
    if (category.parentElement === filterPc) { // if clicked category is from filter pc children elements
        for (let i = 0; i < filterMobile.children.length; i++) {
            filterMobile.children[i].classList.remove('active') // for remove class active from all mobile filter category
            if (filterMobile.children[i].innerHTML === clickedCategory) { // if true add active to the same category on mobile
                filterMobile.children[i].classList.add('active');
            }
        }
    } else if (category.parentElement === filterMobile) {
        for (let i = 0; i < filterPc.children.length; i++) {
            filterPc.children[i].classList.remove('active') // for remove class active from all PC filter category
            if (filterPc.children[i].innerHTML === clickedCategory) { // if true add active to the same category on PC
                filterPc.children[i].classList.add('active');
            }
        }
    }
    /////////////////////////end of styling filtering categories /////////////////////////
    hideAndSHowFilter();
    localStorage.setItem('avtiveFilter', clickedCategory);
    saveTodos();
}
function hideAndSHowFilter() {
    todosChidren = todos.children; // to access 
    if (document.getElementById('if-empty') === null) {
        for (let i = 0; i < todosChidren.length; i++) { // to loop on all todos
            if (clickedCategory === 'All') {
                todosChidren[i].style.display = 'flex';
            } else if (clickedCategory === 'Active') {
                if (todosChidren[i].classList.contains('done')) {
                    todosChidren[i].style.display = 'none';
                } else {
                    todosChidren[i].style.display = 'flex';
                }
            } else if (clickedCategory === 'Completed') {
                if (todosChidren[i].classList.contains('done')) {
                    todosChidren[i].style.display = 'flex';
                } else {
                    todosChidren[i].style.display = 'none';
                }
            }
        }
    }
}

if (localStorage.getItem('avtiveFilter')) {
    for (let i = 0; i < filterMobile.children.length; i++) {
        filterMobile.children[i].classList.remove('active');
        if (filterMobile.children[i].innerHTML === localStorage.getItem('avtiveFilter')) {
            filterMobile.children[i].classList.add('active')
        }
    }
    for (let i = 0; i < filterPc.children.length; i++) {
        filterPc.children[i].classList.remove('active');
        if (filterPc.children[i].innerHTML === localStorage.getItem('avtiveFilter')) {
            filterPc.children[i].classList.add('active')
        }
    }
}






// this function to save todos in local storage
function saveTodos() {
    localStorage.setItem('todos', `${todos.innerHTML}`);
}
// this function to control how many items left
function itemsLeft() {
    if (document.getElementById('if-empty') === null) { //check if todos have a todo
        const todosCount = todos.children.length; // to save todos children coun in a var
        let itemsLeftCount = 0; // declare a variable to save items left count on it
        for (let i = 0; i < todosCount; i++) {
            if (!todos.children[i].classList.contains('done')) { // to get left items
                itemsLeftCount++; // to counting left items
            }
        }
        document.getElementById('items-left').innerHTML = `${itemsLeftCount} itmes left`; // to add todosCount in items-left element
    } else {
        document.getElementById('items-left').innerHTML = `0 itmes left`; // if todos list not have a todos make items-left equal ZERO
    }
}
itemsLeft(); // for run with web site loading