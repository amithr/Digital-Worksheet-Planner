import React from 'react';
import { Button} from 'react-bootstrap';
import { observer } from "mobx-react";
import WorksheetActivityWriting from './WorksheetActivities/Writing/Writing';
import WorksheetActivityGapfill from './WorksheetActivities/Gapfill/Gapfill';

/* This file includes the DeleteActivity component as well */

const WorksheetActivityArea = observer(class WorksheetActivityArea extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;
    };

    componentDidMount() {
        this.store.loadActivities();
    }

    

    renderActivities() {
        let activityArray = [];

        this.store.activities.map((activity, index) => {
            switch(activity.activityType) {
                case 'writing':
                    activityArray.push(
                    <div key={index}>
                    <DeleteActivity store={this.store} activity={activity} />
                    <WorksheetActivityWriting 
                        store = {this.store}
                        position={activity.position}
                        activityid={activity.id} 
                        question={activity.question} 
                        answer={activity.answer} 
                        wordcount={activity.wordCount} /></div>)
                    break;
                case 'gapfill':
                    activityArray.push(
                        <div key={index}>
                        <DeleteActivity store={this.store} activity={activity} />
                        <WorksheetActivityGapfill 
                            store = {this.store}
                            position={activity.position}
                            activityid={activity.id} 
                            question={activity.question} 
                            answer={activity.answer} 
                            wordcount={activity.wordCount} /></div>)
                    break;
                default:
                    break;
            }
        });
        return activityArray;
    }

    render() {
        return (
            <div>
                {this.renderActivities()}
            </div>
        );
    }
})

class DeleteActivity extends React.Component {
        constructor(props) {
            super(props);

            this.store = this.props.store;
            this.removeActivity.bind(this);
        }

        removeActivity = () => {
            this.store.removeActivity(this.props.activity);
        }

        render() {
            return (<Button onClick={this.removeActivity}>x</Button>);
        }
};

export default WorksheetActivityArea;
   