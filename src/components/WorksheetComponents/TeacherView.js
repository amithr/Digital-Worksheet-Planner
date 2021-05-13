import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react";
import {Tabs, Tab, Button} from 'react-bootstrap';
import TeacherWorksheetView from './TeacherWorksheetView.js';
import StudentWorksheetView from './StudentWorksheetView.js';
import { TabPane } from 'react-bootstrap';

//Show teacher instance for current worksheet in a tab alongside all student versions.
//Possible to toggle between teacher instances, but associated student worksheets refresh
//when this is the case


const TeacherView = observer((props => {
    const [teacherWorksheetTabs, setTeacherWorksheetTabs] = useState([]);
    const [studentWorksheetTabs, setStudentWorksheetTabs] = useState([]);
    


    /**
     * 
     * @param {*} worksheetType 
     * get the given type of worksheet
     * generate tabs that the user can click on
     * generate the panels that will hold the given type of worksheet 
     * (we use an if statement because student worksheets are different from teacher worksheets)
     * the index is used because all array elements which will be rendered need to have a unique key
     */
    const generateWorksheetTabsByType = (worksheetsType) => {
        //get worksheets by type to diplay in teacher view
        const worksheets = props.worksheetStore.getWorksheetsForTeacherByType(props.teacherId, worksheetsType);
        let worksheetTabs = [];
        for(let index=0; index < worksheets.length; index++) {
                if(worksheets[index].worksheetType === 'teacher' && worksheetsType === worksheets[index].worksheetType) {
                    worksheetTabs.push(<Tab key={index} eventKey={worksheets[index].name} title={worksheets[index].name}><TeacherWorksheetView worksheet={worksheets[index]} activityStore={props.activityStore}/></Tab>);
                } else if(worksheets[index].worksheetType === 'student' && worksheetsType === worksheets[index].worksheetType) {
                    worksheetTabs.push(<Tab key={index} eventKey={worksheets[index].name} title={worksheets[index].name}><StudentWorksheetView worksheet={worksheets[index]} activityStore={props.activityStore}/></Tab>);
                }
        }
        setWorksheetUIState(worksheetTabs, worksheetsType);
    }

    const setWorksheetUIState = (worksheetTabsArray,worksheetsType) => {
        if (worksheetsType === 'teacher') {
            setTeacherWorksheetTabs(worksheetTabsArray);
        } else if(worksheetsType === 'student') {
            setStudentWorksheetTabs(worksheetTabsArray);
        }
    }

    useEffect(() => {
        generateWorksheetTabsByType('teacher');
        generateWorksheetTabsByType('student');
    }, []);

    return(
        <div>
            <Tabs>
                {teacherWorksheetTabs}
            </Tabs>
        </div>
    )
}));

export default TeacherView;