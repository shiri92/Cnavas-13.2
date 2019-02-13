'use strict';

function changeBackColor() {
    var backColor = $('.input-back').val();
    $('body').css('backgroundColor', backColor);
    saveToStorage('backgroundColor', backColor);
  }
  
  function changeTextColor() {
    var color = $('.input-text').val();
    gColor = color;
    $('body').css('color', color);
    saveToStorage('color', color);
  }

  function setColors() {
    var backColor = loadFromStorage('backgroundColor');
    $('body').css('backgroundColor', backColor);
    $('.input-back').val(backColor);
  
    var textColor = loadFromStorage('color');
    $('body').css('color', textColor);
    $('.input-text').val(textColor);
  }
