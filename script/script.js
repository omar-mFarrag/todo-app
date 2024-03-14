// this part for dark and light mode
var themeIcon = document.getElementById('theme-icone');
var backGround = document.getElementById('backGround');
var theme; // declare theme variable
if (localStorage.getItem('theme')) { // check if local storage have a theme
    theme = localStorage.getItem('theme'); // give theme var a value of theme local storage
}else{
    theme = 'dark'; // if local storage not have theme give theme the dark value
}
changeTheme(); // to call back function after load a web page
// give click event to theme icon
themeIcon.addEventListener('click', function () {
    // change theme value and theme in local storage
    if (theme === 'dark') {
        theme = 'light';
        localStorage.setItem('theme', 'light')
    }else{
        theme = 'dark';
        localStorage.setItem('theme', 'dark')
    }
    changeTheme(); // call back change theme function
})
function changeTheme() {
    if (theme === 'light') { // light mode
        themeIcon.src = "./images/icon-moon.svg"; // for change icon from moon to sun
        if (document.getElementById('body').offsetWidth < 1024) { // for change background from pc to mobile each other
            document.getElementById('backGround').src = "./images/bg-mobile-light.jpg";
        }else{
            backGround.src = "./images/bg-desktop-light.jpg"; //for change background img
        }
        document.getElementById('body').classList.add('light');
    } else { // dark mode
        themeIcon.src = "./images/icon-sun.svg"; // for change icon from moon to sun
        if (document.getElementById('body').offsetWidth < 1024) { // for change background from pc to mobile each other
            document.getElementById('backGround').src = "./images/bg-mobile-dark.jpg";
        }else{
            backGround.src = "./images/bg-desktop-dark.jpg"; //for change background img
        }
        document.getElementById('body').classList.remove('light');
    }
}
// The end of theme change method

