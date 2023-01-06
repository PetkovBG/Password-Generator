//We get a reference to the needed elements from the HTML below:

const charAmountRange = document.getElementById('charRange');
const charAmountNumber = document.getElementById('charNumber');
const includeUpperCaseElement = document.getElementById('upperCase');
const includeNumbersElement = document.getElementById('numbers');
const includeSymbolsElement = document.getElementById('symbols');
const passwordDisplay = document.getElementById('pass-display');

//Adding event listeners to the range slider and the number box and tying them to the same function so they can sync


charAmountRange.addEventListener('input', syncCharAmount);
charAmountNumber.addEventListener('input', syncCharAmount);

function syncCharAmount(e) {
const value = e.target.value;
charAmountRange.value = value;
charAmountNumber.value = value;
}

//Getting a reference to the form and tying all boxes to the ranges from the ASCII table

const form = document.getElementById('passwordGeneratorForm');

const lowerCaseCharCodes = arrayGenerator(97, 122);
const upperCaseCharCodes = arrayGenerator(65, 90);
const numberCharCodes = arrayGenerator(48, 57);
const symbolCharCodes = arrayGenerator(33, 47).concat(arrayGenerator(58, 64)).concat(arrayGenerator(91, 96)).concat(arrayGenerator(123, 126));

//We check which boxes are selected and send all information to the generatePassword function

form.addEventListener('submit', e => {
    e.preventDefault();
    const includeUpperCase = includeUpperCaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const charAmount = charAmountNumber.value;

    const password = generatePassword(charAmount, includeUpperCase, includeNumbers, includeSymbols)
    passwordDisplay.textContent = password;
})

//Based on the selections we go through a for loop and generate the password by turning the number value to the respective value from the ASCII table

function generatePassword(charAmount, includeUpperCase, includeNumbers, includeSymbols){
let charCodes = lowerCaseCharCodes;
if(includeUpperCase) {
    charCodes = charCodes.concat(upperCaseCharCodes);
}
if(includeNumbers) {
    charCodes = charCodes.concat(numberCharCodes);
} 
if(includeSymbols) {
    charCodes = charCodes.concat(symbolCharCodes);
}
const passwordResult = [];
for (let i = 0; i < charAmount; i++){
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordResult.push(String.fromCharCode(characterCode));
}
return passwordResult.join('');
}

//This function gives us a range of the possible numbers using the ASCII table for reference

function arrayGenerator(low, high){
    const array = [];
    for(let i = low; i < high; i++){
        array.push(i);
    }
    return array;
}