import React from 'react';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import MultipleChoice from './MultipleChoice';
import './MultipleChoice.css';

/* See bottom for TeacherAnswerOption component
**/

const MultipleChoiceTeacherView  = observer(class MultipleChoiceTeacherView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question:"Type your question here",
            answerOptions: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
            isSelectedArray: [true, false, false, false, false]
            
        };

        this.activity = this.props.activity;

        
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerOptionChange = this.handleAnswerOptionChange.bind(this);
        this.handleRadioOptionChange = this.handleRadioOptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    saveData() {
        let question = {
            question: this.state.question,
            answerOptions: this.state.answerOptions
        }
        //Assign to respective index in activity data sets
        let correctAnswer =  this.state.isSelectedArray.indexOf(true);
        this.activity.questionData[this.props.index] = question;
        this.activity.correctAnswerData[this.props.index] = correctAnswer;
    }

    handleQuestionChange(event) {
        this.setState({question: event.target.value});
    }

    handleAnswerOptionChange(event) {
        let answerOptionIndex = event.target.getAttribute('data-index');
        let answerOption = event.target.value;
        let answerOptions = this.state.answerOptions;
        answerOptions[answerOptionIndex] = answerOption;
        this.setState({answerOptions: answerOptions});
    }

    handleRadioOptionChange(event) {
        let isSelected = event.target.checked;
        let radioOptionIndex = event.target.getAttribute('data-index');
        let isSelectedArray = this.state.isSelectedArray;
        isSelectedArray[radioOptionIndex] = isSelected;
        isSelectedArray = isSelectedArray.map((_, index) => {
            return index != radioOptionIndex ? false : true;
        });
        this.setState({isSelectedArray: isSelectedArray});
    }

    handleSubmit(event) {
        this.saveData();
        event.preventDefault();       
    }

    populateComponent() {
        this.setState({question: this.activity.questionData[this.props.index].question});
        this.setState({answerOptions: this.activity.questionData[this.props.index].answerOptions})

        let isSelectedArray = this.state.answerOptions.map((_, index) => {
            return (this.correctAnswer === index); 
        });

        this.setState({isSelectedArray: isSelectedArray });
    }

    componentWillUnmount() {
        this.saveData();
        console.log('component will unmount')

    }

    componentDidMount() {
        if(this.questionData) {
            this.populateComponent();
        } else {
            this.activity.questionData = [];
            this.activity.correctAnswerData = []
        }
    }

    render() {
        return(
        <Form.Group>
            <p>This is the teacher view!</p>
            <Form.Control as="textarea" rows="3" value={this.state.question} onChange={this.handleQuestionChange} />
                <Container>
                    {this.state.answerOptions.map((answerOption, index) => 
                    <TeacherAnswerOption key={index} 
                    index={index}
                    isSelected={this.state.isSelectedArray[index]}
                    answerOption={answerOption}
                    handleRadioOptionChange={this.handleRadioOptionChange}
                    handleAnswerOptionChange={this.handleAnswerOptionChange} />)}
                </Container>
            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form.Group>
        );
    }
});

const TeacherAnswerOption = (props) => {
    return (
        <div>
            <Row>
                <Col>
                    <Form.Check data-index={props.index} checked={props.isSelected} onChange={props.handleRadioOptionChange} type="radio"/>
                </Col>
                <Col>
                    <Form.Control data-index={props.index} value={props.answerOption} 
                    onChange={props.handleAnswerOptionChange}  type="input" />
                </Col>
            </Row>
        </div>
    );
}


export default MultipleChoiceTeacherView;