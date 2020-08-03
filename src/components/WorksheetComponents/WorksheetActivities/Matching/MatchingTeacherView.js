import React from 'react';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
        this.deleteQuestionAnswerPair = this.deleteQuestionAnswerPair.bind(this);
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
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.activity.questionData = this.state.questions;
        this.activity.correctAnswerData = this.state.answers;
    }

    addNewQuestionAnswerPair(event) {
        let questionAnswerPairNumber = this.state.questionAnswerPairNumber;
        //Create new question/answer object
        let questionAnswerPairFormObject = <QuestionAnswerPairForm key={questionAnswerPairNumber} questionAnswerPairNumber={questionAnswerPairNumber} 
        handleChange={this.handleChange} deleteQuestionAnswerPair={this.deleteQuestionAnswerPair} />;
        //Add new question/answer object to array - NOTE: need to use 3-dot notation to reflect array change in DOM
        this.setState({questionAnswerPairFormArray: [...this.state.questionAnswerPairFormArray, questionAnswerPairFormObject]}, () => {
            console.log('addNewQuestionAnswerPair' + this.state.questionAnswerPairFormArray);
        });
        // Increment Question Answer Pair number
        questionAnswerPairNumber++;
        this.setState({questionAnswerPairNumber: questionAnswerPairNumber});
    }

    deleteQuestionAnswerPair(event) {
        let questionAnswerPairFormArray = this.state.questionAnswerPairFormArray;
        let questionAnswerPairNumber = event.target.getAttribute('data-question-answer-pair-number')

        questionAnswerPairFormArray.splice(questionAnswerPairNumber, 1);
        //NOTE: need to use 3-dot notation to reflect array change in DOM
        this.setState({questionAnswerPairFormArray: [...questionAnswerPairFormArray]});

        let newQuestionAnswerPairNumber = this.state.questionAnswerPairNumber - 1;
        this.setState({questionAnswerPairNumber: newQuestionAnswerPairNumber});
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
                deleteQuestionAnswerPair={this.deleteQuestionAnswerPair} 
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
                <p>Teacher View</p>
                <Button onClick={this.addNewQuestionAnswerPair.bind(this)}>+</Button>
                <br />
                {this.state.questionAnswerPairFormArray}
                <br />
                <Button variant="primary" onClick={this.handleSubmit}>Save</Button>
            </Form.Group>
        );
    }
});

const QuestionAnswerPairForm = (props) => {
    return(
            <Container>
                <Row>
                    <Col>
                        <Form.Control type="input" 
                            data-field-type="question"
                            data-question-answer-pair-number={props.questionAnswerPairNumber}
                            defaultValue={props.question}
                            onMouseOut={props.handleChange}
                            placeholder={'Question ' + (props.questionAnswerPairNumber + 1)}
                            size="10"/>
                    </Col>
                    <Col>
                    <Form.Control type="input"
                        data-field-type="answer"
                        data-question-answer-pair-number={props.questionAnswerPairNumber}
                        defaultValue={props.answer}
                        onMouseOut={props.handleChange}
                        placeholder={'Answer ' + (props.questionAnswerPairNumber+1)}
                        size="10"/>
                    </Col>
                    <Button data-question-answer-pair-number={props.questionAnswerPairNumber} onClick={props.deleteQuestionAnswerPair}>x</Button>
                </Row>
            </Container>
     );
}


export default MatchingTeacherView;