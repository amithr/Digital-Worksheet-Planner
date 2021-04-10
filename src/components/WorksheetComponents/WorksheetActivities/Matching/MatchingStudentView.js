import React, {useState, useEffect} from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import { getRandomizedCorrectAnswerArray } from './MatchingHelpers';
import './Matching.css';

const MatchingStudentView = observer(class MatchingStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

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
        let questionNumber = event.target.getAttribute('data-question-number')
        let questionAnswer = event.target.value
        console.log(event.target.value);
        console.log(event.target.getAttribute('data-question-number'));
        this.setStudentAnswers(questionNumber, questionAnswer);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.saveData();
    }

    setStudentAnswers(questionNumber, value) {
        let intermediateStudentAnswersArray = [];
        intermediateStudentAnswersArray = this.state.studentAnswers;
        intermediateStudentAnswersArray[questionNumber] = value;
        this.setState({studentAnswers: intermediateStudentAnswersArray});
        this.saveData();
    }

    saveData() {
        let activity = this.store.findActivity(this.props.activityid);
        activity.studentAnswerData = this.state.studentAnswers;
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
        let activityQuestions = [...this.activity.questionData];
        let activityCorrectAnswers = this.activity.correctAnswerData;
        if(activityQuestions && activityCorrectAnswers) {
            this.setState({correctAnswers: getRandomizedCorrectAnswerArray(activityCorrectAnswers)});
            this.setState({questions: activityQuestions}, () => {
                //Populate component using state variables once the state has been set
                this.populateComponent();
            });
        }
    }

    render() {
        return(
            <Form.Group >
                <p>Student View</p>
                <div className="matching-activity-row">{this.state.questionAnswerOptionFormArray}</div>
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
});

const QuestionAnswerOptionForm = (props) => {
    return(
        <div className="matching-activity-row">
            <p className="matching-activity-column">{props.question}</p>
            <Form.Control className="matching-activity-column" type="input" 
                    data-question-number={props.questionNumber}
                    onKeyPress={props.handleChange}
                    placeholder={'Question ' + (props.questionNumber + 1)}
                    maxLength="20"/>
            <p className="matching-activity-column">{'   '+props.correctAnswer}</p>
        </div>
    );
}

export default MatchingStudentView;