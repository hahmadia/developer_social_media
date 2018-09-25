import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions'


class AddEducation extends Component {
    state = {
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onCheck = (event) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    onSubmit(event) {
        event.preventDefault();
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(eduData, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Your Experience</h1>
                            <p className="lead text-center">Add any school you have attended</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={event => this.onSubmit(event)}>
                                <TextFieldGroup
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    placeholder="* Degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    placeholder="* Field of Study"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.checked}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Program Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about your school/program"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));