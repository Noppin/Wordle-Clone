import { fetchWords } from "./fetchWords.js";

const words = await fetchWords();
const guesses = document.querySelectorAll(".row")
const keys = [...document.querySelectorAll(".key-btn")];
const correctWord =[...words[randomNum(words.length)]];
const allowedLetters = "abcdefghijklmnopqrstuvwxyz";
const enterAndDelete = ["Enter", "Backspace"];
let rowCharIndex = 0;
let wordRowIndex = 0;
let userInput = "";
let newUserInput;

const checkletterValidation =(charRow)=>{
    correctWord.forEach((char, index) =>{
            
            if(char === userInput[index]){
                    charRow[index].classList.add("greenColour");        
            }
            else if(correctWord.includes(userInput[index])){
                    charRow[index].classList.add("yellowColour");
            }
            else if(char !== userInput[index]){
                    charRow[index].classList.add("greyColour");
                  keys.forEach(el =>{
                    if(el.textContent.toLowerCase() === userInput[index]){
                        el.classList.add("greyColour");
                    }
                  });
            }
                });
}
keys.forEach((key)=>{

    key.addEventListener("mouseup", (e)=>{
        const charRow =  guesses[wordRowIndex].querySelectorAll(".char");

        if(wordRowIndex === 5 && rowCharIndex === 5){
            if(e.currentTarget.textContent === "Enter"){
                rowCharIndex = 0;
                if(!words.includes(userInput)){
                     alert("the word doesn't contain in the library")
                    charRow.forEach(char => char.textContent = "");
                }
                
               else if(userInput === correctWord.join("")){
                       setTimeout(()=>{
                        alert("You won");
                        location.reload();
                       },500) 
                       charRow.forEach(row => row.classList.add("greenColour"));
                }
                else if(userInput !== correctWord.join("")){
                        checkletterValidation(charRow);
                        setTimeout(()=>{
                    alert(`The correct word was: ${correctWord.join("")}`);
                    location.reload();
                },500);
                }
                 
                userInput = "";
                
            }
            else if(e.currentTarget.textContent === "Del"){
                rowCharIndex--;
                newUserInput = userInput.substring(0, 4);
                userInput = newUserInput;
                charRow[charRow.length-1].textContent = "";
            }
        }
        // checks whether the word has reached 5 characters
        else if(rowCharIndex === 5){   

            // only moves to the next guess, once "enter" has been clicked
            if(e.currentTarget.textContent === "Enter"){
                rowCharIndex = 0;
                if(!words.includes(userInput)){
                     alert("the word doesn't contain in the library")
                    charRow.forEach(char => char.textContent = "");
                }
                
               else if(userInput === correctWord.join("")){
                       setTimeout(()=>{
                        alert("You won");
                        location.reload();
                       },500) 
                       charRow.forEach(row => row.classList.add("greenColour"));
                }
                else if(userInput !== correctWord.join("")){
                         wordRowIndex++;
                        checkletterValidation(charRow);
                }
                userInput = "";
            }
            else if(e.currentTarget.textContent === "Del"){
                rowCharIndex--;
                newUserInput = userInput.substring(0, 4);
                userInput = newUserInput;
                charRow[charRow.length-1].textContent = "";
            }
        }
        // stops adding character once it reaches 5
        else if(wordRowIndex < 6){

            if(rowCharIndex < 5){
                if(e.currentTarget.textContent !== "Enter" && e.currentTarget.textContent !== "Del"){
                    userInput += e.currentTarget.textContent.toLowerCase();
                    charRow[rowCharIndex].innerHTML = e.currentTarget.textContent;
                }
            }
            // only increments if "enter" isn't pressed
           if(e.currentTarget.textContent !== "Enter" && e.currentTarget.textContent !== "Del"){
                rowCharIndex++;
            }
        
          if(e.currentTarget.textContent === "Del"){
            if(rowCharIndex > 0){
                rowCharIndex--;
                if(charRow[0].textContent ===""){
                    userInput = "";
                }
                else{
                    for(let i = 0; i< correctWord.length; i++){
                    if(charRow[i].textContent === ""){
                        newUserInput = userInput.substring(0, i -1);
                   userInput = newUserInput;
                    charRow[i-1].textContent = "";
                    }
                    }
                
            }
            }
                
        }       
        }
    })
    
});

document.addEventListener('keydown', (e)=>{
    const charRow =  guesses[wordRowIndex].querySelectorAll(".char");
        if(enterAndDelete.some(key => key === e.key) || allowedLetters.includes(e.key)){
            if(wordRowIndex === 5 && rowCharIndex === 5){
            if(e.keyCode === 13){
                rowCharIndex = 0;
                if(!words.includes(userInput)){
                     alert("the word doesn't contain in the library")
                    charRow.forEach(char => char.textContent = "");
                }
                
               else if(userInput === correctWord.join("")){
                       setTimeout(()=>{
                        alert("You won");
                        location.reload();
                       },500) 
                       charRow.forEach(row => row.classList.add("greenColour"));
                }
                else if(userInput !== correctWord.join("")){
                        checkletterValidation(charRow);
                        setTimeout(()=>{
                    alert(`The correct word was: ${correctWord.join("")}`);
                    location.reload();
                },500);
                }
                 
                userInput = "";
            }
            else if(e.keyCode === 8){
                rowCharIndex--;
                newUserInput = userInput.substring(0, 4);
                userInput = newUserInput;
                charRow[charRow.length-1].textContent = "";
            }
        }
        // checks whether the word has reached 5 characters
        else if(rowCharIndex === 5){   

            // only moves to the next guess, once "enter" has been pressed
            if(e.keyCode === 13){
                rowCharIndex = 0;
                if(!words.includes(userInput)){
                     alert("the word doesn't contain in the library")
                    charRow.forEach(char => char.textContent = "");
                }
                
               else if(userInput === correctWord.join("")){
                       setTimeout(()=>{
                        alert("You won");
                        location.reload();
                       },500) 
                       charRow.forEach(row => row.classList.add("greenColour"));
                }
                else if(userInput !== correctWord.join("")){
                         wordRowIndex++;
                        checkletterValidation(charRow);   
                }
                userInput = "";
            }
            else if(e.keyCode === 8){
                rowCharIndex--;
                newUserInput = userInput.substring(0, 4);
                userInput = newUserInput;
                charRow[charRow.length-1].textContent = "";
            }
        }
        // stops adding character once it reaches 5
        else if(wordRowIndex < 6){

            if(rowCharIndex < 5){
                if(e.keyCode !== 13 && e.keyCode !== 8 && e.keyCode !== 32){
                    userInput += e.key.toLowerCase();
                    charRow[rowCharIndex].innerHTML = e.key.toUpperCase();
                }
            }
            // only increments if "enter" isn't pressed
           if(e.keyCode !== 13 && e.keyCode !== 8 && e.keyCode !== 32 ){
                rowCharIndex++;
            }
        
          if(e.keyCode === 8){
            if(rowCharIndex > 0){
                rowCharIndex--;
                if(charRow[0].textContent ===""){
                    userInput = "";
                }
                else{
                    for(let i = 0; i< correctWord.length; i++){
                    if(charRow[i].textContent === ""){
                        newUserInput = userInput.substring(0, i -1);
                   userInput = newUserInput;
                    charRow[i-1].textContent = "";
                    }
                    }
                
            }
            }
                
        }       
        }
        }
        
});

function randomNum(x){
    return Math.floor(Math.random() * x);
}


