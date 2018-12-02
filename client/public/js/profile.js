// Add active class to the current button (highlight it)
var header = document.getElementById("navTabs");
var btns = header.getElementsByClassName("navLink");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Hide/Show active div 
function showHide(d)
{
var onediv = document.getElementById(d);
var divs=['content1','content2','content3'];
for (var i=0;i<divs.length;i++)
  {
  if (onediv != document.getElementById(divs[i]))
    {
    document.getElementById(divs[i]).style.display='none';
    }
  }
onediv.style.display = 'block';
}