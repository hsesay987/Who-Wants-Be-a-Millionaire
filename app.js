// // src/supabase.js
// import { createClient } from '@supabase/supabase-js'
//
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
//
// const { createApp } = Vue;
//
// createApp({
//     data() {
//         return {
//             selectedAnswer: null,
//             showStartDiv: true,
//             showNameDiv: false,
//             showGameDiv: false,
//             showFinalDiv: false,
//             name: "Player1",
//             timer: 15,
//             gameData: [], // initially empty, will load from JSON
//             earnings: 0,
//             nextDisabled: true,
//             answerDisabled: false,
//             i: 0,
//             remainingTime: 0,
//             answeredCorrect: 0,
//             interval: null,
//         };
//     },
//     mounted() {
//         // Load questions from JSON file on mount
//         fetch('WWTBAM_questions.json')
//             .then(response => response.json())
//             .then(data => {
//                 this.gameData = data;
//             })
//             .catch(error => console.error("Failed to load questions:", error));
//     },
//     methods: {
//         toggleStartAndName() {
//             this.showStartDiv = !this.showStartDiv;
//             this.showNameDiv = !this.showNameDiv;
//         },
//         greet() {
//             return `Press continue if you are Ready to Play  ${this.name}`;
//         },
//         toggleNameAndGame() {
//             this.showNameDiv = !this.showNameDiv;
//             this.showGameDiv = !this.showGameDiv;
//             // Reset game variables on new game start
//             this.i = 0;
//             this.earnings = 0;
//             this.answeredCorrect = 0;
//             this.nextDisabled = true;
//             this.answerDisabled = false;
//             this.timer = 15;
//             this.remainingTime = 0;
//         },
//         startTimer() {
//             clearInterval(this.interval);
//             this.interval = setInterval(() => {
//                 if (this.timer > 0) {
//                     this.timer--;
//                 } else {
//                     clearInterval(this.interval);
//                     this.answerDisabled = true;
//                     this.nextDisabled = true;
//                 }
//             }, 1000);
//         },
//         stopTimer() {
//             this.remainingTime += this.timer;
//             clearInterval(this.interval);
//             if (this.i < 5) {
//                 this.timer = 15;
//             } else if (this.i < 10) {
//                 this.timer = 30;
//             } else if (this.i < 14) {
//                 this.timer = 45;
//             } else if (this.i === 14) {
//                 this.timer = this.remainingTime + 60;
//             }
//         },
//         startFunction() {
//             this.toggleStartAndName();
//         },
//         continueFunction() {
//             if (!this.name.trim()) {
//                 alert("Please enter your name");
//                 return;
//             }
//             this.toggleNameAndGame();
//             this.startTimer();
//         },
//         answerSelection(event) {
//             if (this.answerDisabled) return; // prevent double answer
//             this.stopTimer();
//             this.selectedAnswer = event.target.value;
//             let correctAnswer = "" + this.gameData[this.i].correct;
//
//             if (this.selectedAnswer === correctAnswer) {
//                 event.target.style.backgroundColor = "green";
//                 this.answerDisabled = true;
//                 this.nextDisabled = false;
//                 this.answeredCorrect++;
//                 this.earnings = this.gameData[this.i].value;
//             } else {
//                 event.target.style.backgroundColor = "red";
//                 this.answerDisabled = true;
//                 this.nextDisabled = true;
//             }
//         },
//         nextQuestion() {
//             if (this.i < this.gameData.length - 1) {
//                 this.i++;
//                 this.answerDisabled = false;
//                 this.nextDisabled = true;
//                 this.timer = 15;
//                 this.remainingTime = 0;
//                 for (let j = 1; j <= 4; j++) {
//                     let resetColor = document.getElementById("option" + j);
//                     if (resetColor) resetColor.style.backgroundColor = "darkblue";
//                 }
//                 this.startTimer();
//             } else {
//                 this.toggleGameAndFinal();
//             }
//         },
//         endGame() {
//             this.toggleGameAndFinal();
//         },
//         toggleGameAndFinal() {
//             this.showGameDiv = !this.showGameDiv;
//             this.showFinalDiv = !this.showFinalDiv;
//             clearInterval(this.interval);
//         },
//         async saveScoreToSupabase() {
//             if (!this.name.trim()) {
//                 alert("Enter your name before saving.");
//                 return;
//             }
//             try {
//                 let { data, error } = await supabase
//                     .from('scores') // your Supabase table name
//                     .insert([
//                         {
//                             player: this.name,
//                             correct: this.answeredCorrect,
//                             earnings: this.earnings,
//                             played_at: new Date().toISOString(),
//                         },
//                     ]);
//                 if (error) {
//                     alert("Failed to save score: " + error.message);
//                     console.error(error);
//                 } else {
//                     alert("Score saved successfully!");
//                 }
//             } catch (err) {
//                 console.error(err);
//                 alert("An unexpected error occurred.");
//             }
//         },
//     }
// }).mount("#app");
const {createApp} = Vue

