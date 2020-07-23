/** 
 * This is the sidebar for student management.
 */

import React from 'react';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        //this.loadActiveUsers(this.props.worksheetid);
    }

    loadActiveUsers(worksheetId) {
    }

    render() {
        return (
            <div>
                <p>This is the sidebar.</p>
            </div>
        );
    }
};

export default Sidebar;