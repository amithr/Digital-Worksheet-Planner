import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import StudentView from './MultipleChoiceStudentView';
import TeacherView from './MultipleChoiceTeacherView';

const IndividualMultipleChoiceQuestion = observer(class IndividualMultipleChoiceQuestion extends React.Component {
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
            return <StudentView
                index={this.props.index}
                activity={this.props.activity}   />
        } else if (display === 'teacher') {
            return <TeacherView
                index={this.props.index}
                activity={this.props.activity}
                removeQuestion={this.props.removeQuestion}   
                />
            }
    };

    render() {
        return(
            <div>
                <h1>{this.props.index + 1}</h1>
                <Form onSubmit = {this.handleSubmit} position={this.props.position}>
                    <Button onClick={this.changeDisplay}>Change Display</Button>
                    {this.renderInner()}
                </Form>
            </div>
        );
    }
});

export default IndividualMultipleChoiceQuestion;