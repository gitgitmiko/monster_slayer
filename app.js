new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        playerMana: 0,
        monsterMana: 0,
        gameIsRunning: false,
        turns: [],
        playerMove: false,
        monsterMove: false,
        specialAttack: false,
        
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.playerMana = 0;
            this.monsterMana = 0;
            this.monsterHealth = 100;
            this.turns= [];
            this.playerMove = true;
            this.specialAttack = false;
        },
        playerAttack: function(){
            if(this.playerMove){
                var damage = this.calculateDamage(3,10);
                this.monsterHealth -= damage;
                var mana = this.calculateMana(15,40);
                this.playerMana += mana;
                if(this.playerMana >= 100){
                    this.playerMana = 100;
                    this.specialAttack = true;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player Hits Monster for ' + damage
                });
                
                setTimeout(() => {
                    this.executeMosterAttack();
                  }, 2000);
                
                if(this.checkWin()){
                    return;
                }
                
            }
            this.playerMove = false;

            //this.monsterAttacks();
        },
        playerSpecialAttack: function(){
            if(this.playerMove){
                if(this.specialAttack){
                    var damage = this.calculateDamage(30,50)
                    this.monsterHealth -= damage;
                    this.playerMana = 0;
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player Hits Monster Hard for ' + damage
                    });
                    this.specialAttack = false;
    
                    if(this.checkWin()){
                        return;
                    }
                    
                    setTimeout(() => {
                        this.executeMosterAttack();
                        }, 2000);    
                }
            }

            //this.monsterAttacks();
        },
        playerHeal: function(){
            if(this.playerMove){
                if(this.playerHealth <= 90){
                    this.playerHealth += 10;
                }
                else
                {
                    this.playerHealth = 100;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player Heals for 10'
                });

                setTimeout(() => {
                    this.executeMosterAttack();
                  }, 2000);
                  
                
            }
            this.playerMove = false;
            //this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
            this.turns= [];
        },
        monsterAttacks: function(){
            var damage = this.calculateDamage(5,12); 
            this.playerHealth -= damage;
            var mana = this.calculateMana(15,40);
                this.monsterMana += mana;
                if(this.monsterMana >= 100){
                    this.monsterMana = 100;
                    this.specialAttack = true;
                }
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster Hits Player for ' + damage
            });
            if(this.checkWin()){
                return;
            }
        },
        monsterSpecialAttack: function(){
            var damage = this.calculateDamage(10,20)
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster Hits Player Hard for ' + damage
            });
            if(this.checkWin()){
                return;
            }
            
        },
        monsterHeal: function(){
            if(this.monsterHealth <= 90){
                this.monsterHealth += 10;
            }
            else
            {
                this.monsterHealth = 100;
            }
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster Heals for 10'
            });
            this.checkWin()
        },
        executeMosterAttack() {
            // Generate a random number between 0 and 2 to choose the method
            const randomNumber = Math.floor(Math.random() * 3);
            
            // Execute the method based on the random number generated
            switch (randomNumber) {
              case 0:
                this.monsterAttacks();
                this.playerMove = true;
                break;
              case 1:
                this.monsterSpecialAttack();
                this.playerMove = true;
                break;
              case 2:
                this.monsterHeal();
                this.playerMove = true;
                break;
              default:
                console.error("Invalid random number generated");
            }
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        calculateMana: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('You Won! New Game ?')){
                    this.startGame();
                    this.turns= [];
                }
                else{
                    this.gameIsRunning = false
                    this.turns= [];
                }
                return true;
            }
            else if (this.playerHealth <= 0){
                if(confirm('You Lost! New Game ?')){
                    this.startGame();
                    this.turns= [];
                }
                else{
                    this.gameIsRunning = false
                    this.turns= [];
                }
                return true
            }
            return false;
        }

    }
})