import React from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import EditModeButton from './EditModeButton';

class WorksheetActivityPicker extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        //To add an activity type, add it to the state object and activityArray 
        this.state = {
            'gapfill': false,
            'matching': false,
            'multiple_choice': false,
            'writing': false

        }

        this.activityArray = [
            {id: 1, label:'Gapfill', keyword:'gapfill'}, 
            {id: 2, label:'Matching', keyword: 'matching'}, 
            {id: 3, label:'Multiple Choice', keyword: 'multiple_choice'}, 
            {id: 4, label: 'Writing', keyword: 'writing'}
        ];
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
    
    };

    renderActivityPickerForm = () => {
        let formArray = []
        this.activityArray.map((activityElement) => (
            formArray.push(
                <Form.Check type="checkbox" label={activityElement.label}
                key={activityElement.id}
                value={activityElement.keyword}
                onChange={this.selectActivity.bind(this)} />
            )
        ));
        return formArray;
    }

    handleSubmit = () => {
        //Check which activities in this.state are marked true and create those activities
        //Set state to false to indicate that they no longer need to be added
        for (const [activity, isActivitySelected] of Object.entries(this.state)) {
            if(isActivitySelected) {
                this.store.createActivity(activity.toString(), this.props.worksheet);
                this.setState({activity : false});
            }
        }
    }


    selectActivity = (event) => {
        let isSelected = event.target.checked;
        let isSelectedSectionType = event.target.value;
        //Change state based on checkbox check/uncheck action
        this.setState({[isSelectedSectionType]: isSelected});
    }
    
    render() {
        return (
            <Form.Group>
                <br />
                {this.renderActivityPickerForm()}
                <br />
                <Button onClick={this.handleSubmit}>Add</Button>
                <EditModeButton store={this.store} />
            </Form.Group>
    
        );
    }
}

export default WorksheetActivityPicker;