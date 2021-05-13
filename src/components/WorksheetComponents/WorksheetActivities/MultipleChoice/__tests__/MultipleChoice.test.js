import React from 'react';
import ReactDOM from 'react-dom';
import MultipleChoice from '../MultipleChoice.js';
import MultipleChoiceStudentView from '../MultipleChoiceStudentView';
import MultipleChoiceTeacherView from '../MultipleChoiceTeacherView';
import ActivityStore from '.../../../store/ActivityStore.js'




it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<MultipleChoice store={activityStore} activity={activity} />, div);
});