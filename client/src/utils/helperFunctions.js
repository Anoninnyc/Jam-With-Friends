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



module.exports.showErrorMessage=showErrorMessage;
