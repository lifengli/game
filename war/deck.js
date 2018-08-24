//basic class to generate a set of shuffled cards
class Deck {
    constructor() {
        this.deck = [];
        this.suites = ['Club', 'Diamond', 'Heart', 'Spade'];
    }
    
    //for simplisity, I use number 1 - 13, 1 is smallest
    //this will only affect Ace, which should be the largest
    create() {
        for(let s in this.suites) {
            for(let i = 1; i <= 13; i++) {
                this.deck.push(`${this.suites[s]}-${i}`);
            }
        }
    }
    
    randomIndex(low, high) {
        return Math.floor(Math.random() * (high - low + 1)) + low;
    }
    
    //uniformly shuffle the cards to make the order random
    shuffle() {
        if(this.deck.length <= 1) { return; }
        
        for(let idx = 0; idx < this.deck.length - 1; idx++) {
            let idx_random = this.randomIndex(idx, this.deck.length - 1);
            
            if(idx_random !== idx) {
                let swap = this.deck[idx];
                this.deck[idx] = this.deck[idx_random];
                this.deck[idx_random] = swap;
            }
        }
    }
    
    getCards() {
        this.create();
        this.shuffle();
    }
}
