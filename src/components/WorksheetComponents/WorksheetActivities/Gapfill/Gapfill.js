import React from 'react';
import { compose } from 'recompose';
import { observer } from "mobx-react";
import { Form, Button} from 'react-bootstrap';
import StudentView from './GapfillStudentView';
import TeacherView from './GapfillTeacherView';

const Gapfill = observer(class Gapfill extends React.Component {
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
                <p>Gapfill</p>
                {this.renderInner()}
            </Form>
        );
    }
});

export default Gapfill;
