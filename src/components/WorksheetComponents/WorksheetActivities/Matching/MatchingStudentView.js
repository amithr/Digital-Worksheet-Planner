import React, {useState, useEffect} from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import { getRandomizedCorrectAnswerArray } from './MatchingHelpers';
import './Matching.css';

const MatchingStudentViewDefault = observer(class MatchingStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

        this.state = {
            questions: [],
            correctAnswers: [],
            studentAnswers: [],
            questionAnswerOptionFormArray: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let activity = this.store.findActivity(this.props.activityid);
        activity.studentAnswerData = this.state.answer;
    }

    populateComponent() {
        let questions = this.state.questions;
        let correctAnswers = this.state.correctAnswers;
        let questionAnswerOptionFormArray = [];

        for(let index = 0; index < questions.length; index++) {
            let questionAnswerOptionFormObject = <QuestionAnswerOptionForm
                key={index}
                question = {questions[index]}
                //(Randomized correct answer)
                correctAnswer = {correctAnswers[index]}
                questionNumber={index}
                handleChange={this.handleChange}
            />

            questionAnswerOptionFormArray.push(questionAnswerOptionFormObject);
        }

        this.setState({questionAnswerOptionFormArray: questionAnswerOptionFormArray});
    }

    componentDidMount() {
        let questions = [...this.activity.questionData];
        let correctAnswers = this.activity.correctAnswerData;
        if(questions && correctAnswers) {
            this.setState({correctAnswers: getRandomizedCorrectAnswerArray(correctAnswers)});
            this.setState({questions: questions}, () => {
                //Populate component using state variables once the state has been set
                this.populateComponent();
            });
        }
    }

    render() {
        return(
            <Form.Group >
                <p>Student View</p>
                <div className="matching-activity-row">{this.state.questionAnswerOptionFormArray}</div>
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
});


const  MatchingStudentView = observer((props) => {
    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [studentAnswers, setStudentAnswers] = useState([]);
    const [questionAnswerOptionFormArray, setQuestionAnswerOptionFormArray] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let activity = props.store.findActivity(props.activityid);
        activity.studentAnswerData = answer;
    }

    const handleChange = (event) => {
        setAnswer(event.target.value)
    }

    const populateComponent = () => {
        let tempQuestionAnswerOptionFormArray = [];

        for(let index = 0; index < questions.length; index++) {
            let questionAnswerOptionFormObject = <QuestionAnswerOptionForm
                key={index}
                question = {questions[index]}
                //(Randomized correct answer)
                correctAnswer = {correctAnswers[index]}
                questionNumber={index}
                handleChange={handleChange}
            />

            tempQuestionAnswerOptionFormArray.push(questionAnswerOptionFormObject);
        }

        setquestionAnswerOptionFormArray([...tempQuestionAnswerOptionFormArray, questionAnswerOptionFormArray]);
    }

    useEffect(() => {
        let questionsFromStore = [...props.activity.questionData];
        let correctAnswersFromStore = props.activity.correctAnswerData;
        if(questionsFromStore && correctAnswersFromStore) {
            setCorrectAnswers(getRandomizedCorrectAnswerArray(correctAnswersFromStore))
            setQuestions(questionsFromStore);
        }
    }, []);

    useEffect(() => {
        // Repopulate the student view whenever new questions are added
        let tempQuestionAnswerOptionFormArray = [];

        for(let index = 0; index < questions.length; index++) {
            let questionAnswerOptionFormObject = <QuestionAnswerOptionForm
                key={index}
                question = {questions[index]}
                //(Randomized correct answer)
                correctAnswer = {correctAnswers[index]}
                questionNumber={index}
                handleChange={handleChange}
            />

            tempQuestionAnswerOptionFormArray.push(questionAnswerOptionFormObject);
        }

        setQuestionAnswerOptionFormArray([...tempQuestionAnswerOptionFormArray, questionAnswerOptionFormArray]);
    }, [questions])

    return(
        <Form.Group >
            <p>Student View</p>
            <div className="matching-activity-row">{questionAnswerOptionFormArray}</div>
            <Button variant="primary" onClick = {handleSubmit}>Submit</Button>
        </Form.Group>
    );
});

const QuestionAnswerOptionForm = (props) => {
    return(
        <div className="matching-activity-row">
            <p className="matching-activity-column">{props.question}</p>
            <Form.Control className="matching-activity-column" type="input" 
                    data-question-number={props.questionNumber}
                    defaultValue={''}
                    onMouseOut={props.handleChange}
                    placeholder={'Question ' + (props.questionNumber + 1)}
                    maxLength="20"/>
            <p className="matching-activity-column">{'   '+props.correctAnswer}</p>
        </div>
    );
}

export default MatchingStudentView;