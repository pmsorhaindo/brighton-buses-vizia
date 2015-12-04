'use strict';

const checkRequiredOptions = require('./checkRequiredOptions');
const dataFetcher = require('./dataFetcher');
const defaultInterval = 10 * 60 * 1000;
const requiredOptions = ['renderer', 'fetchOptions'];

function stopTimer(instance){
  if(instance.timer){
    clearTimeout(instance.timer);
    delete instance.timer;
  }
}

function update(renderer, fetchOptions){
  return dataFetcher(fetchOptions).then(data => renderer(data));
}

function AutoUpdate(options){
  checkRequiredOptions('AutoUpdate', requiredOptions, options);
  this.interval = options.interval || defaultInterval;
  this.renderer = options.renderer;
  this.fetchOptions = options.fetchOptions;
  this.scheduleUpdates = true;
}

AutoUpdate.prototype.start = function start(){
  update(this.renderer, this.fetchOptions).then(() => {
    stopTimer(this);
    if(this.scheduleUpdates){
      this.timer = setTimeout(() => {
        this.start();
      }, this.interval);
    }
  });
};

AutoUpdate.prototype.stop = function stop(){
  stopTimer(this);
  this.scheduleUpdates = false;
}

module.exports = AutoUpdate;
