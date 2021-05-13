This is the frontend of the Digital Worksheet Creator. It is written entirely in React.js with Mobx utilized for state management.

To run the application:
1) Run "npm install" in the terminal.
2) Run "npm start"

To test, simply run "npm test."

Login Scheme

Teachers can immediately log in via Google and start creating worksheets.

Students must be sent a link to a teacher-created worksheet.
They must then log in via Google and will be directed to their worksheet.

After the first login, they can independently access their accounts to see active worksheets,
however, they will still receive emails where necessary as notifications of new worksheets.

Data Store
The data store is the heart of the application.

The stores (WorksheetStore.js, ActivityStore.js and UserStore.js all hold data stores (Objects that hold multiple other ).

The UserStore is instantiated in "App.js" and the WorksheetStore and ActivityStore are instantiated in "Worksheets.js".

In each store, there is an array that holds these objects. This array is "observable" which means that any changes
made to this array are automatically reflected across the application.

The stores are also where all server interactions will take place. The rest of the applicated will only communicated
with the backend through a store, never directly.

Each store also comes with a set of functions:
ActivityStore
createActivity
findActivity
removeActivity
attachActivitytoWorksheet - Every activity must be attached to a worksheet. Each worksheet, student or teacher,
has a set of activities.
changeAllActivitiesModes (SOON TO BE DEPRECATED) - switch modes between Teacher (editable) and student (non-editable)

WorksheetStore
create
add



Server Access





- Notes

- Teacher creates a worksheet which has it's own id.
- Student is sent an email with link to a worksheet (with it's own id and the teacher worksheet's id)
- Student can only see the student views of these worksheets. Questions
are loaded into the worksheet from the server based on the teacher worksheet
- When the student logs in, based on the student and teacher's id, the teacher can see
the student's worksheet, progress, and eventual mark (available in the dashboard)
    - In the future, there will be communicate options between the teacher and the student, but
    for now, this is meant to be used in conjunction with Zoom.
- 


















This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
