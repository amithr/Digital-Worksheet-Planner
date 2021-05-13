import React from 'react';
import ReactDOM from 'react-dom';
import Matching from '../Matching';
import MatchingStudentView from '../MatchingStudentView';
import MatchingTeacherView from '../MatchingTeacherView';
import ActivityStore from '.../../../store/ActivityStore.js'




it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<Matching store={activityStore} activity={activity} />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<MatchingTeacherView activity={activity} />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<MatchingStudentView activity={activity} />, div);
});