import React from 'react';
import './Writing.css';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const WritingTeacherView = observer(class WritingTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

        this.state = {
            question:'',
            wordCount: 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        let fieldType = event.target.getAttribute('data-field-type');
        if(fieldType === 'wordcount') {
            this.setState({wordCount: event.target.value});
        } else if(fieldType === 'question') {
            this.setState({question: event.target.value});
        }
        this.saveData();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.saveData();
    }

    saveData() {
        this.activity.questionData = this.state.question;
        this.activity.wordCount = this.state.wordCount;
    }

    populateComponent() {
        this.setState({question: this.activity.questionData});
        this.setState({wordCount: this.activity.wordCount});
    }

    componentDidMount() {
        if(this.activity.questionData) {
            this.populateComponent();
        }
    }

    render() {
        return(
        <Form.Group>
            <p>Teacher View</p>
            <Form.Label>Wordcount:</Form.Label>
            <Form.Control className="wordcount" as="input" size="lg" data-field-type="wordcount" type="number"  value={this.state.wordCount} onChange={this.handleChange} />
            <br />
            <Form.Label>Question:</Form.Label>
            <Form.Control as="textarea" rows="3" data-field-type="question" value={this.state.question} onChange={this.handleChange} />
            <Button variant="primary" onClick={this.handleSubmit}>Save Question</Button>
        </Form.Group>
        );
    }
});

WritingTeacherView.propTypes = {
    wordcount: PropTypes.number
}



export default WritingTeacherView;