/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// setting variables
var scores, roundScore, activePlayer, playState;

// calling the initialisation function
init();

// rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function() 
{

    // checking the state of the game
    if(playState)
    {
        // randomising the dice throw
        var dice = Math.floor(Math.random() * 6) + 1;

        // Display the dice 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // add to the current value if the dice is NOT 1
        
        if(dice !== 1)
        {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }
        else
        {
            // calling the next player function when a 1 is rolled
            nextPlayer();
        } 
    }
  
  

});

// implementing the hold function to end the turn
document.querySelector('.btn-hold').addEventListener('click', function()
{

    // checking the state of the game
    if(playState)
    {
        // current score to global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    
        // check if player reached 100
        if(scores[activePlayer] >= 100)
            {
                // declaring the winner

                // changing the classes of the winning player to remove the active class and add the winner class and hiding the dice
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                // changing the state of the game to unplayable
                playState = false;
            }
        else
            {
                // calling the next player function if 100 has not been reached
                nextPlayer();
            }
    }

    


});

// funvtion to change the active player
function nextPlayer()
{
    
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
    
}
// creating a new game using the initialisation function
document.querySelector('.btn-new').addEventListener('click', init);


// setting all the necessary variables to default values
function init()
{
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    playState = true;

    // hiding the dice
    document.querySelector('.dice').style.display = 'none';

    // setting all values to 0
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    // remove winner class

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    
}
