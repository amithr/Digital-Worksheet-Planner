/** This is where students do all their work. It holds a bunch of activity object.
 * This is an instance of a teacher-created worksheet, but where the client is a student, so only the student view is visible. Only 
 * StudentAnswers are updated in the individual activities.
 * If activities are added while the client is completing the worksheet, this can be updated as well. 
 * */

import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export default class Worksheet {
    id = null;
    //Could be a student or a teacher
    clientUserId = null;
    // This is the teacher-made template for the student worksheet
    teacherWorksheetId = null;
    worksheetType = null; //(student or teacher)?
    activities = [];
    
    constructor(activities, studentId, worksheetId) {
        this.activities = activities;
        this.studentId = studentId;
        this.teacherWorksheetId = worksheetId;
        this.id = uuidv4();
    }

    createWorksheet(clientUserId, teacherWorksheetId) {
    //If teacherWorksheetId is undefined, it's a teacher worksheet and an ID needs to be generated for it.
    }
}

decorate(Worksheet, {
    activities: observable
})