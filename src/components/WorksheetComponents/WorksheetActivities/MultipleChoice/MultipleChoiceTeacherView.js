import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class MultipleChoiceTeacherView extends React.Component {
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
        this.setState({question: this.activity.questions});
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
            <Form.Control as="input" size="lg" type="number" placeholder="# of words required" value={this.props.wordcount} onChange={this.handleChange} />
            <Form.Control as="textarea" rows="3" value={this.state.question} onChange={this.handleChange} />
            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form.Group>
        );
    }
};


export default MultipleChoiceTeacherView;