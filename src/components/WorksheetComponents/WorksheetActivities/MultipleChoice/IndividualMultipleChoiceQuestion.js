import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import StudentView from './MultipleChoiceStudentView';
import TeacherView from './MultipleChoiceTeacherView';

const IndividualMultipleChoiceQuestion = observer(class IndividualMultipleChoiceQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;
        
    };

    renderInner = () => {
        return (this.props.store.isTeacherMode ? <TeacherView index={this.props.index} activity={this.activity} /> : <StudentView index={this.props.index} activity={this.activity} />);
    };

    render() {
        return(
            <div>
                <br />
                <h3>Q{this.props.index + 1}.</h3>
                <Form onSubmit = {this.handleSubmit} position={this.props.position}>
                    {this.renderInner()}
                </Form>
            </div>
        );
    }
});

export default IndividualMultipleChoiceQuestion;