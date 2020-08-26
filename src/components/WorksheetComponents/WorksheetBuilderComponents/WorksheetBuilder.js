import React from 'react';
import { observer } from "mobx-react";
import WorksheetActivityPicker from './WorksheetActivityPicker';
import WorksheetActivityArea from './WorksheetActivityArea';


const WorksheetBuilder = observer(class Worksheet extends React.Component {
    constructor(props) {
        super(props)

    }

    //Eventually what is rendered will be determined by whether a student or teacher is looking at the worksheet
    render() {
        return (
            <div className="worksheet-builder-row">
                <div className="worksheet-activity-picker-column">
                    <WorksheetActivityPicker store={this.props.store} />
                </div>
                <div className="worksheet-activity-area-column">
                    <WorksheetActivityArea store={this.props.store} droppableId={"activity-area-droppable-area"}/>
                </div>
            </div>
        );
    }
});

export default WorksheetBuilder;