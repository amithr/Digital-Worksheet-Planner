// Multiple choice activity has multiple slides like British Council Activity 
// Each IndividualMupltipleChoiceQuestion will be added into a carousel
import React from 'react';
import { observer } from "mobx-react";
import { Form, Button, Carousel} from 'react-bootstrap';
import MultipleChoiceQuestionSlider from './MultipleChoiceQuestionSlider';
import IndividualMultipleChoiceQuestion from './IndividualMultipleChoiceQuestion';

const MultipleChoice = observer(class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;
        this.activity.questionData = [];
        this.activity.correctAnswerData = []
        this.activity.studentAnswerData = [];

        // Default state should be teacher for dev purposes
        this.state = {
            //Includes question and options
            questionNumber: 0
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
    }

    addQuestion = (event) => {
        let questionNumber = this.state.questionNumber;
        questionNumber++;
        this.setState({questionNumber: questionNumber});
        let initialQuestionValue = {question: '', answerOptions: []};
        this.activity.questionData.push(initialQuestionValue);
        console.log(this.state.questionNumber);
    }

    removeQuestion = (event) => {
        let questionIndex = event.target.getAttribute('data-question-index');
        let questionNumber = this.state.questionNumber - 1;
        this.setState({questionNumber: questionNumber});
        if(this.activity.questionData) {
            this.activity.questionData.splice(questionIndex, 1);
        }
    }
    
    populateComponent = () => {
    }

    componentDidMount = () => {
        let questionData = this.activity.questionData;
        if(questionData) {
            this.setState({questionNumber: questionData.length})
        }
    }

    render() {
        return(
            <div position={this.activity.position}>
                <Button onClick={this.addQuestion}>+</Button>
                <MultipleChoiceQuestionSlider removeQuestion={this.removeQuestion} activity={this.activity} questionNumber={this.state.questionNumber}></MultipleChoiceQuestionSlider>
            </div>
        );
    }
});

export default MultipleChoice;