import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';

// Every activity will have a many-to-one relationship to with a worksheet

export default class Activity {
    id = null;
    worksheetId = null;
    //This will be only be filled in if the activity is on a student worksheet
    teacherWorksheetId = null;
    activityType = null;
    //There could be one answer or many answers
    questionData = "";
    studentAnswerData = "";
    correctAnswerData = "";
    wordCount = 100;
    position = 0;
    score = 0;

    constructor(activityType, position, worksheetId) {
        this.worksheetId = worksheetId;
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