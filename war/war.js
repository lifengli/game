class War {
    constructor() {
        //get new deck of cards and split between 2 players
        this.newdeck = new Deck();
        this.newdeck.getCards();
        this.deck1 = this.newdeck.deck.slice(0, 26);
        this.deck2 = this.newdeck.deck.slice(26);
        //current hand
        this.card1 = null;
        this.card2 = null;
        //save the pending cards on table
        this.pending = [];
        this.winner = null;
        this.finish = false;
    }

    //get card face value
    getValue(card) {
        let dash = card.indexOf('-');
        return Number(card.slice(dash+1));
    }

    //if one deck is empty, we have a winner
    checker() {

        //testing
        document.getElementById('deck1').innerHTML = 'Deck1 ' + this.deck1.length;
        document.getElementById('deck2').innerHTML = 'Deck2 ' + this.deck2.length;

        //if deck1 empty, winner is player2
        if(!this.deck1.length) {
            this.winner = 'Player 2';
            this.finish = true;
            console.log('player 2 wins !!!');
        //if deck2 empty, winner is player1
        } else if(!this.deck2.length) {
            this.winner = 'Player 1';
            this.finish = true;
            console.log('player 1 wins !!!');
        }
    }

    ops(deck, card1, card2) {
        deck.push.apply(deck, this.pending);
        deck.push(card1, card2);
        //reset pending list
        this.pending.length = 0;
        
        //check to see if there is a winner
        this.checker();
    }

    gotowar(card1, card2) {
        //save two equal value cards into pending for winner to pickup
        this.pending.push(card1, card2);

        //save next two "face down" cards
        //if both decks have cards, continue the game
        //otherwise, checker who is the winner and end game
        let nextcard1 = this.deck1.shift();
        let nextcard2 = this.deck2.shift();
        if(nextcard1 && nextcard2) {
            this.pending.push(nextcard1, nextcard2);
        } else {
            this.checker();
        }

        //compare next two "face up" cards
        //if both decks have cards, continue the game
        //otherwise, checker who is the winner and end game
        this.card1 = this.deck1.shift();
        this.card2 = this.deck2.shift();
        if(this.card1 && this.card2) {
            this.compare(this.card1, this.card2);
        } else {
            this.checker();
        }
    }

    compare(card1, card2) {

        //testing
        document.getElementById('card1').innerHTML = 'Card1 ' + this.card1;
        document.getElementById('card2').innerHTML = 'Card2 ' + this.card2;

        let value1 = this.getValue(card1);
        let value2 = this.getValue(card2);

        if(value1 === value2) {
            this.gotowar(card1, card2);

        //treat 1 as Ace
        } else if(value1 === 1 || ( (value1 > value2) && value2 !== 1 ) ) {
            this.ops(this.deck1, card1, card2);
            this.winner = 'Player 1';

        //treat 1 as Ace
        } else if(value2 === 1 || value2 > value1 ) {
            this.ops(this.deck2, card1, card2);
            this.winner = 'Player 2';
        }
    }

    play() {
        this.card1 = this.deck1.shift();
        this.card2 = this.deck2.shift();
        //if both decks have cards, continue the game
        //otherwise, checker who is the winner and end game
        if(this.card1 && this.card2) {
            this.compare(this.card1, this.card2);
        } else {
            this.checker();
        }
    }
}
