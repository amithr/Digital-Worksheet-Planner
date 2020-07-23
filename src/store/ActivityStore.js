import { observable, decorate } from "mobx";
import DatabaseLayer from '../server-bindings/DatabaseLayer';
import Activity from '../store/Activity.js';

export default class ActivityStore {

    activities = [];
    databaseLayer = new DatabaseLayer();
    index = 0;

    constructor() {
        //Eventually, loadActivities with the aid of the worksheet ID.
        this.loadActivities();
        this.index = 0;
    };

    loadActivities = () => {
        //load from server
    }

    createActivity = (activityType) => {
        let position = this.index++;
        let activity = new Activity(activityType, position);
        this.activities.push(activity);
        console.log(activity);
        return activity;
    }
    
    findActivity = (activityId) => {
        return this.activities.find(activity => activity.id == activityId);
    }

    removeActivity = (activity) => {
        this.activities.splice(this.activities.indexOf(activity), 1);
    }

}
decorate(ActivityStore, {
    activities: observable,
    index: observable
});