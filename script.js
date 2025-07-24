const color = document.getElementById("color");
const createButton = document.getElementById("create-noten");
const listNoten = document.getElementById("list-noten");

createButton.addEventListener("click", function() {
  let newNoten = document.createElement("div");
  newNoten.classList.add("noten");
  newNoten.innerHTML = `
    <span class="closeNoten">X</span>
    <textarea name="content" placeholder="Write content..." rows="10" cols="30"></textarea>
  `;
  newNoten.style.borderColor = color.value;
  listNoten.appendChild(newNoten);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("closeNoten")) {
    event.target.parentNode.remove();
  }
});

let cursor = {
  x: null,
  y: null
}

let noten = {
  dom: null,
  x: null,
  y: null
}

document.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("noten")) {
    cursor = {
      x: event.clientX,
      y: event.clientY
    }
    noten = {
      dom: event.target,
      x: event.target.getBoundingClientRect().left,
      y: event.target.getBoundingClientRect().top
    }
  }
});

document.addEventListener("mousemove", (event) => {
  if (noten.dom === null) return;
  let currentCursor = {
    x: event.clientX,
    y: event.clientY
  }
  let distance = {
    x: currentCursor.x - cursor.x,
    y: currentCursor.y - cursor.y,
  }
  noten.dom.style.left = (noten.x + distance.x) + "px";
  noten.dom.style.top = (noten.y + distance.y) + "px";
  noten.dom.style.cursor = "grab";
});

document.addEventListener("mouseup", (event) => {
  if (noten.dom === null) return;
  noten.dom.style.cursor = "auto";
  noten.dom = null
});
