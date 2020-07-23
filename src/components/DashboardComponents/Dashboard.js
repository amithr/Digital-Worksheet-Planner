//This will be the entry point to the application. (if not the first time)
import React from 'react';
import WorksheetStore from '../../store/WorksheetStore.js'
import UserStore from '../../store/UserStore.js';

//After users log in, they go to the dashboard

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        //this.userId = this.props.userid;

        //Load all worksheets and users based on userid (and then type of user)
        //this.worksheetStore = new WorksheetStore(userId);
        //this.initializeUserStore()
    }
    initializeUserStore(userid) {
                //this.userStore = new UserStore(userId);
    }
    render() {
        return (
            <div>
                <p>This is the dashboard.</p>
            </div>
        );
    }
};

export default Dashboard;