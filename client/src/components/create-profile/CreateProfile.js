import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';


class CreateProfile extends Component {
    state = {
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    onSubmit(event) {
        event.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        }

        this.props.createProfile(profileData, this.props.history);
    }

    render() {
        const { errors } = this.state;
        const options = [
            {
                label: '* Select Professional Status',
                value: 0
            },
            {
                label: 'Developer',
                value: 'Developer'
            },
            {
                label: 'Junior Developer',
                value: 'Junior Developer'
            },
            {
                label: 'Intern',
                value: 'Intern'
            }
        ] // Select options for status
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="cold-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile!
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={event => this.onSubmit(event)}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handler for your profile URL."
                                />
                                <SelectListGroup
                                    name="status"
                                    onChange={this.onChange}
                                    value={this.state.status}
                                    error={errors.status}
                                    info="Select what your title is"
                                    options={options}
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Company you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Personal website"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Location you are in"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Programming languages you are familiar with. Please use comma seperated values to type these (Eg. java, python, ruby)"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us about yourself"
                                />
                                <InputGroup
                                    placeholder="Twitter Profile URL"
                                    name="twitter"
                                    icon="fab fa-twitter"
                                    value={this.state.twitter}
                                    onChange={this.onChange}
                                    error={errors.twitter}
                                />

                                <InputGroup
                                    placeholder="Facebook Page URL"
                                    name="facebook"
                                    icon="fab fa-facebook"
                                    value={this.state.facebook}
                                    onChange={this.onChange}
                                    error={errors.facebook}
                                />

                                <InputGroup
                                    placeholder="Linkedin Profile URL"
                                    name="linkedin"
                                    icon="fab fa-linkedin"
                                    value={this.state.linkedin}
                                    onChange={this.onChange}
                                    error={errors.linkedin}
                                />

                                <InputGroup
                                    placeholder="YouTube Channel URL"
                                    name="youtube"
                                    icon="fab fa-youtube"
                                    value={this.state.youtube}
                                    onChange={this.onChange}
                                    error={errors.youtube}
                                />

                                <InputGroup
                                    placeholder="Instagram Page URL"
                                    name="instagram"
                                    icon="fab fa-instagram"
                                    value={this.state.instagram}
                                    onChange={this.onChange}
                                    error={errors.instagram}
                                />
                                <input type="submit" value="Submit" className="btn btn-primary btn-lg btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
