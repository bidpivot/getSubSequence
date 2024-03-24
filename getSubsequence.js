const getSubsequenceRecursive = require('./getSubsequenceRecursive');

function getSubsequenceCount(a, b) {
    const m = b.length;
    // Creating a 2D array called 'scoreTable' that will keep track of how many matches and subsequences there are as we work through nested loops comparing the two strings 
    // the 2d array will look like a table with the row length being the length of string A + 1 (which is always 4 in the question) because string A is always 3 chars 
    // and the number of rows of the table will be the length of string b   
    const scoreTable = Array.from({ length: m + 1 }, () => Array(4).fill(0));
    
    // we fill the first item of each row/array with the number 1
    // in other words, the first column of the scoreTable will be filled with 1s
    // the rest of the scoreTable will start with zeros until we work through the loops
    //  we need the first item to always equal 1 to have a starting point to carry forward if there is a matching letter in the strings
  //  this is a key part of the logic of the solution which is explained more below
  //  it's easier to see why this is necessary if you console.log(scoreTable) and visualize how the matches accrue as we loop through the two strings.
    for (let row = 0; row <= m; row++) {
        scoreTable[row][0] = 1;
    }
    
    // now we run through nested loops to fill in the scoreTable and actually keep track of how many subsequences of string A there are in string B
    // comparing chars in both strings to see where there are matches
    for (let row = 1; row <= m; row++) { // this is the outer loop that iterates over each row of the scoreTable
        for (let column = 1; column <= 3; column++) { // this is the inner loop which iterates over each item or 'cell' of each row
            const cellAbove = scoreTable[row - 1][column] // this represents the cell immediately above the current cell that we are about to update depending on the condition below
            const cellAboveLeft = scoreTable[row - 1][column - 1] // this cell represents the cell above and one previous (to the left) of the cell we are updating
            if (b[row - 1] === a[column - 1]) { // our condition: if the corresponding letters in the two strings match then...
                scoreTable[row][column] = cellAbove + cellAboveLeft; // set the value of the current cell to the value of the cell above + the value of the cell above and one left (or one previous)
                // the cellAboveLeft corresponds to the previous letter in string A
                // this will accrue the number of subsequences we have as we work through the loop
                // this is the key logic of the solution.  I explained it a little more in the comments after the function
            } else {
                // If characters don't match, the we simply carry the previous value forward into the next row to keep track of previous matches 
                scoreTable[row][column] = cellAbove
            }
        }
    }
    
    // console.log(scoreTable)
    // The answer will be in the last value of the last row or subArray of the Scoretable... scoreTable[m][3]
    return scoreTable[m][3];
}


const aString = "ABC"
const bString = "ABCCCC"

const recursiveResult = getSubsequenceRecursive(aString, bString)
console.log({recursiveResult})
const iterativeResult = getSubsequenceCount(aString, bString)
console.log({iterativeResult})
//  the logic of the solution is the working backward from the last letter of each string -- "C" in this case
//  if the last letter in string B equals "C" (the last char in String A), then the total number of subsequences will equal ...
//    the number of subsequences in string B (excluding the last char)
//  + the number of subsequences of string A (excluding the last char) in string B (excluding the last char)
//  so in this example, you can see that if string A and String B both equaled "ABC"
//  then the total would be 1
//  if you add a "C" to the end of string B to make it "ABCC" then the answer is now 2
//  which is the number of subsequences of string A in string B (excluding last char) // "ABC" or 1
//  plus how many subsequences of "AB" there are in "ABC" // 1
//  now if you add another "C" to the end of string B to make it "ABCCC", the answer is now 3
//  number of subsequences of "ABC" in string B excluding the last char (2) + number of subsequences of "AB" in "ABCC" (1) = 3
//  you can carry out this logic as much as you add characters to string B, including more As and Bs earlier in the loop
