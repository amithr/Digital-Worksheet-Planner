import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { mergeQuestionAndAnswerArrays } from './MatchingHelpers';

class MatchingTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            questionAnswerPairFormArray:[],
            questionAnswerPairNumber: 0,
            questions: [],
            answers: []
        };

        this.timer = [];
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        //Use mouse out to initiate change to eliminate state updates.
        event.preventDefault();
        let fieldType = event.target.getAttribute('data-field-type');
        let questionAnswerPairNumber = event.target.getAttribute('data-question-answer-pair-number');
        let fieldValue = event.target.value;
        let intermediateArray = []
        if(fieldType === "question") {
            intermediateArray = [...this.state.questions];
            intermediateArray[questionAnswerPairNumber] = fieldValue;
            console.log(intermediateArray);
            this.setState({questions: intermediateArray });
        } else if(fieldType === "answer") {
            intermediateArray = [...this.state.answers];
            intermediateArray[questionAnswerPairNumber] = fieldValue;
            this.setState({answers: intermediateArray });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let questionAndAnswerArray = mergeQuestionAndAnswerArrays(this.state.questions, this.state.answers);
        let activity = this.store.findActivity(this.props.activityid);
        activity.question = questionAndAnswerArray;
    }
    addQuestionAnswerPair(event) {
        let questionAnswerPairNumber = this.state.questionAnswerPairNumber;
        questionAnswerPairNumber++;
        this.setState({questionAnswerPairNumber: questionAnswerPairNumber});
        //Create new question/answer object
        let questionAnswerPairFormObject = <QuestionAnswerPairForm key={questionAnswerPairNumber} questionAnswerPairNumber={questionAnswerPairNumber} handleChange={this.handleChange} />;
        //Add new question/answer object to array
        this.setState({questionAnswerPairFormArray: [...this.state.questionAnswerPairFormArray, questionAnswerPairFormObject]});
    }


    render() {
        return(
            <Form.Group>
                <p>This is the teacher view!</p>
                <Button onClick={this.addQuestionAnswerPair.bind(this)}>+</Button>
                {this.state.questionAnswerPairFormArray}
                <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
};

const QuestionAnswerPairForm = (props) => {
    return(
            <div>
                <Form.Control type="input" 
                    data-field-type="question"
                    data-question-answer-pair-number={props.questionAnswerPairNumber}
                    onMouseOut={props.handleChange}
                    placeholder={'Question' + props.questionAnswerPairNumber}
                    size="10"/>
                <Form.Control type="input"
                    data-field-type="answer"
                    data-question-answer-pair-number={props.questionAnswerPairNumber}
                    onMouseOut={props.handleChange}
                    placeholder={'Answer' + props.questionAnswerPairNumber}
                    size="10"/>
            </div>
     );
}


export default MatchingTeacherView;