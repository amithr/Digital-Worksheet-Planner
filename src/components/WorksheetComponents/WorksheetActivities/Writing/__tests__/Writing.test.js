import React from 'react';
import ReactDOM from 'react-dom';
import Writing from '../Writing';
import WritingStudentView from '../WritingStudentView';
import WritingTeacherView from '../WritingTeacherView';
import ActivityStore from '.../../../store/ActivityStore.js'




it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<Writing store={activityStore} activity={activity} />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<WritingTeacherView activity={activity} />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<WritingStudentView activity={activity} />, div);
});