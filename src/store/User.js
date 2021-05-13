/** Both the client and the different users that the client is interaction with (teacher, students etc.) will be given
 * a user object.
 */

import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export default class User {
    id = null;
    name = null;
    // Should be mandatory
    emailAddress = null;
    userType = null;
    //There could be one answer or many answers
    worksheets = [];
    online = false;
    currentWorksheet = null;
    // Applies to both student or teacher - helps them get working as soon as possible
    RSAKeys = [];
    //This is an array of key/value pairs - each element includes a worksheetId and a key

    constructor(emailAddress, userType, googleId) {
        this.emailAddress = emailAddress;
        this.userType = userType;
        this.id = googleId;
    }

    getRSAKeyFromTeacherWorksheetId(teacherWorksheetId) {
        for (let RSAKeyMap in this.RSAKeys) {
            if(RSAKeyMap['worksheetId'] === teacherWorksheetId) {
                return RSAKeyMap['RSAKey'];
            }
        }
    }
}

//Need some function to save user to the server

decorate(User, {
    worksheets: observable,
    currentWorksheet: observable,
    online: observable
})