import React from 'react';
import ReactDOM from 'react-dom';
import Gapfill from '../Gapfill';
import GapfillStudentView from '../GapfillStudentView';
import GapfillTeacherView from '../GapfillTeacherView';
import ActivityStore from '.../../../store/ActivityStore.js'




it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<Gapfill store={activityStore} activity={activity} />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<GapfillTeacherView activity={activity} />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    let activityStore = new ActivityStore();
    let activity = activityStore.createActivity('gapfill');
    ReactDOM.render(<GapfillStudentView activity={activity} />, div);
});
  