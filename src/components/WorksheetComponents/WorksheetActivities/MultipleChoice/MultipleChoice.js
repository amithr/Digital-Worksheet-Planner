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
        console.log(this.state.questionNumber);
    }

    removeQuestion = (event) => {
        let questionIndex = event.target.getAttribute('key');
        this.activity.questionData.splice(questionIndex, 1);
    }
    
    populateComponent = () => {
    }

    componentDidMount = () => {
        if(this.activity.questionData) {
            this.setState({questionNumber: this.activity.questionData.length}) 
        }
    }

    render() {
        return(
            <div position={this.activity.position}>
                <p>This is the multiple choice activity.</p>
                <Button onClick={this.addQuestion}>+</Button><Button onClick={this.removeQuestion}>-</Button>
                <MultipleChoiceQuestionSlider activity={this.activity} questionNumber={this.state.questionNumber}></MultipleChoiceQuestionSlider>
            </div>
        );
    }
});

export default MultipleChoice;