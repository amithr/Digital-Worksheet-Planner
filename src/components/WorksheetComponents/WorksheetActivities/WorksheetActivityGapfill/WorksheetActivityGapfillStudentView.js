import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { stringToArray } from './GapfillHelpers.js'

//Immediate Feedback Optional?

class WorksheetActivityGapfillStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;

        this.state = {
            questionGapfillText:"",
            studentAnswer: [],
            correctAnswers: [],
            answerFormFieldArray: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = (event) => {
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // this.convertQuestionTexttoGapfill();
        // let activity = this.store.findActivity(this.props.activityid);
        // activity.answer = this.state.answer;
    }

    //Run this onComponentMount
    convertQuestionTexttoGapfill = () => {
        //Turn the text into an array of strings.
        //Find the array element with a $ symbol, indicating a gapfill.
        //Separate the $ symbol and the gapfill answer.
        //Insert a gapfill component in its place.
        //Turn the array back into a string.
        let questionText = this.props.question;
        let questionTextArray = stringToArray(questionText);
        let questionNumber = 0;
        let correctAnswers = [];
        let answerFormFieldArray = [];
        for (let i=0; i < questionTextArray.length; i++) {
            if(questionTextArray[i][0] === "$") {
                questionNumber++;
                let answer = questionTextArray[i].substring(1);
                questionTextArray[i] = questionNumber+'. ________';
                correctAnswers[i] = answer;
                answerFormFieldArray.push(
                    <Form.Control type="input"
                    key={questionNumber} 
                    placeholder={questionNumber+1} 
                    size="10" />
                );
            }
        }
        this.setState({questionGapfillText: questionTextArray.toString()});
        this.setState({correctAnswer: correctAnswers});
        this.setState({answerFormFieldArray: answerFormFieldArray});
    }

    componentDidMount() {
        this.convertQuestionTexttoGapfill();
    }

    render() {
        return(
            <Form.Group >
                <p>This is the student view!</p>
                <p>Question: {this.state.questionGapfillText}</p>
                {this.state.answerFormFieldArray}
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
};

const IndividualGapfill = (props) => {
    return (
        <Form.Control type="input" placeholder={props.questionNumber} size={props.length} />
    )
}

export default WorksheetActivityGapfillStudentView;