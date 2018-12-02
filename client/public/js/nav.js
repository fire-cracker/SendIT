document.getElementById('icon').addEventListener('click', function() {
    var x = document.getElementById("navigation")
    if (x.className === "navigation") {
        x.className += " responsive";
        document.getElementById("navBar").style.height = '150px';
    } else {
        x.className = "navigation";
        document.getElementById("navBar").style.height = '50px';
    }
});

window.onresize =evt => {
    console.log(window.innerWidth);
    var x = document.getElementById("navigation")
    if (innerWidth < 768) {
        x.className += " responsive";
        document.getElementById("navBar").style.height = '150px';
    } else {
        x.className = "navigation";
        document.getElementById("navBar").style.height = '50px';
    }
}
