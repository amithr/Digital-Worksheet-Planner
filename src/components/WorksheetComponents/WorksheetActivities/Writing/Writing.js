import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import StudentView from './WritingStudentView';
import TeacherView from './WritingTeacherView';

const Writing = observer(class Writing extends React.Component {
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
            <Form onSubmit = {this.handleSubmit} position={this.props.position}>
                <p>Writing Activity</p>
                <Button onClick={this.changeDisplay}>Switch View</Button>
                {this.renderInner()}
            </Form>
        );
    }
});

export default Writing;