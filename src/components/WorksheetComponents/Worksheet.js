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
            <div class="row">
                <div class="column">
                    <WorksheetActivityPicker store={this.activityStore} />
                </div>
                <div class="column">
                    <WorksheetActivityArea store={this.activityStore} />
                </div>
                {/*Student Column */}
                <div class="column">

                </div>
            </div>
        );
    }
});

export default Worksheet;
   