'use strict';

var gCanvas;
var gCtx;

var flag = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var dot_flag = false;

var x = "black";
var y = 2;
var w;
var h;

var gColor = 'blue';


function init() {
    gCanvas = document.querySelector('#paint-canvas');
    gCtx = gCanvas.getContext('2d');
    setColors();

    w = gCanvas.width;
    h = gCanvas.height;

    gCanvas.addEventListener("mousemove", function (event) {
        findxy('move', event)
    }, false);
    gCanvas.addEventListener("mousedown", function (event) {
        findxy('down', event)
    }, false);
    gCanvas.addEventListener("mouseup", function (event) {
        findxy('up', event)
    }, false);
    gCanvas.addEventListener("mouseout", function (event) {
        findxy('out', event)
    }, false);
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - gCanvas.offsetLeft;
        currY = e.clientY - gCanvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            gCtx.beginPath();
            gCtx.fillStyle = gColor;
            gCtx.fillRect(currX, currY, 2, 2);
            gCtx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - gCanvas.offsetLeft;
            currY = e.clientY - gCanvas.offsetTop;
            draw();
        }
    }
}

function draw() {
    gCtx.beginPath();
    gCtx.moveTo(prevX, prevY);
    gCtx.lineTo(currX, currY);
    gCtx.strokeStyle = gColor;
    gCtx.lineWidth = 24;
    gCtx.stroke();
    gCtx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        gCtx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}