import React from 'react';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import StudentView from './MatchingStudentView';
import TeacherView from './MatchingTeacherView';

const Matching = observer(class Matching extends React.Component {
    constructor(props) {
        super(props);

        this.activity = this.props.activity;
    };

    renderInner = () => {
        return (this.props.store.isTeacherMode ? <TeacherView activity={this.activity} /> : <StudentView activity={this.activity} />);
    };

    render() {
        return(
            <Form onSubmit = {this.handleSubmit} position={this.activity.position}>
                <p>Matching Activity</p>
                <Button onClick={this.changeDisplay}>Switch View</Button>
                {this.renderInner()}
            </Form>
        );
    }
});

export default Matching;