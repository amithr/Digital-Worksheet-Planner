/** This is where students do all their work. It holds a bunch of activity object.
 * This is an instance of a teacher-created worksheet, but where the client is a student, so only the student view is visible. Only 
 * StudentAnswers are updated in the individual activities.
 * If activities are added while the client is completing the worksheet, this can be updated as well. 
 * */

import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export default class Worksheet {
    id = null;
    userId = 0;
    authorId = 0;
    //Name of user
    name = null;
    worksheetType = null; //(student or teacher)?
    activities = [];
    editMode = false;
    timeLimit = 0; //minutes
    constructor(userId) {
        this.userId = userId;
        this.id = uuidv4();
    }
}