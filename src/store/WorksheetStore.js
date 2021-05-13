/** This is where all student and teacher worksheets are stored. They will probably be displayed in the App components, or potentially
 * another all-encompassing component lower in the hierarchy. 
 * Each student and teacher worksheet in this store has it's own user id.
 * This worksheet store is loaded from the backend based on the client userId. 
 * Only a teacher will really see multiple student worksheets and the teacher worksheet, which is a template for
 * all it's respective student worksheets.
 * The teacher worksheet area (for teachers to build worksheets) is rendered on top of the teacher worksheet.
 */

import { observable, decorate } from "mobx";
import DatabaseLayer from '../server-actions/DatabaseLayer';
import { v4 as uuidv4 } from 'uuid';
import Activity from "./Activity";
import TeacherWorksheet from './TeacherWorksheet';
import StudentWorksheet from './StudentWorksheet';
import ActivityStore from './ActivityStore';

export default class WorksheetStore {
    worksheets = []
    // This could be a teacher or a student.
    clientUserId = null;
    databaseLayer = new DatabaseLayer();
    index = 0;

    constructor() {
    }

    create(user, type) {
        let worksheet = null;
        if(type === 'teacher') {
            worksheet = new TeacherWorksheet(user.id);
            //this is to allow secure invitations to worksheets
            const NodeRSA = require('node-rsa'); 
            user.RSAKeys.push({'worksheetId':worksheet.id, 'RSAKey':new NodeRSA({b: 512})});
        } else if(type === 'student') {
            worksheet = new StudentWorksheet(user.id);
        }
        this.worksheets.push(worksheet);
        return worksheet;
    }

    createStudentWorksheetfromTeacherWorksheet(teacherWorksheet, teacherUserId, studentUserId, activityStore) {
        let studentWorksheet = this.create(studentUserId, 'student');
        studentWorksheet.teacherWorksheetId = teacherWorksheet.id;
        studentWorksheet.authorId = teacherUserId;
        studentWorksheet.name = teacherWorksheet.name;
        studentWorksheet.activities = this.copyWorksheetActivities(teacherWorksheet, studentWorksheet, activityStore);
        return studentWorksheet;
    }

    copyWorksheetActivities(teacherWorksheet, studentWorksheet, activityStore) {
        let studentWorksheetActivities = [];
        if(teacherWorksheet.activities.length > 0) {
            for (let activity of teacherWorksheet.activities) {
                let newStudentActivity = new Activity(activity.activityType, activity.position, studentWorksheet.id);
                newStudentActivity.studentAnswerData = "";
                newStudentActivity.teacherWorksheetId = teacherWorksheet.id;
                activityStore.push(newStudentActivity);
                studentWorksheetActivities.push(newStudentActivity);
            }
        }
        return studentWorksheetActivities;
    }

    getWorksheetsForTeacherByType(teacherUserId, typeOfWorksheetRequested='teacher') {
        let worksheetsForTeacher = [];
        //Either give all student or all teacher worksheets
        for (let worksheet of this.worksheets) {
            if((worksheet.worksheetType && typeOfWorksheetRequested)  === 'teacher') {
                worksheetsForTeacher.push(worksheet)
            } else if((worksheet.worksheetType && typeOfWorksheetRequested) === 'student')
                worksheetsForTeacher.push(worksheet);
        }
        return worksheetsForTeacher;
    }

    getWorksheetsForStudent(studentUserId) {
        return this.worksheets.filter(worksheet => worksheet.userId === studentUserId)
    }
    //Change name, add or remove activities
    updateStudentWorksheet() {

    }
    //Update an individual activity
    updateStudentWorksheetActivity() {

    }

    remove(worksheet) {
        this.worksheets.splice(this.worksheets.indexOf(worksheet), 1);
        return worksheet;
    }

    buildWorksheetInvitation() {
        
    }

    getTeacherWorksheetsFromServer(teacherUserId) {

    }

    getStudentWorksheetsFromServer(teacherUserId) {

    } 
}

decorate(WorksheetStore, {
    worksheets: observable
})