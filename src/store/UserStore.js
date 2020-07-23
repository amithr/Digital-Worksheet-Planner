/** This is to hold the single Teacher and remaining Students that the clients will interact with. One of the users
 * in the store will also be the client, with its respective permissions to see users based on whether the client is a teacher or a student.
 * All users that will be seen by the user will be loaded into this store. So a student may only be able to see their teacher and groupmates
 * while a teacher will see everyone.
*/

import { observable, decorate } from "mobx";
import DatabaseLayer from '../server-bindings/DatabaseLayer';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

export default class UserStore {
    users = []
    /* Load users based on whether the user is a student or teacher and what worksheet(s) they are working assigned to them.
    * The association with the worksheet and userType will be made on the backend, I think 
    */
    clientUserId = null;
    databaseLayer = new DatabaseLayer();
    index = 0;

    constructor(clientUserId) {
        this.loadUsers(clientUserId);
    }

    loadUsers(clientUserId) {

    }

    createUser() {

    }

    deleteUser(clientUserId, userId) {

    }
};

decorate(UserStore, {
    
});