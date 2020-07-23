import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { getRandomizedCorrectAnswerArray } from './MatchingHelpers';
import './Matching.css';

class MatchingStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            questions: [],
            correctAnswers: [],
            studentAnswers: [],
            questionAnswerOptionFormArray: []
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

    populateComponent() {
        let questions = this.state.questions;
        let correctAnswers = this.state.correctAnswers;
        let questionAnswerOptionFormArray = [];

        for(let index = 0; index < questions.length; index++) {
            let questionAnswerOptionFormObject = <QuestionAnswerOptionForm
                key={index}
                question = {questions[index]}
                //(Randomized correct answer)
                correctAnswer = {correctAnswers[index]}
                questionNumber={index}
                handleChange={this.handleChange}
            />

            questionAnswerOptionFormArray.push(questionAnswerOptionFormObject);
        }

        this.setState({questionAnswerOptionFormArray: questionAnswerOptionFormArray});
    }

    componentDidMount() {
        let activity = this.store.findActivity(this.props.activityid);
        let questions = [...activity.questions];
        let correctAnswers = activity.correctAnswers;
        if(questions && correctAnswers) {
            this.setState({correctAnswers: getRandomizedCorrectAnswerArray(correctAnswers)});
            this.setState({questions: questions}, () => {
                //Populate component using state variables once the state has been set
                this.populateComponent();
            });
        }
    }

    render() {
        return(
            <Form.Group >
                <p>This is the student view!</p>
                <div className="matching-activity-row">{this.state.questionAnswerOptionFormArray}</div>
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
};

const QuestionAnswerOptionForm = (props) => {
    return(
        <div className="matching-activity-row">
            <p className="matching-activity-column">{props.question}</p>
            <Form.Control className="matching-activity-column" type="input" 
                    data-question-number={props.questionNumber}
                    defaultValue={''}
                    onMouseOut={props.handleChange}
                    placeholder={'Question ' + (props.questionNumber + 1)}
                    maxLength="2"/>
            <p className="matching-activity-column">{'   '+props.correctAnswer}</p>
        </div>
    );
}

export default MatchingStudentView;