'use strict';

const checkRequiredOptions = require('./checkRequiredOptions');
const requiredOptions = ['geocoderOptions', 'units'];

function fetch(options){
  checkRequiredOptions('dataFetcher', requiredOptions, options);
  const latitude = options.geocoderOptions.coordinates[0];
  const longitude = options.geocoderOptions.coordinates[1];
  const units = options.units;
  const url = `/api/forecast/${latitude}/${longitude}/${units}`;

  return self.fetch(url).then(response => {
    if(!response.ok){
      throw new Error(`Server returned a non-2xx status code: ${response.statusCode}`);
    }
    return response.json();
  });
}

module.exports = fetch;
