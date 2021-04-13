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

    saveData() {
        this.activity.questionData = this.state.question;
    }

    handleChange(event) {
        this.setState({question: event.target.value});
        this.saveData()
    }

    handleSubmit(event) {
        event.preventDefault();
        this.saveData();
    }

    populateComponent(questionText) {
        this.setState({question: questionText});
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
            <p>Teacher View</p>
            <br />
            <p>Type your text in the box below. Wherever you would like a gapfill, type a '$' directly followed by the answer.
            </p>
            <Form.Control as="textarea" rows="3" value={this.state.question} onChange={this.handleChange} />
            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form.Group>
        );
    }
});

export default GapfillTeacherView;