import React from 'react';
import { Form, Button} from 'react-bootstrap';
import StudentView from './WorksheetActivityWritingStudentView';
import TeacherView from './WorksheetActivityWritingTeacherView';

class WorksheetActivityWriting extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            display: 'student'
        };
    
    };

    changeDisplay = () => {
        let { display } = this.state;
        this.setState({ display: display === 'student' ? 'teacher' : 'student' });
    };

    renderInner = () => {
        let { display } = this.state;
        
        if (display === 'student') {
          return <StudentView store={this.props.store} answer={this.props.answer} question={this.props.question} activityid={this.props.activityid} />
        } else if (display === 'teacher') {
          return <TeacherView store={this.props.store} question={this.props.question} wordcount={this.props.wordcount} activityid={this.props.activityid} />
        }
    };

    render() {
        return(
            <Form onSubmit = {this.handleSubmit} position={this.props.position}>
                <p>Hello! This is the writing activity!</p>
                <Button onClick={this.changeDisplay}>Change Display</Button>
                {this.renderInner()}
            </Form>
        );
    }
};

export default WorksheetActivityWriting;