/** This is to hold the single Teacher and remaining Students that the clients will interact with. One of the users
 * in the store will also be the client, with its respective permissions to see users based on whether the client is a teacher or a student.
 * All users that will be seen by the user will be loaded into this store. So a student may only be able to see their teacher and groupmates
 * while a teacher will see everyone.
*/

import { observable, decorate } from "mobx";
import DatabaseLayer from '../server-actions/DatabaseLayer';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

export default class UserStore {
    users = []
    /* 
    */
    clientUserId = null;
    databaseLayer = new DatabaseLayer();
    index = 0;

    constructor() {
    }

    create(emailAddress, userType, googleId) {
        const user = new User(emailAddress, userType, googleId)
        this.users.push(user);
        return user;
    }

    findUserByid(userId) {
        return this.users.find(user => this.users.id == userId);
    }

    remove(user) {
        this.users.splice(this.users.indexOf(user), 1);
        return user;
    }

    //Use RSA to at least protect against spoofing a little but
    generateStudentPinCode(teacherUser, teacherWorksheetId, studentEmailAddress) {
        //Create new student
        const newStudent = this.create(studentEmailAddress, 'student', null);
        const teacherWorksheetRSAKey = teacherUser.getRSAKeyFromTeacherWorksheetId(teacherWorksheetId);
        const textToEncrypt = teacherUser.id + teacherWorksheetId + studentEmailAddress;
        const encryptedText = teacherWorksheetRSAKey.encrypt(textToEncrypt, 'base64');
        newStudent.RSAKeys.push({'worksheetId':teacherWorksheetId, 'RSAKey': teacherWorksheetRSAKey});
        return encryptedText;
    }
};

decorate(UserStore, {
    users: observable
});