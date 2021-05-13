import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { observer } from "mobx-react";
import ActivityStore from '../../store/ActivityStore.js'
import WorksheetStore from '../../store/WorksheetStore.js';
import TeacherView from './TeacherView.js';
import StudentView from './StudentView.js';
import UserStore from '../../store/UserStore.js';
import executeFixtures from '../../store/Fixtures.js';




const Worksheets = observer(props => {
    let {userType, userId, studentPinCode} = useParams();
    const activityStore = new ActivityStore();
    //Load teacher and any students from database on initialization
    const userStore = new UserStore();
    //Load all worksheets from database on initialization
    const worksheetStore = new WorksheetStore();
    executeFixtures(userStore, worksheetStore, activityStore);
    console.log('Hit the Worksheet component');
    const getView = () => {
        return userType === 'teacher' ? <TeacherView teacherUserId={userId} worksheetStore={worksheetStore} activityStore={activityStore} /> : <StudentView studentPinCode = {studentPinCode} activityStore={activityStore} />
    }

    //Eventually what is rendered will be determined by whether a student or teacher is looking at the worksheet
    return (
        <div className="row">
            <TeacherView teacherUserId={userId} worksheetStore={worksheetStore} activityStore={activityStore} />
        </div>
    );
});

export default Worksheets;
   