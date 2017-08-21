var prev;
var timer;

$(document).ready(function(){
    $('#myTable').DataTable();
});

data.players.forEach((cur, i)=>{
  var overall = $('<td>').append(i+1)
  var name = $('<td>').append($('<a>').attr('href', cur.link).text(cur.name).attr('target','_blank'))
  var position = $('<td>').append(cur.position)
  var team = $('<td>').append(cur.team)
  var rank = $('<td>').append(cur.rank)
  var projected = $('<td>').append(cur.projected_points)
  var bye = $('<td>').append(cur.bye)
  var button = $('<td>').append($('<button>').append().addClass('btn-xs btn-danger').text('Remove').on('click', remove))

  var row = $('<tr>').append(overall, name, position, team, rank, projected, bye, button)
  i%2===0 ? row.css('backgroundColor', 'white') : row.css('backgroundColor', 'rgb(235, 235, 235)')

  $('tbody').append(row)
})


function remove(){
  $('.undo').hide()
  prev = $(this).parent().parent();
  var bgc = prev.css('backgroundColor')
  var undo = $('<tr>').append($('<td>').append($('<button>').text('Undo').addClass('btn-xs btn-warning')).addClass('undo').attr('colspan', 8).append($('<span>').text(' 5')))
  undo.css('backgroundColor', bgc)
  $(undo).on('click', redisplay)
  prev.before(undo)
  prev.hide()
  countdown(4);
}

function countdown(i) {
  clearInterval(timer)
  timer = setInterval(function () {
      $('span').text(" "+i)
      if (i===0){
        $('.undo').parent().hide()
        clearInterval(timer)
      }
      i--;
  }, 1000);
}

function redisplay(){
  $(prev).show()
  $('.undo').hide()
  clearInterval(timer)
}

$('#myTable').dataTable({
  paging: false,
  info: false,
});


//Confirm before closing window
/*
window.onbeforeunload = (e) => {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
};
*/