import React from 'react';
import { observer } from "mobx-react";
import WorksheetActivityWriting from './WorksheetActivities/WorksheetActivityWriting/WorksheetActivityWriting';

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
                    activityArray.push(<WorksheetActivityWriting 
                        key={index}
                        store = {this.store}
                        position={activity.position}
                        activityid={activity.id} 
                        question={activity.question} 
                        answer={activity.answer} 
                        wordcount={activity.wordCount} />)
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

export default WorksheetActivityArea;
   