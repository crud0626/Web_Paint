const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const eraserBtn = document.getElementById("jsEraser");
const popBtns = document.querySelectorAll('.popBtn');
const normalBtns = document.querySelectorAll('.normalBtn');
let colorStorage;

// Default Value
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// Fuction Value
let painting = false;
let filling = false;
let clearing = false;
let erasing = false;

// Event Listener
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", handlePainting);
    canvas.addEventListener("mouseup", handlePainting);
    canvas.addEventListener("mouseleave", handlePainting);
    canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);

}

if (erasing) {
    canvas.addEventListener("mousemove", onMouseMove);
}

Array.from(colors).forEach((color) => 
    color.addEventListener("click", handleColorClick);
);

clearBtn.addEventListener("click", initValue);

popBtns.forEach((btn) => {
    btn.addEventListener('mousedown', (event) => popBgColor(event));
    btn.addEventListener('mouseup', (event) => popBgColor(event));
})

normalBtns.forEach((btn) => {
    btn.addEventListener('click', changeBtnState);
});

// Function
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    if (filling) {
        ctx.fillStyle = color;
        handleCanvasClick();
    } else {
        ctx.strokeStyle = color;
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleRangeChange(event) {
    const value = event.target.value;
    ctx.lineWidth = value;
}

function handleModeClick() {
    if (filling) {
        modeBtn.innerText = "Fill";
    } else {
        modeBtn.innerText = "Paint";
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[EXPORT]";
    link.click();
}

function initValue() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5;
    range.value = 2.5;
    erasing = false;
}

function handlePainting(event) {
    switch(event.type) {
        case 'mousedown':
            painting = true;
        break;
        case 'mouseup':
        case 'mouseleave':
            painting = false;
        break;
        default:
            alert('Error! Please try to click Refresh(F5) button.');
    }
}

function changeErasing() {
    if(erasing) {
        ctx.strokeStyle = colorStorage;
        ctx.lineWidth = ctx.lineWidth / 4;
        colorStorage = null;
        erasing = false;
        eraserBtn.style.backgroundColor = 'white';
        console.log('erasing change to false!');
        console.log(erasing);
    } else {
        colorStorage = ctx.strokeStyle;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = ctx.lineWidth * 4;
        if (filling) {
            handleModeClick();
        }
        erasing = true;
        filling = false;
        eraserBtn.style.backgroundColor = '#a4ebf3';
        modeBtn.style.backgroundColor = 'white';
        console.log('erasing change to true!');
        console.log(erasing);
    }
}

function changeBtnState(event) {
    let id = event.target.id;
    switch(id) {
        case 'jsEraser':
            changeErasing();
            break;
        case 'jsMode':
            handleModeClick();
            if(filling) {
                filling = false;
                modeBtn.style.backgroundColor = 'white';
            } else {
                filling = true;
                erasing = false;
                eraserBtn.style.backgroundColor = 'white';
                modeBtn.style.backgroundColor = '#a4ebf3';
            }
            break;
        default:
            alert('Error! Please try to click Refresh(F5) button.')
    }
}