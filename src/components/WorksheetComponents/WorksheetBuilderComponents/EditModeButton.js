import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import {Button} from 'react-bootstrap';

const EditModeButton = observer((props => {
    const [isTeacherMode, setIsTeacherMode] = useState(false);
    const [modeText, setModeText] = useState('Student');

    const handleClick = event => {
        isTeacherMode === true ? setIsTeacherMode(false) : setIsTeacherMode(true);
        isTeacherMode === true ? setModeText('Student') : setModeText('Teacher');
        props.store.changeAllActivitiesModes(isTeacherMode);
    }


    return(
        <Button onClick={handleClick}>{modeText} Mode</Button>
    )
}));

export default EditModeButton;


