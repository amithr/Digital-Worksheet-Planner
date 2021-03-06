import React from 'react';
import './WorksheetActivityArea.css';
import { Button} from 'react-bootstrap';
import { observer } from "mobx-react";
import Dragula from "react-dragula";
import WorksheetActivityWriting from '../WorksheetActivities/Writing/Writing';
import WorksheetActivityGapfill from '../WorksheetActivities/Gapfill/Gapfill';
import WorksheetActivityMatching from '../WorksheetActivities/Matching/Matching';
import WorksheetActivityMultipleChoice from '../WorksheetActivities/MultipleChoice/MultipleChoice';

/* This file includes the DeleteActivity component as well */

const WorksheetActivityArea = observer(class WorksheetActivityArea extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.components = {
            writing: WorksheetActivityWriting,
            gapfill: WorksheetActivityGapfill,
            matching: WorksheetActivityMatching,
            multiple_choice: WorksheetActivityMultipleChoice
        }
    };

    componentDidMount() {
        this.store.loadActivities();
    }

    renderActivities() {
        let activityArray = [];

        this.store.activities.map((activity, index) => {
            const ActivityComponent = this.components[activity.activityType];
            console.log('Loop Activity WorksheetId: ' + activity.worksheetId);
            console.log('WorksheetId: ' + this.props.worksheet.id);
            if(activity.worksheetId === this.props.worksheet.id) {
                activityArray.push(
                    <div key={index}>
                        <DeleteActivity store={this.store} activity={activity} />    
                        <ActivityComponent 
                            store={this.store}
                            activity ={activity}
                             />
                    </div>
                );
            }
        });
        
        return activityArray;
    }

    // Helps implement drag and drop functionality
    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
          let options = { };
          Dragula([componentBackingInstance], options);
        }
    }

    render() {
        return (
            <div ref={this.dragulaDecorator}>
                <br />
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
            return (<Button className="activity-remove-button" onClick={this.removeActivity}>x</Button>);
        }
};

export default WorksheetActivityArea;
   