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