import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export default class Activity {
    id = null;
    author = null;
    activityType = null;
    //There could be one answer or many answers
    questionData = "";
    studentAnswerData = "";
    correctAnswerData = "";
    wordCount = 100;
    position = 0;
    score = 0;

    constructor(activityType, position){
        this.activityType = activityType;
        this.position = position;
        this.id = uuidv4();
    }
}

decorate(Activity, {
    questionData: observable,
    studentAnswerData: observable,
    correctAnswerData: observable,
    wordCount: observable,
    position: observable,
    score: observable
})