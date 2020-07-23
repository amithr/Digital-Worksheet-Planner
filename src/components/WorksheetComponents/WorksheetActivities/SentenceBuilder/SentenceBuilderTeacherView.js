import React from 'react';
import { Form, Button } from 'react-bootstrap';

class SentenceBuilderTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;
        this.activity = this.store.findActivity(this.props.activityid);

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
        this.activity.questions = this.state.question;
    }

    populateComponent() {
        this.state.question({question: this.activity.questions});
    }

    componentDidMount() {
        if(this.activity.questions) {
            this.populateComponent();
        }
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

export default SentenceBuilderTeacherView;