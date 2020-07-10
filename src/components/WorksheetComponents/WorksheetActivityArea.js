import React from 'react';
import { Button} from 'react-bootstrap';
import { observer } from "mobx-react";
import WorksheetActivityWriting from './WorksheetActivities/Writing/Writing';
import WorksheetActivityGapfill from './WorksheetActivities/Gapfill/Gapfill';
import WorksheetActivityMatching from './WorksheetActivities/Matching/Matching';

/* This file includes the DeleteActivity component as well */

const WorksheetActivityArea = observer(class WorksheetActivityArea extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.components = {
            writing: WorksheetActivityWriting,
            gapfill: WorksheetActivityGapfill,
            matching: WorksheetActivityMatching
        }
    };

    componentDidMount() {
        this.store.loadActivities();
    }

    

    renderActivities() {
        let activityArray = [];

        this.store.activities.map((activity, index) => {
            const ActivityComponent = this.components[activity.activityType];
            activityArray.push(
                <div key={index}>
                    <DeleteActivity store={this.store} activity={activity} />    
                    <ActivityComponent
                        store = {this.store}
                        position={activity.position}
                        activityid={activity.id} 
                        question={activity.question} 
                        answer={activity.answer} 
                        wordcount={activity.wordCount} />
                </div>
            );

            // This is legacy code - it was the long way of doing things, but it might come in handy later.
            // switch(activity.activityType) {
            //     case 'writing':
            //         activityArray.push(
            //         <div key={index}>
            //         <DeleteActivity store={this.store} activity={activity} />
            //         <WorksheetActivityWriting 
            //             store = {this.store}
            //             position={activity.position}
            //             activityid={activity.id} 
            //             question={activity.question} 
            //             answer={activity.answer} 
            //             wordcount={activity.wordCount} /></div>)
            //         break;
            //     case 'gapfill':
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
   