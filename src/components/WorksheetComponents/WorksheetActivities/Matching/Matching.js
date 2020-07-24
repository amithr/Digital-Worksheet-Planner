import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import StudentView from './MatchingStudentView';
import TeacherView from './MatchingTeacherView';

const Matching = observer(class Matching extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;

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
          return <StudentView activity={this.activity} />
        } else if (display === 'teacher') {
          return <TeacherView activity={this.activity} />
        }
    };

    render() {
        return(
            <Form onSubmit = {this.handleSubmit} position={this.activity.position}>
                <p>Hello! This is the matching activity!</p>
                <Button onClick={this.changeDisplay}>Change Display</Button>
                {this.renderInner()}
            </Form>
        );
    }
});

export default Matching;