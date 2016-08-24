//Utils!

import $ from 'jquery';

function showErrorMessage(appendTo, message, id) {
  $(appendTo)
    .append('<div id='+ '"'+id+ '"' + '>'+ message+' </div>')
    .hide()
    .fadeIn(999)
    .fadeOut(999)
    .queue(next => {
      $(`#${id}`).remove();
      next();
    });
}

// UserMakeInstrument.jsx

   const mapIdsToKeys= {
      '#1': 'A',
      '#2': 'S',
      '#3': 'D',
      '#4': 'F',
      '#5': 'G',
      '#6': 'H',
      '#7': 'J',
      '#8': 'K',
      '#9': 'L',
    };



    const mapKeysToIds= {
      'A': '#1',
      'S': '#2',
      'D': '#3',
      'F': '#4',
      'G': '#5',
      'H': '#6',
      'J': '#7',
      'K': '#8',
      'L': '#9',
    };

module.exports.mapIdsToKeys=mapIdsToKeys;
module.exports.mapKeysToIds=mapKeysToIds;
module.exports.showErrorMessage=showErrorMessage;