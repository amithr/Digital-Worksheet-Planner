import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import {Button} from 'react-bootstrap';
import WorksheetBuilder from './WorksheetBuilderComponents/WorksheetBuilder';
import Sidebar from '../SidebarComponents/Sidebar';


const TeacherWorksheetView = observer((props => {
    return(
        <div className="row">
            <WorksheetBuilder store={props.activityStore} worksheet={props.worksheet}/>
            {/*Sidebar Column */}
            <div className="sidebar-column">
                <Sidebar />
            </div>
        </div>
    )
}));

export default TeacherWorksheetView;