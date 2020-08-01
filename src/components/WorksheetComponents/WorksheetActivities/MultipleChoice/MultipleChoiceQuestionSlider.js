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
    
        this.changeDisplay = this.changeDisplay.bind(this);
    };

    changeDisplay = (event) => {
        let currentQuestionIndex = event.target.getAttribute('data-index');
        console.log('Current Question Index '+ currentQuestionIndex);
        this.setState({ currentQuestionIndex: currentQuestionIndex });
        this.setState({currentQuestion: this.state.questions[currentQuestionIndex]})
    };

    renderInner = () => {
        let currentQuestionIndex = this.state.currentQuestion;
        return this.state.questions[currentQuestionIndex];
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
            activity={this.activity} />;
            
            questions.push(individualQuestion);
        }


        this.setState({questions: questions});
        this.generateQuestionsLinks();
    }

    componentDidUpdate(nextProps) {
        if(nextProps.questionNumber != this.props.questionNumber) {
            this.populateComponent();
        }
    }

    componentDidMount() {
        if(this.props.questionNumber > 0) {
            this.populateComponent();
        }     
    }

    render() {
        return(
            <div>
                <p>Hello! This is the multiple choice question slider!</p>
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