// Multiple choice activity has multiple slides like British Council Activity 
// Each IndividualMupltipleChoiceQuestion will be added into a carousel
import React from 'react';
import { Form, Button, Carousel} from 'react-bootstrap';
import IndividualMultipleChoiceQuestion from './IndividualMultipleChoiceQuestion';

class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);

        // Default state should be teacher for dev purposes
        this.state = {
            //Includes question and options
            individualMultipleChoiceQuestions: [],
            multipleChoiceQuestionNumber: 0
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);

    }

    addQuestion = (event) => {
        let newMultipleChoiceQuestion = <IndividualMultipleChoiceQuestion  
            store={this.props.store} activityid={this.props.activityid} />;
        let individualMultipleChoiceQuestions = this.state.individualMultipleChoiceQuestions;
        let multipleChoiceQuestionNumber = this.state.multipleChoiceQuestionNumber;

        individualMultipleChoiceQuestions.push(newMultipleChoiceQuestion);

        this.setState({individualMultipleChoiceQuestions: individualMultipleChoiceQuestions});
        this.setState({multipleChoiceQuestionNumber: multipleChoiceQuestionNumber++});
        //Also add to activity.questions?
    }

    removeQuestion = (event) => {
    }

    updateQuestion = () => {
        //update individual question
    }

    populateComponent = () => {
        let individualMultipleChoiceQuestions = this.state.individualMultipleChoiceQuestions;
        let correctAnswers = this.state.correctAnswers;
        let studentAnswers = this.state.studentAnswers;

        for(let i = 0; i < individualMultipleChoiceQuestions.length; i++) {
            let individualQuestion = <IndividualMultipleChoiceQuestion
            key={i} 
            store={this.props.store}
            activityid={this.props.activityid}
            question={individualMultipleChoiceQuestions[i].question} 
            answerOptions={individualMultipleChoiceQuestions[i].answerOptions} 
            correctAnswer = {correctAnswers[i]} 
            studentAnswer = {studentAnswers[i]}

            />

            individualMultipleChoiceQuestions.push(individualQuestion);
        }

        this.setState({individualMultipleChoiceQuestions: individualMultipleChoiceQuestions})
    }

    componentDidMount = () => {

    }

    render() {
        return(
            <div>
                <p>This is the multiple choice activity.</p>
            </div>
        );
    }
};

export default MultipleChoice;