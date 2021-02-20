const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const eraserBtn = document.getElementById("jseraser");

// Default Value
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let colorStorage;

// 각 기능 on/off
let painting = false;
let filling = false;
let clearing = false;
let erasing = false;


function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// Eraser Function
function changeErasing() {
    if(erasing) {
        erasing = false;
        ctx.strokeStyle = colorStorage;
        ctx.lineWidth = ctx.lineWidth / 4;
        colorStorage = undefined;
    } else {
        colorStorage = ctx.strokeStyle;
        erasing = true;
        getErase();
    }
}

// Painting Function
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

// Background Color Function
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    if (filling) {
        ctx.fillStyle = color;
        handleCanvasClick();
    } else {
        ctx.strokeStyle = color;
    }
}

// Range
function handleRangeChange(event) {
    const value = event.target.value;
    ctx.lineWidth = value;
}

// Fill & Paint on/off
function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// Fill Function
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Prevent right click
function handleCM(event) {
    event.preventDefault();
}

// Save Function
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[EXPORT]";
    link.click();
}

// Clear Function
function getClear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5;
    range.value = 2.5;
    erasing = false;
    console.log(ctx.strokeStyle);
}

// Eraser Function value
function getErase() {
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = ctx.lineWidth * 4;
    console.log(ctx.strokeStyle);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach((color) => 
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}

if (erasing) {
    canvas.addEventListener("mousemove", onMouseMove);
}

eraserBtn.addEventListener("click", changeErasing);
clearBtn.addEventListener("click", getClear);