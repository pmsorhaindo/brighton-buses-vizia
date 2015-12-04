'use strict';

const targetWidth = 444;
const targetHeight = 227;

function getPixelSize(size, scale, minimum){
  const scaledSize = Math.floor(parseInt(size, 10) * scale);
  return Math.max(minimum, scaledSize);
}

function setFontSize(el, scale){
  const targetFontSize = parseInt(el.getAttribute('data-targetfontsize'), 10);
  const minimumFontSize = parseInt(el.getAttribute('data-minimumfontsize'), 10) || 0;
  const fontSize = getPixelSize(targetFontSize, scale, minimumFontSize);
  el.style.fontSize = `${fontSize}px`;
}

function resize(el){
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  const factorWidth = width / targetWidth;
  const factorHeight = height / targetHeight;
  const factor = factorWidth > factorHeight ? factorHeight : factorWidth;

  if(!factor){
    return;
  }

  const textElNodeList = el.querySelectorAll('*[data-targetfontsize]');
  Array.prototype.slice.call(textElNodeList).forEach(node => setFontSize(node, factor));
}

module.exports = resize;
