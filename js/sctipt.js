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