/** Both the client and the different users that the client is interaction with (teacher, students etc.) will be given
 * a user object.
 */

import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export default class User {
    id = null;
    name = null;
    emailAddress = null;
    userType = null;
    //There could be one answer or many answers
    worksheets = [];
    online = false;
    currentWorksheet = null;

    constructor(activityType, position){
        this.activityType = activityType;
        this.position = position;
        this.id = uuidv4();
    }
}

decorate(User, {
    worksheets: observable,
    currentWorksheet: observable,
    online: observable
})