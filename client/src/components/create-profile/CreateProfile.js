import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';


class CreateProfile extends Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skils: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }

    render() {
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

export default connect(mapStateToProps)(CreateProfile);
