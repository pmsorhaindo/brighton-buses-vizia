'use strict';

function checkRequiredOptions(moduleName, requiredOptions, options){
  if(!options || typeof options !== 'object'){
    throw new Error(`${moduleName} requires an options hash`);
  }

  requiredOptions.forEach(option => {
    if(options[option] === undefined){
      throw new Error(`${moduleName} requires ${option}`);
    }
  });
};

module.exports = checkRequiredOptions;
