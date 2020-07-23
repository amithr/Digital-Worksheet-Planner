import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { stringToArray, transformArrayToString } from './GapfillHelpers.js'

//Immediate Feedback Optional?

class GapfillStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.store = this.props.store;
        //I don't normally initialize an activity object, but this was used in more than one place
        //in this component.
        this.activity = this.store.findActivity(this.props.activityid);

        this.state = {
            questionGapfillText:"",
            studentAnswers: [],
            correctAnswers: [],
            answerFormFieldArray: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    // Store student answers in student answers state array
    handleChange = (event) => {
        let questionNumber = event.target.placeholder;
        let studentAnswer = event.target.value;
        let studentAnswers = [...this.state.studentAnswers];
        studentAnswers[questionNumber] = studentAnswer;
        this.setState({
            studentAnswers: studentAnswers
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.activity.studentAnswers = this.state.studentAnswers;
        console.log(this.activity);
    }

    //Run this onComponentMount to convert text from teacher view to gapfill in student view.
    convertQuestionTexttoGapfill = () => {
        //Turn the text into an array of strings.
        //Find the array element with a $ symbol, indicating a gapfill.
        //Separate the $ symbol and the gapfill answer.
        //Store the answers in correctAnswers.
        //Insert a formfield component in its place.
        //Turn the array back into a string.
        //Store correctAnswers and answerFormFieldArray in state object.
        let questionText = this.props.question;
        let questionTextArray = stringToArray(questionText);
        let questionNumber = 0;
        let correctAnswers = [];
        let answerFormFieldArray = [];
        for (let i=0; i < questionTextArray.length; i++) {
            //Find text to be changed into gapfill
            if(questionTextArray[i][0] === "$") {
                questionNumber++;
                //Remove dollar sign, store gapfill answer, turn text into gpafill
                let answer = questionTextArray[i].substring(1);
                //Change text marked by '$' to '______'
                questionTextArray[i] = questionNumber+'. ________';
                // Store correct answer for each '$' marked gapfill text in array
                correctAnswers[i] = answer;
                //Generate form object that corresponds to gapfill
                answerFormFieldArray.push(
                    <Form.Control type="input"
                    key={questionNumber} 
                    placeholder={questionNumber}
                    onChange={this.handleChange} 
                    size="10" />
                );
            }
        }
        //Change text array back to a string that can be displayed
        let questionTextWithGapfills = transformArrayToString(questionTextArray);
        this.setState({questionGapfillText: questionTextWithGapfills});
        this.setState({correctAnswers: correctAnswers});
        this.setState({answerFormFieldArray: answerFormFieldArray});
    }

    // When component mounts, immediately change teacher defined text into a gapfill
    // for the student to view.
    componentDidMount() {
        if(this.props.question) {
            this.convertQuestionTexttoGapfill();
            //This is here because the questions and answers were submitted as a string from the teacher view.
            this.activity.correctAnswers = this.state.correctAnswers;
        }
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

export default GapfillStudentView;