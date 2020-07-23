import React from 'react';
import { Form, Button} from 'react-bootstrap';
import StudentView from './MultipleChoiceStudentView';
import TeacherView from './MultipleChoiceTeacherView';

class IndividualMultipleChoiceQuestion extends React.Component {
    constructor(props) {
        super(props);

        // Default state should be teacher for dev purposes
        this.state = {
            display: 'teacher'
        };
    
    };

    changeDisplay = () => {
        let { display } = this.state;
        this.setState({ display: display === 'student' ? 'teacher' : 'student' });
    };

    renderInner = () => {
        let { display } = this.state;
        
        if (display === 'student') {
          return <StudentView store={this.props.store} 
          question={this.props.question} 
          correctAnswer={this.props.correctAnswer} 
          studentAnswer={this.props.studentAnswer} 
          answerOptions={this.props.answerOptions} 
          activityid={this.props.activityid} />
        } else if (display === 'teacher') {
          return <TeacherView store={this.props.store} 
          correctAnswer={this.props.correctAnswer}
          question={this.props.question} 
          answerOptions={this.props.answerOptions} 
          activityid={this.props.activityid} />
        }
    };

    render() {
        return(
            <Form onSubmit = {this.handleSubmit} position={this.props.position}>
                <p>Hello! This is the multiple choice activity!</p>
                <Button onClick={this.changeDisplay}>Change Display</Button>
                {this.renderInner()}
            </Form>
        );
    }
};

export default IndividualMultipleChoiceQuestion;