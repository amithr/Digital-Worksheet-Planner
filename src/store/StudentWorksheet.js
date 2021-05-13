import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import Worksheet from './Worksheet.js';

export default class StudentWorksheet extends Worksheet {
    totalScore = 100;
    teacherWorksheetId = 0;
    constructor(userId) {
        super(userId);
        this.worksheetType = 'student';
    }

    setTotalScore = (totalScore) => {
        this.totalScore = totalScore;
    }
    
    setName = (name) => {
        this.name = name;
    }
}