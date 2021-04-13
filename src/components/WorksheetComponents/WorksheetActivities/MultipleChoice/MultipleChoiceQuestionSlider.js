import React from 'react';
import { observer } from "mobx-react";
import { Form, Button, ButtonGroup} from 'react-bootstrap';
import IndividualMultipleChoiceQuestion from './IndividualMultipleChoiceQuestion';

/**
 * Also includes QuestionLink and QuestionLinkMenu components
 */

const MultipleChoiceQuestionSlider = observer(class MultipleChoiceQuestionSlider extends React.Component {
    constructor(props) {
        super(props);
        // Default state should be teacher for dev purposes
        this.state = {
            questionsLinks: [],
            questions: [],
            currentQuestionIndex: 0,
            currentQuestion: ""
        };

        this.activity = this.props.activity;
        this.store = this.props.store;
    
        this.changeDisplay = this.changeDisplay.bind(this);
    };

    renderQuestion = (questionIndex) => {
        this.setState({currentQuestion: this.state.questions[questionIndex]})
    };

    changeDisplay = (event) => {
        let currentQuestionIndex = event.target.getAttribute('data-index');
        console.log("Current Multiple Choice Question: " + this.state.questionNumber);
        this.setState({ currentQuestionIndex: currentQuestionIndex });
        this.renderQuestion(currentQuestionIndex);
    };

    generateQuestionsLinks = () => {
        let questionsLinks = [];
        for(let i = 0; i < this.props.questionNumber; i++) {
            let questionLink = <QuestionLink
            key={i}
            index = {i} 
            changeDisplay={this.changeDisplay}
            />;

            questionsLinks.push(questionLink);
        }

        this.setState({questionsLinks: questionsLinks});
    }

    populateComponent = () => {
        let questions = [];
        for(let i = 0; i < this.props.questionNumber; i++) {
            let individualQuestion = <IndividualMultipleChoiceQuestion 
            key={i}
            index={i}
            removeQuestion={this.props.removeQuestion}
            activity={this.activity} 
            store = {this.store}
            />;
            
            questions.push(individualQuestion);
        }

        let mostRecentQuestionIndex = this.props.questionNumber - 1;
        //Display most recent question
        this.setState({currentQuestion: questions[mostRecentQuestionIndex]})
        this.setState({questions: questions});
        this.generateQuestionsLinks();

    }

    componentDidUpdate(nextProps) {
        //Update slider with new questions
        if(nextProps.questionNumber != this.props.questionNumber) {
            this.populateComponent();
            console.log('Updated slider');
        }
    }

    componentDidMount() {
        if(this.props.questionNumber > 0) {
            this.populateComponent();
        } else {
            
        }     
    }

    render() {
        return(
            <div>
                <br />
                <QuestionLinkMenu questionsLinks={this.state.questionsLinks} />
                {this.state.currentQuestion}
            </div>
        );
    }
});

const QuestionLinkMenu = (props) => {
    return(
        <ButtonGroup>
            {props.questionsLinks}
        </ButtonGroup>
    )
}

const QuestionLink = (props) => {
    return (
            <Button
            variant="secondary"
            key={props.index} 
            data-index={props.index} 
            onClick={props.changeDisplay}>
                {props.index + 1}
            </Button>
    );
}


export default MultipleChoiceQuestionSlider;