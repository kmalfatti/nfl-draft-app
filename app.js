var prev;
var timer;

var bye5 = ['atl', 'den', 'no', 'was']
var bye6 = ['buf', 'cin', 'dal', 'sea']
var bye7 = ['det', 'hou']
var bye8 = ['ari', 'gb', 'jax', 'lar', 'nyg', 'ten']
var bye9 = ['chi', 'cle', 'lac', 'min', 'ne', 'pit']
var bye10 = ['bal', 'kc', 'oak', 'phi']
var bye11 = ['car', 'ind', 'mia', 'nyj', 'sf', 'tb']


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

$('#add-player-form').on('submit', function(e){
  e.preventDefault()
  var tdname
  var inputbye;
  var inputname = $('#inputname').val()
  var inputposition = $('#inputposition').val()
  var inputteam = $('#inputteam').val()
  var inputoverall = $('#inputoverall').val() || data.players.length+1
  var inputrank = $('#inputrank').val() || 0
  var inputprojected = $('#inputprojected').val() || 0
  var inputlink = $('#inputlink').val()
  if (bye5.indexOf(inputteam)>-1){inputbye = 5}
  else if (bye6.indexOf(inputteam)>-1){inputbye = 6}
  else if (bye7.indexOf(inputteam)>-1){inputbye = 7}
  else if (bye8.indexOf(inputteam)>-1){inputbye = 8}
  else if (bye9.indexOf(inputteam)>-1){inputbye = 9}
  else if (bye10.indexOf(inputteam)>-1){inputbye = 10}
  else if (bye11.indexOf(inputteam)>-1){inputbye = 11}
  data.players.push({
    name: inputname, 
    link: inputlink,
    position: inputposition.toUpperCase(),
    team: inputteam.toUpperCase(),
    rank: inputrank,
    projected_points: inputprojected,
    bye: inputbye,
    })
  var tdoverall = $('<td>').append(inputoverall)
  if (inputlink==''){
    tdname = $('<td>').append(inputname)
  } else tdname = $('<td>').append($('<a>').attr('href', inputlink).text(inputname).attr('target','_blank'))
  var tdposiotion = $('<td>').append(inputposition.toUpperCase())
  var tdteam = $('<td>').append(inputteam.toUpperCase())
  var tdrank = $('<td>').append(inputrank)
  var tdprojected = $('<td>').append(inputprojected)
  var tdbye = $('<td>').append(inputbye)
  var button = $('<td>').append($('<button>').append().addClass('btn-xs btn-danger').text('Remove').on('click', remove))
  var addrow = $('<tr>').append(tdoverall, tdname, tdposiotion, tdteam, tdrank, tdprojected, tdbye, button)
  $('tbody').append(addrow)
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