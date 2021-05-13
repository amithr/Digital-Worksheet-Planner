import Activity from './Activity.js';
import ActivityStore from './ActivityStore.js';
import StudentWorksheet from './StudentWorksheet.js';
import TeacherWorksheet from './TeacherWorksheet.js';
import User from './User.js';
import UserStore from './UserStore.js';
import Worksheet from './Worksheet.js';
import WorksheetStore from './WorksheetStore.js';

const executeFixtures = (userStore, worksheetStore, activityStore) => {

    let teacherUser = userStore.create('amithravindar2493@gmail.com', 'teacher', 'asdasdsad');
    let studentUser1 = userStore.create('idiot1@gmail.com', 'student', 'sdds');
    let studentUser2 = userStore.create('idiot2@gmail.com', 'student', 'asdsadd');
    let studentUser3 = userStore.create('idiot3@gmail.com', 'student', 'fsdfdfsd');

    let teacherWorksheet1 = worksheetStore.create(teacherUser, 'teacher')
    let teacherWorksheet2 = worksheetStore.create(teacherUser, 'teacher')
    teacherWorksheet1.name = 'sqwwewew';
    teacherWorksheet2.name = 'sqwweweasdw';
    activityStore.createActivity('gapfill', teacherWorksheet1);
    activityStore.createActivity('gapfill', teacherWorksheet2);
    // let studentWorksheet1 = worksheetStore.createStudentWorksheetfromTeacherWorksheet(teacherWorksheet1, teacherUser.id, studentUser1.id);
    // let studentWorksheet2 = worksheetStore.createStudentWorksheetfromTeacherWorksheet(teacherWorksheet1, teacherUser.id, studentUser2.id);
    // let studentWorksheet3 = worksheetStore.createStudentWorksheetfromTeacherWorksheet(teacherWorksheet2, teacherUser.id, studentUser3.id);

}

export default executeFixtures;