import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';

const MultipleChoiceStudentView = observer(class MultipleChoiceStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;
        this.questionData = this.activity.questionData[this.props.index];

        this.state = {
            question: this.questionData.question,
            answerOptions: [...this.questionData.answerOptions],
            correctAnswer: this.activity.correctAnswerData[this.props.index].correctAnswer,
            studentAnswer: 0,
            isSelectedArray: [false, false, false, false, false]
        };

        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        let isSelected = event.target.checked;
        let radioOptionIndex = event.target.getAttribute('data-index');
        let isSelectedArray = this.state.isSelectedArray;
        isSelectedArray[radioOptionIndex] = isSelected;
        isSelectedArray = isSelectedArray.map((_, index) => {
            return index !== radioOptionIndex ? false : true;
        });
        this.setState({isSelectedArray: isSelectedArray});
    }

    handleSubmit(event) {
        event.preventDefault();
        let studentAnswer = this.state.isSelectedArray.indexOf(true);
        this.activity.studentAnswerData[this.props.index].studentAnswer = studentAnswer;
    }

    populateComponent() {
    }

    componentDidMount() {
        if(this.questionData.question) {
            this.populateComponent();
        }
    }

    render() {
        return(
            <Form.Group >
                <p>This is the student view!</p>
                <p>Question: {this.state.question}</p>
                {this.state.answerOptions.map((answerOption, index) => 
                <StudentAnswerOption key={index} 
                    index={index}
                    isSelected={this.state.isSelectedArray[index]}
                    answerOption={answerOption}
                    handleChange={this.handleChange} />)}
                <Button variant="primary" onClick = {this.handleSubmit}>Submit</Button>
            </Form.Group>
        );
    }
});

const StudentAnswerOption = (props) => {
    return(
        <div>
            <Form.Check data-index={props.index} 
            checked={props.isSelected} 
            onChange={props.handleChange}
            label={props.answerOption}
            type="radio"/>
        </div>
    );
}


export default MultipleChoiceStudentView;