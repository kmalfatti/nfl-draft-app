var prev;
var timer;
var round = 1;

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
  var add = $('<td>').append($('<span>').addClass('glyphicon glyphicon-plus'))
  var button = $('<td>').append($('<button>').append().addClass('btn-xs btn-danger').text('Remove').on('click', remove))

  var row = $('<tr>').append(overall, name, position, team, rank, projected, bye, add, button)
  i%2===0 ? row.css('backgroundColor', 'white') : row.css('backgroundColor', 'rgb(235, 235, 235)')

  $('#tbody-available-players').append(row)
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
  var tddraft = $('<td>').append($('<span>').addClass('glyphicon glyphicon-plus').on('click', addplayer))
  var button = $('<td>').append($('<button>').append().addClass('btn-xs btn-danger').text('Remove').on('click', remove))
  var addrow = $('<tr>').append(tdoverall, tdname, tdposiotion, tdteam, tdrank, tdprojected, tdbye, tddraft, button)
  inputoverall%2===1 ? addrow.css('backgroundColor', 'white') : addrow.css('backgroundColor', 'rgb(235, 235, 235)')
  $('#myTable').DataTable().rows.add(addrow)
  $('#myTable').DataTable().columns.adjust().draw()
})

function remove(){
  $('.undo').hide()
  prev = $(this).parent().parent();
  var bgc = prev.css('backgroundColor')
  var undo = $('<tr>').append($('<td>').append($('<button>').text('Undo').addClass('btn-xs btn-warning')).addClass('undo').attr('colspan', 9).append($('<span>').text(' 5').addClass('timer')))
  undo.css('backgroundColor', bgc)
  $(undo).on('click', redisplay)
  prev.before(undo)
  prev.hide()
  countdown(4);
}

function countdown(i) {
  clearInterval(timer)
  console.log('in here')
  $('.btn-danger').prop('disabled', true)
  $('.glyphicon-plus').css('pointer-events', 'none')
  $('.glyphicon-plus').parent().toggleClass('disabled')
  timer = setInterval(function () {
      $('.timer').text(" "+i)
      if (i===0){
        $('.btn-danger').prop('disabled', false)
        $('.glyphicon-plus').css('pointer-events', 'auto')
        $('.glyphicon-plus').parent().toggleClass('disabled')
        $('.undo').parent().hide()
        clearInterval(timer)
        if(prev.parent().parent().attr('id')=='my-players' ){
          round--
          var player = prev.children()
          var name = player[1]
          var overallpick = $('<td>').append($(name).attr('data'))
          var position = player[2]
          var team = player[3]
          var rank = player[4]
          var projected = player[5]
          var bye = player[6]
          var add = $('<td>').append($('<span>').addClass('glyphicon glyphicon-plus').on('click', addplayer))
          var remove = player[7]
          var readdrow = $('<tr>').append(overallpick, name, position, team, rank, projected, bye, add, remove)
          $('#myTable').DataTable().rows.add(readdrow)
          $('#myTable').DataTable().columns.adjust().draw()
        }
      }
      i--;
  }, 1000);
}

// function cursor(){
  
// }

function redisplay(){
  $(prev).show()
  $('.undo').hide()
  clearInterval(timer)
  $('.btn-danger').prop('disabled', false)
  $('.glyphicon-plus').css('pointer-events', 'auto')
  $('.glyphicon-plus').parent().toggleClass('disabled') 
}

$('#myTable').dataTable({
  paging: false,
  info: false,
});

$('.glyphicon-plus').on('click', addplayer)

function addplayer(){
    var player = $(this).parent().parent().children()
    var name = player[1]
  // if (confirm('Are you sure you want to draft '+name.innerText+'?')===true){ 
    var overall = player[0].innerText
    $(this).parent().parent().children()[0].remove()
    $(this).parent().remove()
    $(name).attr('data', overall)
    var tdround = $('<td>').append(round)
    var position = player[2]
    var team = player[3]
    var rank = player[4]
    var projected = player[5]
    var bye = player[6]
    var remove = player[8]
    var newPlayer = $('<tr>').append(tdround, name, position, team, rank, projected, bye, remove)
    $('#my-players').append(newPlayer)
    round++
  // }
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

