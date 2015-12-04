'use strict';

const AutoUpdate = require('../lib/AutoUpdate');
const dataParser = require('../lib/dataParser');
const debounce = require('debounce');
const resizeHelper = require('../lib/resizeHelper');
const template = require('../templates/busestile.html');
require('../css/BrightonBusesTileView.css');

function elOrientationIsLandscape(el){
  const ratio = el.offsetWidth / el.offsetHeight;
  return ratio > 1;
}

function BrightonBusesTileView(options){
  this.options = options.data;
  this.el = document.createElement('div');
  this.el.className ='BrightonBusesTileView vz-custom__tile';
  this.debouncedOnResize = debounce(() => this.load(this.data), 500);

  window.addEventListener('resize', this.debouncedOnResize);
  this.autoUpdate = new AutoUpdate({
    renderer: data => this.load(data),
    fetchOptions: this.options
  });
  this.autoUpdate.start();
}

BrightonBusesTileView.prototype.load = function load(data){
  const parsedData = dataParser(data);
  if(!parsedData.currently){
    return;
  }
  const templateData = parsedData.currently;
  this.data = data;
  templateData.isLandscape = elOrientationIsLandscape(this.el);
  this.el.innerHTML = template(templateData);
  resizeHelper(this.el);
};

BrightonBusesTileView.prototype.onResize = function onResize(){
  this.load(this.data);
};

BrightonBusesTileView.prototype.unload = function unload(){
  window.removeEventListener('resize', this.debouncedOnResize);
  this.debouncedOnResize = undefined;
  this.autoUpdate.stop();
  this.autoUpdate = undefined;
  this.el.remove();
};

module.exports = BrightonBusesTileView;
