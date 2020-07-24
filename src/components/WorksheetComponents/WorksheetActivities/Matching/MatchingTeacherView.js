import React from 'react';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const MatchingTeacherView = observer(class MatchingTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

        this.state = {
            questions: [],
            answers: [],
            questionAnswerPairFormArray:[],
            questionAnswerPairNumber: 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        //Use mouse out to initiate change to eliminate state updates.
        event.preventDefault();
        let fieldType = event.target.getAttribute('data-field-type');
        let questionAnswerPairNumber = event.target.getAttribute('data-question-answer-pair-number')
        let fieldValue = event.target.value;
        let intermediateArray = []
        if(fieldType === "question") {
            intermediateArray = [...this.state.questions];
            intermediateArray[questionAnswerPairNumber] = fieldValue;
            this.setState({questions: intermediateArray });
        } else if(fieldType === "answer") {
            intermediateArray = [...this.state.answers];
            intermediateArray[questionAnswerPairNumber] = fieldValue;
            this.setState({answers: intermediateArray });
            console.log("correctAnswersEvent" + intermediateArray);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Submit state " + this.state.questions);
        console.log("Submit answers " + this.state.answers);
        this.activity.questionData = this.state.questions;
        this.activity.correctAnswerData = this.state.answers;
    }

    addNewQuestionAnswerPair(event) {
        let questionAnswerPairNumber = this.state.questionAnswerPairNumber;
        //Create new question/answer object
        let questionAnswerPairFormObject = <QuestionAnswerPairForm key={questionAnswerPairNumber} questionAnswerPairNumber={questionAnswerPairNumber} 
        handleChange={this.handleChange} deleteQuestionAnswerPair={this.deleteQuestionAnswerPair} />;
        //Add new question/answer object to array
        this.setState({questionAnswerPairFormArray: [...this.state.questionAnswerPairFormArray, questionAnswerPairFormObject]});
        // Increment Question Answer Pair number
        questionAnswerPairNumber++;
        this.setState({questionAnswerPairNumber: questionAnswerPairNumber});
        console.log('addNewQuestionAnswerPairNumber' + questionAnswerPairNumber);
    }

    deleteQuestionAnswerPair(event) {

    }

    populateComponent(activityQuestions, activityCorrectAnswers) {
        let questionAnswerPairNumber = 0;
        let questionAnswerPairFormArray = [];
        let intermediateQuestionsArray = []
        let intermediateCorrectAnswersArray = [];
        for(let index = 0; index < activityQuestions.length; index++) {
                /*Update variable (questionAnswerPairNumber) so that it can be used
                to update the state after all QuestionAnswerPairForm components have been created*/
                questionAnswerPairNumber = index;
                let questionAnswerPairFormObject = <QuestionAnswerPairForm 
                question={activityQuestions[index]}
                answer={activityCorrectAnswers[index]}
                key={index} 
                questionAnswerPairNumber={index} 
                handleChange={this.handleChange} />;

                questionAnswerPairFormArray.push(questionAnswerPairFormObject)
                /*Make sure that questions and correctAnswers state arrays reflect activity object 
                questions and correctAnswers arrays - these intermediate arrays will later 
                be stored in the state object as 'questions' and 'answers arrays*/
                intermediateQuestionsArray[index] = activityQuestions[index];
                intermediateCorrectAnswersArray[index] = activityCorrectAnswers[index];

                console.log('populate Correct Answers ' + intermediateCorrectAnswersArray);
        }
            // Increment so the user can add the next component
            questionAnswerPairNumber++;
            //Populate state
            this.setState({questions: intermediateQuestionsArray });
            this.setState({answers: intermediateCorrectAnswersArray });
            //Populate DOM
            this.setState({questionAnswerPairFormArray: questionAnswerPairFormArray});
            this.setState({questionAnswerPairNumber: questionAnswerPairNumber});
        
    }
 
    componentDidMount() {
        let activityQuestions = this.activity.questionData;
        let activityCorrectAnswers = this.activity.correctAnswerData;
        if(activityQuestions && activityCorrectAnswers) {
            this.populateComponent(activityQuestions, activityCorrectAnswers);
        }
    }


    render() {
        return(
            <Form.Group>
                <p>This is the teacher view!</p>
                <Button onClick={this.addNewQuestionAnswerPair.bind(this)}>+</Button>
                {this.state.questionAnswerPairFormArray}
                <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
});

const QuestionAnswerPairForm = (props) => {
    return(
            <div>
                <Form.Control type="input" 
                    data-field-type="question"
                    data-question-answer-pair-number={props.questionAnswerPairNumber}
                    defaultValue={props.question}
                    onMouseOut={props.handleChange}
                    placeholder={'Question ' + (props.questionAnswerPairNumber + 1)}
                    size="10"/>
                <Form.Control type="input"
                    data-field-type="answer"
                    data-question-answer-pair-number={props.questionAnswerPairNumber}
                    defaultValue={props.answer}
                    onMouseOut={props.handleChange}
                    placeholder={'Answer ' + (props.questionAnswerPairNumber+1)}
                    size="10"/>
                <Button onClick={props.deleteQuestionAnswerPair}>x</Button>
            </div>
     );
}


export default MatchingTeacherView;