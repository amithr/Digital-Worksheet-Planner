/** This is where all student and teacher worksheets are stored. They will probably be displayed in the App components, or potentially
 * another all-encompassing component lower in the hierarchy. 
 * Each student and teacher worksheet in this store has it's own user id.
 * This worksheet store is loaded based on the client userId. 
 * Only a teacher will really see multiple student worksheets and the teacher worksheet, which is a template for
 * all it's respective student worksheets.
 * The teacher worksheet area (for teachers to build worksheets) is rendered separately.
 */

import { observable, decorate } from "mobx";
import DatabaseLayer from '../server-bindings/DatabaseLayer';
import { v4 as uuidv4 } from 'uuid';

export default class WorksheetStore {
   Worksheets = []
    clientUserId = null;
    databaseLayer = new DatabaseLayer();
    index = 0;

    constructor(clientUserId) {
        this.loadStudentWorksheets(clientUserId);
    }

    loadStudentWorksheets() {

    }
}

decorate(WorksheetStore, {
    
})