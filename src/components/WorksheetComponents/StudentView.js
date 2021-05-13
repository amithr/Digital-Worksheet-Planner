import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import {Button} from 'react-bootstrap';
import Sidebar from '../SidebarComponents/Sidebar';

const StudentView = observer((props => {
    const [name, setName] = useState(false);


    return(
        <div className="row">
            <div className="worksheet-builder-row">
                <div className="worksheet-activity-picker-column">
                    <p>Worksheet Activity Picker Column</p>
                </div>
                <div className="worksheet-activity-area-column">
                    <p>Worksheet Activity Area Column</p>
                </div>
            </div>
            <div className="sidebar-column">
                <Sidebar />
            </div>
        </div>
    )
}));

export default StudentView;