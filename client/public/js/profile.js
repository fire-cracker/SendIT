// Add active class to the current button (highlight it)
const header = document.getElementById('navTabs');
const btns = header.getElementsByClassName('navLink');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}

// Hide/Show active div
function showHide(d) {
  const onediv = document.getElementById(d);
  const divs = ['new', 'pending', 'delivered'];
  for (let i = 0; i < divs.length; i++) {
    if (onediv !== document.getElementById(divs[i])) {
      document.getElementById(divs[i]).style.display = 'none';
    }
  }
  onediv.style.display = 'block';
}
