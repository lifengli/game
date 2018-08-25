class War {
    constructor() {
        //get new deck of cards and split between 2 players
        this.newdeck = new Deck();
        this.newdeck.getCards();
        //we only slice this one time, so won't be a performance issue
        this.deck1 = this.newdeck.deck.slice(0, 26);
        this.deck2 = this.newdeck.deck.slice(26);
        //current hand
        this.card1 = null;
        this.card2 = null;
        //equal valued cards that causing a War
        this.warcard1 = null;
        this.warcard2 = null;
        //save the pending cards on table
        this.pending = [];
        this.winner = null;
        this.finish = false;
        this.iswar = false;
        this.timeout = 2000;
    }

    //get card face value
    getValue(card) {
        let dash = card.indexOf('-');
        return Number(card.slice(dash+1));
    }

    //if one deck is empty, we have a winner
    checker() {
        //assume we have a winner
        this.finish = true;

        //worst case: every hand is equal, both decks exhausted, there is no winner
        if(!this.deck1.length && !this.deck2.length) {
            this.winner = 'no winner';
        }
        //if deck1 empty, winner is player2
        else if(!this.deck1.length) {
            this.winner = 'Player 2';
        //if deck2 empty, winner is player1
        } else if(!this.deck2.length) {
            this.winner = 'Player 1';
        } else {
            //continue game
            this.finish = false;
        }
    }

    ops(deck, card1, card2) {
        //winner get all pending cards and current face up cards
        deck.push.apply(deck, this.pending);
        deck.push(card1, card2);

        //reset pending list
        this.pending.length = 0;

        //check to see if there is a winner
        this.checker();
    }

    gotowar(card1, card2) {
        this.iswar = true;
        //save two equal value cards into pending for winner to pickup
        this.pending.push(card1, card2);

        this.warcard1 = card1;
        this.warcard2 = card2;

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
            setTimeout( () => {
                this.compare(this.card1, this.card2) },
                this.timeout
            );
        } else {
            this.checker();
        }
    }

    compare(card1, card2) {
        //get card face values
        let value1 = this.getValue(card1);
        let value2 = this.getValue(card2);

        //this may run into a loop with gotowar
        //until one of the decks exhausted
        if(value1 === value2) {
            this.gotowar(card1, card2);

        //treat 1 as Ace
        } else if(value1 === 1 || ( (value1 > value2) && value2 !== 1 ) ) {
            this.iswar = false;
            this.ops(this.deck1, card1, card2);
            this.winner = 'Player 1';

        //treat 1 as Ace
        } else if(value2 === 1 || value2 > value1 ) {
            this.iswar = false;
            this.ops(this.deck2, card1, card2);
            this.winner = 'Player 2';
        }
    }

    play() {
        //frequent shift() could be a performance issue, but not much difference for an array this small
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
