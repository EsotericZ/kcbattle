listener = {
    presence: function(response) {
        if (response.action === 'join') {
            if(response.occupancy < 2){

                // Add hereNow() function here

                // Player is the Host
                player.name = 'Host';
                player.sign = 'H';
                isHost = true;
                guessWord.innerHTML = 'You are the Host. Waiting for opponent...';
            }                    

            else if(response.occupancy === 2){
                // Player is the Guest
                if(!isHost){
                    player.name = 'Guest';
                    player.sign = 'G';
                    guessWord.innerHTML = `Guess the drawing!`;
                    triesLeft.innerHTML = "Tries Left: 3";
                }

                score.innerHTML = `My Score: ${player.score}`;
                opponentScore.innerHTML = "Opponent's Score: 0";

                connectToChat();
                // Unsubscribe fromm lobby channel
                pubnubGuessGame.removeListener(listener); 
                pubnubGuessGame.unsubscribe({
                    channels: [lobby]
                });       
                gameStart(pubnubGuessGame, ChatEngine, GuessWordChatEngine, game, player);               
            }
        }
    }, 
    status: function(event) {
        if (event.category == 'PNConnectedCategory') {
            setUpCanvas();
        } 
    }   
}

pubnubGuessGame.addListener(listener);