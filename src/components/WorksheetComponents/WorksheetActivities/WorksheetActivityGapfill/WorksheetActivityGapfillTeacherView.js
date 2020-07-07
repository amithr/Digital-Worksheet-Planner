import React from 'react';
import SelectionHighlighter from 'react-highlight-selection';
import { Form, Button } from 'react-bootstrap';
import './WorksheetActivityGapfill.css'

class WorksheetActivityGapfillTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            question:''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({question: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let activity = this.store.findActivity(this.props.activityid);
        activity.question = this.state.question;
    }

    render() {
        return(
        <Form.Group>
            <p>This is the teacher view!</p>
            <p>Type your text in the box below. Wherever you would like a gapfill, type a '$' directly followed by the answer.
            </p>
            <Form.Control as="textarea" rows="3" value={this.state.text} onChange={this.handleChange} />
            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form.Group>
        );
    }
};

export default WorksheetActivityGapfillTeacherView;