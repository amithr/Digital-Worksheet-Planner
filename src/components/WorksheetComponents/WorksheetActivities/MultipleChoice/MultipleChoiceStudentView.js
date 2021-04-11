import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';

const MultipleChoiceStudentView = observer(class MultipleChoiceStudentView extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

        this.state = {
            question: "Fill in question and answer options.",
            answerOptions: [],
            correctAnswer: 0,
            studentAnswer: 0,
            isSelectedArray: [true, false, false, false, false]
        };

        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    saveData() {
        let studentAnswer = this.state.isSelectedArray.indexOf(true);
        this.activity.studentAnswerData[this.props.index].studentAnswer = studentAnswer;
    }

    handleChange(event) {
        let isSelected = event.target.checked;
        let radioOptionIndex = event.target.getAttribute('data-index');
        let isSelectedArray = this.state.isSelectedArray;
        isSelectedArray[radioOptionIndex] = isSelected;
        isSelectedArray = isSelectedArray.map((_, index) => {
            return index !== radioOptionIndex ? false : true;
        });
        this.setState({isSelectedArray: isSelectedArray});
        this.saveData();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.saveData();
    }

    populateComponent() {
        this.setState({ question: this.activity.questionData[this.props.index].question})
        this.setState({ answerOptions: [...this.activity.questionData[this.props.index].answerOptions]});
        this.setState({ correctAnswer: this.activity.correctAnswerData[this.props.index].correctAnswer}, () => {
            let isSelectedArray = this.state.isSelectedArray;
            isSelectedArray[this.state.correctAnswer] = true;
            this.setState({ isSelectedArray: isSelectedArray});
        });
    }

    componentDidMount() {
        this.populateComponent();
    }

    render() {
        return(
            <Form.Group >
                <p>Student View</p>
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