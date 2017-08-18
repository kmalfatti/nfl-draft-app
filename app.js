data.players.forEach((cur, i)=>{
  // console.log(i)
  var overall = $('<td>').append(i+1)
  var name = $('<td>').append($('<a>').attr('href', cur.link).text(cur.name).attr('target','_blank'))
  var position = $('<td>').append(cur.position)
  var team = $('<td>').append(cur.team)
  var rank = $('<td>').append(cur.rank)
  var projected = $('<td>').append(cur.projected_points)
  var bye = $('<td>').append(cur.bye)
  var button = $('<button>').append().addClass('btn btn-danger').text('Remove')

  var row = $('<tr>').append(overall, name, position, team, rank, projected, bye, button)
  $('tbody').append(row)
})


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