import { observable, decorate } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export default class Activity {
    id = null;
    author = null;
    activityType = null;
    question = "";
    answer = "";
    wordCount = 100;
    position = 0;

    constructor(activityType, position){
        this.activityType = activityType;
        this.position = position;
        this.id = uuidv4();
    }
}

decorate(Activity, {
    question: observable,
    answer: observable,
    wordCount: observable,
    position: observable
})