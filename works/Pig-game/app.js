/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, diceDom, gamePlaying, prevDice;
init();
diceDom = document.querySelector('.dice'); 
gamePlaying = true;
document.querySelector('.dice').style.display = 'none';
function nextPlayer (){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDom.style.display = 'none';
}
function init (){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-' + activePlayer).textContent = 'PLAYER ' +activePlayer;

}



document.querySelector('.btn-roll').addEventListener('click', function(){
if (gamePlaying){
    var dice = Math.floor(Math.random() * 6) + 1;
    diceDom.style.display = 'block';
    diceDom.src = 'img/dice-'+ dice +'.png';

    // if (prevDice === 6 && dice === 6) {
    //     document.querySelector('#score-'+activePlayer).textContent = '0';
    //     nextPlayer();
    //   }

    if (dice !== 1){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        nextPlayer();
    }

     //prevDice = dice;
  

}
});


document.querySelector('.btn-hold').addEventListener('click', function (){
    if (gamePlaying){
    scores[activePlayer] += roundScore;
        
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] ;
    
        var winScore = document.getElementById('input').value;
        if(winScore != Number){
            winScore = 100;
        }
    
    if (scores[activePlayer] >= winScore){
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        // document.querySelector('.btn-hold').style.display = 'none';
        // document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.dice').style.display = 'none';
        gamePlaying = false;    
    }else {
        nextPlayer();
    }
}
});


document.querySelector('.btn-new').addEventListener('click', init);