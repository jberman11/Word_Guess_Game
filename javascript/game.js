


var songTitles = {
    isThisIt :{
        title: "Is This it",
        tracks :{
            num1: "Is This It",
            num2: "The Modern Age",
            num3: "Soma",
            num4: "Barely Legal",
            num5: "Someday",
            num6: "Alone Together",
            num7: "Last Nite",
            num8: "Hard to Explain",
            num9: "New York City Cops",
            num10: "Trying Your Luck",
            num11: "Take It or Leave It"
        }
    },
    // roomOnFire : {

    // },
    // firstImpressionsOfEarth : {

    // },
    // angles : {

    // },
    // countdownMachine : {

    //  } 
}
var wins = document.getElementById("wins")
var guesses = document.getElementById("guesses")
var letters = document.getElementById("letters")
var solution = document.getElementById("solution")
var youLose = document.getElementById("youLose")
var playAgain= document.getElementById("playAgain")
var container = document.getElementById("container")

var test = "location"
var guessCounter = 10
var letterTracker = "1"
var winCounter = 0





//to choose a word and from an object database
    function randomWord (object){
        function randomKey (obj){
            var x = Object.keys(obj)
            var y = ""
           
            y = Math.floor(Math.random()*x.length)
            
            return x[y]
        }
        
        var album = object[randomKey(object)]
           // console.log (album)
        var songs = album.tracks
           // console.log (songs)
        var songChoice = songs[randomKey(songs)]
           // console.log (songChoice) 
        return songChoice
        
        
    } 
    var songTest = randomWord(songTitles)
    console.log (songTest)




//to change strings into corresponding dashes
    function displayWords (string){
        var dashArray = [];
        var dashString = "";

        for (i=0; i<string.length; i++){
            if (string[i] === " "){
                
            } else {
                dashArray.push("- ")
            }
        }
            //console.log(dashArray.length)

        for (i=0; i < dashArray.length; i++){
            dashString += dashArray[i];
                        
        }
           // console.log(dashString)
           // console.log(dashString.length)
           
        return dashString; 
        
    }
   
    
    solution.textContent = displayWords(songTest)
    solution.setAttribute("class","hidden")
    



//to replace each dash with corresponding letters when guessed
    var test2 = "- - - - "
    var test3 = "test"
    
    
    function guessWords (word , input, dashes){
        emptyArray = []
        newString = word.replace(/ /g, "")
        newDashes = dashes.replace(/ /g,"")
        finalString = ""
          
        newString = newString.toLowerCase()

            console.log(newString);console.log(newDashes)
        for( i = 0; i < newDashes.length; i++){
            
            if (newString[i] === input){
                
                emptyArray.push(input)
            }
             if (newString[i] != input){
                emptyArray.push(newDashes[i])

            }
        } //console.log (emptyArray); console.log(emptyArray.length + " " + word.length)

        for(i = 0; i < newDashes.length; i++){

            finalString += emptyArray[i]
            finalString += " "
            
            //console.log (finalString)
        }


        return finalString.toUpperCase()
    }


// to record decrementing guess counts

    function howToLose (string, guess) {
        var x = 0
        
        for(i = 0; i < string.length; i++){
            if (guess === string[i].toLowerCase()){
                x++
                //letterTracker += guess
                console.log(letterTracker)
                break
            } 
  
        }
        for (i = 0; i < letterTracker.length; i++){

            if (guess === letterTracker[i]){
                x++
                //letterTracker += guess
                console.log(letterTracker)
                break 
            }
        }
        if (letterTracker[letterTracker.length - 1] != guess){
        letterTracker += guess
        }
        console.log("x="+x)
        if (x === 0){
            guessCounter--
        }


    }

//to reward winners with a song!

function winList (str1, str2, obj){
   
    
    
}


//EVENTS***************************************************
var stop = 1
document.onkeyup = function(event){
 
    
    console.log("wincounter:"+winCounter)
    console.log("stop:"+stop)
    if(stop === 0){
        return
    }
    if(winCounter === 0) {
        solution.classList.remove("hidden")

    }
    console.log (event)
    console.log (event.keyCode)
    x = 0
     
    if (event.keyCode < 93){
        if (event.keyCode > 64){
                console.log("LT = "+letterTracker)
        howToLose(songTest, event.key)
        if(guessCounter === 0){
            guesses.textContent ="Guesses Left: " + guessCounter
            youLose.textContent =  "You Lose! Would you like to play again?"
            container.classList.remove("hidden")
            stop--
            playAgain.onclick = function (){
                songTest = randomWord(songTitles)
                solution.textContent = displayWords (songTest)
                letters.textContent = ""
                container.classList.add ("hidden")
                guessCounter=10
                letterTracker="1"
                guesses.textContent ="Guesses Left: " + guessCounter
                stop++
           }
        }

        for (i = 0; i < letters.textContent.length; i++){
            if (letters.textContent[i] === event.key)
            x+= 1;
            
        }
        
        if (x === 0){
            letters.textContent += (event.key +", ")
   
        }
    }
    
    solution.textContent = guessWords(songTest, event.key, solution.textContent)
    
    console.log(solution.textContent.replace(/ /g, "").toLowerCase())
    console.log(songTest.replace(/ /g, "").toLowerCase())

    if (solution.textContent.replace(/ /g, "").toLowerCase() === songTest.replace(/ /g, "").toLowerCase()){
        youLose.textContent = "You Win!!! Want to play again?"
        container.classList.remove("hidden")
        stop--
            playAgain.onclick = function (){
                songTest = randomWord(songTitles)
                solution.textContent = displayWords (songTest)
                letters.textContent = ""
                container.classList.add ("hidden")
                guessCounter=10
                guesses.textContent ="Guesses Left: " + guessCounter
                letterTracker="1"
                wins.textContent = ++winCounter
                stop++
            }
    }
    guesses.textContent ="Guesses Left: " + guessCounter
}}
