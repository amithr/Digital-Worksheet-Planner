import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import { stringToArray, transformArrayToString } from './GapfillHelpers.js'

//Immediate Feedback Optional?

const GapfillStudentView = observer(class GapfillStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

        this.state = {
            questionGapfillText:"",
            studentAnswers: [],
            correctAnswers: [],
            answerFormFieldArray: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    saveData() {
        this.activity.studentAnswerData = this.state.studentAnswers;
    }

    // Store student answers in student answers state array
    handleChange = (event) => {
        let questionNumber = event.target.placeholder;
        let studentAnswer = event.target.value;
        let studentAnswers = [...this.state.studentAnswers];
        studentAnswers[questionNumber] = studentAnswer;
        this.setState({
            studentAnswers: studentAnswers
        });
        this.saveData();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.saveData();
    }

    //Run this onComponentMount to convert text from teacher view to gapfill in student view.
    populateComponent = (questionText) => {
        //Turn the text into an array of strings.
        //Find the array element with a $ symbol, indicating a gapfill.
        //Separate the $ symbol and the gapfill answer.
        //Store the answers in correctAnswers.
        //Insert a formfield component in its place.
        //Turn the array back into a string.
        //Store correctAnswers and answerFormFieldArray in state object.
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
                    onKeyPress={this.handleChange} 
                    size="10" />
                );
            }
        }
        //Change text array back to a string that can be displayed
        let questionTextWithGapfills = transformArrayToString(questionTextArray);
        this.setState({questionGapfillText: questionTextWithGapfills});
        this.setState({answerFormFieldArray: answerFormFieldArray});
        this.setState({correctAnswers: correctAnswers}, () => {return correctAnswers});
        
    }

    // When component mounts, immediately change teacher defined text into a gapfill
    // for the student to view.
    componentDidMount() {
        let questionText = this.activity.questionData;
        if(questionText) {
            let correctAnswers = this.populateComponent(questionText);
            this.activity.correctAnswerData = correctAnswers;
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
});

export default GapfillStudentView;