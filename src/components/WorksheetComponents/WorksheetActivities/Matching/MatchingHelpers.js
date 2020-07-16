export const mergeQuestionAndAnswerArrays = (questionArray, answerArray) => {
    let finalArray = []
    if(questionArray.length === answerArray.length) {
        for(let i=1; i < questionArray.length; i++) {
            let questionAnswerPair = {
                questionNumber: i,
                question: questionArray[i],
                answer: answerArray[i]
            }
            finalArray.push(questionAnswerPair);
        }
        return finalArray;
    }
}

//Randomize the order of answers so they can't be easily matched to questions
export const getRandomizedCorrectAnswerArray = (correctAnswersArray) => {
    let randomizedCorrectAnswersArray = [];
    let correctAnswersLength = correctAnswersArray.length;
    for(let i = 0; i < correctAnswersLength; i++) {
        let randomIndex = getRandomizedIndex(correctAnswersLength, randomizedCorrectAnswersArray);
        randomizedCorrectAnswersArray[randomIndex] = correctAnswersArray[i];
    }
    return randomizedCorrectAnswersArray;
}

const getRandomizedIndex = (correctAnswersLength, randomizedCorrectAnswersArray) => {
    let randomIndex = Math.floor(Math.random()*correctAnswersLength);
    // If the index is free in the array, return the index, otherwise look for another index via Math.random (recursively)
    if(!randomizedCorrectAnswersArray[randomIndex]) {
        return randomIndex;
    } else {
        return getRandomizedIndex(correctAnswersLength, randomizedCorrectAnswersArray);
    }
}