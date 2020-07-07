import React from 'react';
import { observer } from "mobx-react";
import WorksheetActivityPicker from './WorksheetActivityPicker';
import WorksheetActivityArea from './WorksheetActivityArea';
import ActivityStore from '../../store/ActivityStore.js'



const Worksheet = observer(class Worksheet extends React.Component {
    constructor(props) {
        super(props)
        this.activityStore = new ActivityStore();
    }
    render() {
        return (
            <div className="row">
                <div className="column">
                    <WorksheetActivityPicker store={this.activityStore} />
                </div>
                <div className="column">
                    <WorksheetActivityArea store={this.activityStore} />
                </div>
                {/*Student Column */}
                <div className="column">

                </div>
            </div>
        );
    }
});

export default Worksheet;
   