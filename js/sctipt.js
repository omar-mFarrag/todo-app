let theme = 'light';
// for switch wallpaper between mobile and pc
window.addEventListener('load',() => {
    if (document.body.offsetWidth < 800) {
        document.getElementById('background').src =`./images/bg-mobile-${theme}.jpg`;
    }else{
        document.getElementById('background').src =`./images/bg-desktop-${theme}.jpg`;
    }
})
window.addEventListener('resize',() => {
    if (document.body.offsetWidth < 800) {
        document.getElementById('background').src =`./images/bg-mobile-${theme}.jpg`;
    }else{
        document.getElementById('background').src =`./images/bg-desktop-${theme}.jpg`;
    }
})