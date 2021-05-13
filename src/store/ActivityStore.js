import { observable, decorate, makeAutoObservable, autorun } from "mobx";
import DatabaseLayer from '../server-actions/DatabaseLayer';
import Activity from '../store/Activity.js';

// This activity store will hold all activities for all worksheets
// They will be loaded up from the server based on the user who is accessing the application
// All activities will have a worksheetId assigned to them
// The activity store will be dynamically updated over a channel to accommodate teachers adding
// activities in real time.

export default class ActivityStore {

    activities = [];
    databaseLayer = new DatabaseLayer();
    index = 0;
    isTeacherMode = true;

    constructor() {
        //Eventually, loadActivities with the aid of the worksheet ID.
        this.loadActivities();
        this.index = 0;
    };

    loadActivities = () => {
        //load from server
    }

    createActivity = (activityType, worksheet) => {
        let position = this.index++;
        let activity = new Activity(activityType, position, worksheet.id);
        this.activities.push(activity);
        worksheet.activities.push(activity);
        console.log(activity);
        return activity;
    }

    findActivity = (activityId) => {
        return this.activities.find(activity => activity.id == activityId);
    }

    removeActivity = (activity) => {
        this.activities.splice(this.activities.indexOf(activity), 1);
    }

    changeAllActivitiesModes = (isTeacherMode) => {
        this.isTeacherMode = isTeacherMode;
    }

}
decorate(ActivityStore, {
    activities: observable,
    index: observable,
    isTeacherMode: observable
});