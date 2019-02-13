'use strict';

var gCanvas;
var gCtx;

var flag = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;


var width;
var height;
var gShape = 'Normal';

var gColor = 'black';


function init() {
    gCanvas = document.querySelector('#paint-canvas');
    gCtx = gCanvas.getContext('2d');
    setColors();

    width = gCanvas.width;
    height = gCanvas.height;

    gCanvas.addEventListener("mousemove", function(event) {
        findxy('move', event)
    }, false);
    gCanvas.addEventListener("mousedown", function(event) {
        findxy('down', event)
    }, false);
    gCanvas.addEventListener("mouseup", function(event) {
        findxy('up', event)
    }, false);
    gCanvas.addEventListener("mouseout", function(event) {
        findxy('out', event)
    }, false);
    gCanvas.addEventListener("click", function(event) {
        findxy('click', event)
    }, false);
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - gCanvas.offsetLeft;
        currY = e.clientY - gCanvas.offsetTop;

        flag = true;
        gCtx.beginPath();
        gCtx.fillStyle = gColor;
        if (gShape === 'Normal') {
            gCtx.fillRect(currX, currY, 2, 2);
            gCtx.closePath();
        }
        if (gShape === 'CIRCLES ◉') {
            gCtx.arc(currX, currY, 50, 0, 2 * Math.PI);
            gCtx.stroke();
        }

    }
    if (res == 'up' || res == 'out') {
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
    if (gShape === 'Normal') {
        gCtx.strokeStyle = gColor;
        gCtx.lineWidth = 1;
        gCtx.lineTo(currX, currY);
    }
    if (gShape === 'CIRCLES ◉') {
        gCtx.arc(currX, currY, 50, 0, 2 * Math.PI);
    }
    gCtx.closePath();
    gCtx.stroke();
}

function erase() {
    var clear = confirm("Want to clear");
    if (clear) {
        gCtx.clearRect(0, 0, width, height);
        $("#canvasimg").css('display', 'none');
    }
}

function save() {
    $("#canvasimg").css('border', '2px solid');
    var dataURL = gCanvas.toDataURL();
    $("#canvasimg").attr('src', dataURL);
    $("#canvasimg").css('display', 'inline');
}


function selectShape(shape) {
    gShape = shape;
}

function downloadImg(elBtn) {
    var imgContent = gCanvas.toDataURL('image/png');
    elBtn.href = imgContent;
}