createApp({
    data() {
        return {
            selectedAnswer: null,
            showStartDiv: true,
            showNameDiv: false,
            showGameDiv: false,
            showFinalDiv: false,
            name: "Player1",
            timer: 15,
            gameData: [{
                "question" : "In what children's game are participants chased by someone designated \"It\"?",
                "content" : [
                    "Tag",
                    "Simon Says",
                    "Charades",
                    "Hopscotch"
                ],
                "correct" : 0,
                "value" : 100
            },
                {
                    "question" : "On a radio, stations are changed by using what control?",
                    "content" : [
                        "Tuning",
                        "Volume",
                        "Bass",
                        "Treble"
                    ],
                    "correct" : 0,
                    "value" : 200
                },
                {
                    "question" : "Which material is most dense?",
                    "content" : [
                        "Silver",
                        "Styrofoam",
                        "Butter",
                        "Gold"
                    ],
                    "correct" : 3,
                    "value" : 300
                },
                {
                    "question" : "Which state in the United States is largest by area?",
                    "content" : [
                        "Alaska",
                        "California",
                        "Texas",
                        "Hawaii"
                    ],
                    "correct" : 0,
                    "value" : 500
                },
                {
                    "question" : "What is Aurora Borealis commonly known as?",
                    "content" : [
                        "Fairy Dust",
                        "Northern Lights",
                        "Book of ages",
                        "a Game of Thrones main character"
                    ],
                    "correct" : 1,
                    "value" : 1000
                },
                {
                    "correct": 3,
                    "content": [
                        "developed the telescope",
                        "discovered four satellites of Jupiter",
                        "discovered that the movement of pendulum produces a regular time measurement",
                        "All of the above"
                    ],
                    "question": "Galileo was an Italian astronomer who",
                    "value" : 2000
                },
                {
                    "correct": 3,
                    "content": [
                        "the infrared light kills bacteria in the body",
                        "resistance power increases",
                        "the pigment cells in the skin get stimulated and produce a healthy tan",
                        "the ultraviolet rays convert skin oil into Vitamin D"
                    ],
                    "question": "Exposure to sunlight helps a person improve his health because",
                    "value" : 4000
                },
                {
                    "correct": 0,
                    "content": [
                        "a club or a local sport association for remarkable achievements",
                        "amateur athlete, not necessarily an Olympian",
                        "National Olympic Committee for outstanding work",
                        "None of the above"
                    ],
                    "question": "Sir Thomas Fearnley Cup is awarded to",
                    "value" : 8000
                },
                {
                    "correct": 1,
                    "content": [
                        "1968",
                        "1929",
                        "1901",
                        "1965"
                    ],
                    "question": "Oscar Awards were instituted in",
                    "value" : 16000
                },
                {
                    "correct": 2,
                    "content": [
                        "1998",
                        "1989",
                        "1979",
                        "1800"
                    ],
                    "question": "When did Margaret Thatcher became the first female Prime Minister of Britain?",
                    "value" : 32000
                },
            ],
            earnings: 0,
            nextDisabled: true,
            answerDisabled: false,
            i: 0,
            remainingTime: 0,
            answeredCorrect: 0
        }
    },
    methods: {
        toggleStartAndName: function() {
            this.showStartDiv = !this.showStartDiv;
            this.showNameDiv = !this.showNameDiv;
        },
        greet: function () {
            return `Press continue if you are Ready to Play  ${this.name}`
        },
        toggleNameAndGame: function() {
            this.showNameDiv = !this.showNameDiv;
            this.showGameDiv = !this.showGameDiv;
        },
        startTimer: function () {
                this.interval = setInterval(() => {
                    if (this.timer > 0) {
                        this.timer--;
                    } else {
                        clearInterval(this.interval);
                    }
                }, 1000);
        },
        stopTimer() {
            this.remainingTime += this.timer;
            clearInterval(this.interval);
            if (this.i < 5){
                this.timer = 15;
            }
            else if (this.i < 10){
                this.timer = 30;
            }
            else if (this.i < 14){
                this.timer = 45;
            }
            else if (this.i === 14){
                this.timer = this.remainingTime + 60;
            }
        },
        startFunction: function(){
            this.toggleStartAndName();
        },
        continueFunction: function(){
            this.toggleNameAndGame();
            this.startTimer();
        },
        answerSelection: function(event){
            this.stopTimer();
            this.selectedAnswer = event.target.value;
            let correctAnswer = "" + this.gameData[this.i].correct + "";

            if (this.selectedAnswer === correctAnswer){
                event.target.style.backgroundColor = "green";
                this.answerDisabled = true;
                this.nextDisabled = false;
                this.answeredCorrect++;
                if((this.i) % 5 === 0){
                    this.earnings = this.gameData[this.i-1].value;
                }
            }
            else if(this.selectedAnswer !== correctAnswer){
                event.target.style.backgroundColor = "red";
                this.answerDisabled = true;
                this.nextDisabled = true;
            }
        },
        nextQuestion: function(){
            this.startTimer();
            if(this.i < this.gameData.length) {
                this.answerDisabled = false;
                this.i++;
                for(let j = 1; j < 5; j++){
                    let resetColor = document.getElementById("option"+j);
                    resetColor.style.backgroundColor = "darkblue";
                }
            }
            else if (this.i === this.gameData.length){
                this.toggleGameAndFinal();
            }
        },
        endGame: function(){
            this.toggleGameAndFinal();

        },
        toggleGameAndFinal: function() {
            this.showGameDiv = !this.showGameDiv;
            this.showFinalDiv = !this.showFinalDiv;
        }

    }
}).mount("#app")