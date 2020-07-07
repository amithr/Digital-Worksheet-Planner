import React from 'react';
import { Form, Button } from 'react-bootstrap';

class WorksheetActivityPicker extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            'gapfill': false,
            'matching': false,
            'multiple_choice': false,
            'writing': false,

        }

        this.activityArray = [
            {id: 1, label:'Gapfill', keyword:'gapfill'}, 
            {id: 2, label:'Matching', keyword: 'matching'}, 
            {id: 3, label:'Multiple Choice', keyword: 'multiple_choice'}, 
            {id: 4, label: 'Writing', keyword: 'writing'}];
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
    
    };

    renderActivityPickerForm = () => {
        let formArray = []
        this.activityArray.map((activityElement) => (
            formArray.push(<Form.Check type="checkbox" label={activityElement.label}
            key={activityElement.id}
            value={activityElement.keyword}
            onChange={this.selectActivity.bind(this)} />)
        ));
        return formArray;
    }

    handleSubmit = () => {
        if(this.state.writing) {
            console.log('written');
            this.store.createActivity('writing');
        }
        if(this.state.matching) {
            this.store.createActivity('matching');
        }
        if(this.state.multiple_choice) {
            this.store.createActivity('multiple_choice');
        }
        if(this.state.gapfill) {
            this.store.createActivity('gapfill');
        }
    }


    selectActivity = (event) => {
        let isSelected = event.target.checked;
        let isSelectedSectionType = event.target.value;
        if(isSelected) {
            switch(isSelectedSectionType) {
                case 'gapfill':
                    this.setState({'gapfill': true});
                    break;
                case 'matching':
                    this.setState({'matching': true});
                    break;
                case 'multiple_choice':
                    this.setState({'multiple_choice': true});
                    break;
                case 'writing':
                    this.setState({'writing': true});
                    break;
            }
        }
    }
    
    render() {
        return (
            <Form >
                {this.renderActivityPickerForm()}
                <Button onClick={this.handleSubmit}>Add</Button>
            </Form>
    
        );
    }
}

export default WorksheetActivityPicker;