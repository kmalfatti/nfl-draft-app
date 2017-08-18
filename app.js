for (i=0; i<data.players.length; i++){
  console.log(i+1+':'+data.players[i])
var yo = $('<td>').append((i+1)+': '+data.players[i].name)
$('body').append('<hr>')
$('body').append(yo)
}