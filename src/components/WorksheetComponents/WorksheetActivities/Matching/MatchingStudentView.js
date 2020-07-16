import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { getRandomizedCorrectAnswerArray } from './MatchingHelpers';

class MatchingStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            questions: [],
            answers: [],
            studentAnswers: [],
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
        activity.studentAnswers = this.state.answer;
    }

    componentDidMount() {
        let activity = this.store.findActivity(this.props.activityid);
        this.setState({answers: getRandomizedCorrectAnswerArray(activity.correctAnswers)});
        this.setState({questions: activity.questions});
    }

    render() {
        return(
            <Form.Group >
                <p>This is the student view!</p>
                <p>Questions: {this.state.questions}</p>
                <p>Answers: {this.state.answers}</p>
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
};



export default MatchingStudentView;