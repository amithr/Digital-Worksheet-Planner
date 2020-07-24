import React from 'react';
import { observer } from "mobx-react";
import { Form, Button } from 'react-bootstrap';

const GapfillTeacherView = observer(class GapfillTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

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
        this.activity.questionData = this.state.question;
    }

    populateComponent(questionText) {
        this.state.setState({question: questionText});
    }

    componentDidMount() {
        let questionText = this.activity.questionData;
        if(questionText) {
            this.populateComponent(questionText);
        }
    }

    render() {
        return(
        <Form.Group>
            <p>This is the teacher view!</p>
            <p>Type your text in the box below. Wherever you would like a gapfill, type a '$' directly followed by the answer.
            </p>
            <Form.Control as="textarea" rows="3" value={this.state.question} onChange={this.handleChange} />
            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form.Group>
        );
    }
});

export default GapfillTeacherView;