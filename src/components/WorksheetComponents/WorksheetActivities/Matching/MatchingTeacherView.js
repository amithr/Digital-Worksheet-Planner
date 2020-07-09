import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class MatchingTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            questionAnswerPairFormArray:[],
            questionNumber: 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({question: event.target.value});
        
    }

    handleSubmit(event) {
        event.preventDefault();
        let activity = this.store.findActivity(this.props.activityid);
        activity.question = this.state.question;
    }
    addQuestionAnswerPair(event) {
        let questionNumber = this.state.questionNumber;
        questionNumber++;
        this.setState({questionNumber: questionNumber});
        //Create new question/answer object
        let questionAnswerPairFormObject = <QuestionAnswerPairForm key={questionNumber} questionNumber={questionNumber} />;
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
                    placeholder={'Question' + props.questionNumber}
                    size="10"/>
                <Form.Control type="input"
                    placeholder={'Answer' + props.questionNumber}
                    size="10"/>
            </div>
     );
}


export default MatchingTeacherView;