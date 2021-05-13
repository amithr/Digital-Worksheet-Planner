import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import Worksheet from './Worksheet.js'

export default class TeacherWorksheet extends Worksheet {
    studentWorksheets = [];
    totalPossibleScore = 100;
    constructor(userId) {
        super(userId);
        this.worksheetType = 'teacher';
        this.authorId = userId;
    }
    
    setTimeLimit = (timeLimit) => {
        //in minutes
        this.timeLimit = timeLimit;
    }
}