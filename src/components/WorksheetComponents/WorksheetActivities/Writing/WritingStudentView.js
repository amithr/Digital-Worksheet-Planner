import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';

const WritingStudentView = observer(class WritingStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

        this.state = {
            question: '',
            studentAnswer:''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({studentAnswer: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.activity.studentAnswerData = this.state.studentAnswer;
    }

    populateComponent() {
        this.setState({question: this.activity.questionData});
        if(this.activity.studentAnswerData) {
            this.setState({studentAnswer: this.activity.studentAnswerData});
        }
    }

    componentDidMount() {
        if(this.activity.questionData) {
            this.populateComponent();
        }
    }

    render() {
        return(
            <Form.Group >
                <p>This is the student view!</p>
                <p>Question: {this.state.question}</p>
                <Form.Control as="textarea" value={this.state.studentAnswer} rows="3" onChange={this.handleChange}/>
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
});



export default WritingStudentView;