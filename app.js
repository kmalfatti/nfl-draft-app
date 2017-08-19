var prev;
var timer;

data.players.forEach((cur, i)=>{
  var overall = $('<td>').append(i+1)
  var name = $('<td>').append($('<a>').attr('href', cur.link).text(cur.name).attr('target','_blank'))
  var position = $('<td>').append(cur.position)
  var team = $('<td>').append(cur.team)
  var rank = $('<td>').append(cur.rank)
  var projected = $('<td>').append(cur.projected_points)
  var bye = $('<td>').append(cur.bye)
  var button = $('<button>').append().addClass('btn-xs btn-danger').text('Remove').on('click', remove)

  var row = $('<tr>').append(overall, name, position, team, rank, projected, bye, button)
  $('tbody').append(row)
})


function remove(){
  prev = $(this).parent();
  console.log(prev)
  var undo = $('<tr>').append($('<td>').append($('<button>').text('Undo')).addClass('undo').attr('colspan', 8).append($('<span>').text(' 5')))
  $(undo).on('click', redisplay)
  $(this).parent().before(undo)
  $(this).parent().hide()
  countdown(4);
}

function countdown(i) {
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
  $(this).hide()
  clearInterval(timer)
}

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