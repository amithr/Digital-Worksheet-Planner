import React from 'react';
import { Form, Button} from 'react-bootstrap';

class MatchingStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            answer:''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let activity = this.store.findActivity(this.props.activityid);
        activity.answer = this.state.answer;
    }

    render() {
        return(
            <Form.Group >
                <p>This is the student view!</p>
                <p>Questions: {this.props.question}</p>
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
};



export default MatchingStudentView;