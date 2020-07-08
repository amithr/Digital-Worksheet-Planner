import React from 'react';
import { Form, Button} from 'react-bootstrap';
import StudentView from './GapfillStudentView';
import TeacherView from './GapfillTeacherView';

class Gapfill extends React.Component {
    constructor(props) {
        super(props);

        // Default state should be teacher for dev purposes.
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
          return <StudentView store={this.props.store} answer={this.props.answer} question={this.props.question} activityid={this.props.activityid} />
        } else if (display === 'teacher') {
          return <TeacherView store={this.props.store} question={this.props.question} wordcount={this.props.wordcount} activityid={this.props.activityid} />
        }
    };

    render() {
        return(
            <Form onSubmit = {this.handleSubmit} position={this.props.position}>
                <p>Hello! This is the gapfill!</p>
                <Button onClick={this.changeDisplay}>Change Display</Button>
                {this.renderInner()}
            </Form>
        );
    }
};

export default Gapfill;
