import React from 'react';
import { observer } from "mobx-react";
import WorksheetBuilder from './WorksheetBuilderComponents/WorksheetBuilder';
import Sidebar from '../SidebarComponents/Sidebar';
import ActivityStore from '../../store/ActivityStore.js'




const Worksheets = observer(class Worksheet extends React.Component {
    constructor(props) {
        super(props)
        this.activityStore = new ActivityStore();
    }

    //Eventually what is rendered will be determined by whether a student or teacher is looking at the worksheet
    render() {
        return (
            <div className="row">
                <WorksheetBuilder store={this.activityStore} />
                {/*Sidebar Column */}
                <div className="sidebar-column">
                    <Sidebar />
                </div>
            </div>
        );
    }
});

export default Worksheets;
   