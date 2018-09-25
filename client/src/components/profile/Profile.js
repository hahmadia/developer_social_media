import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import { ClipLoader } from 'react-spinners';
import { getProfileByHandle } from '../../actions/profileActions'

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    render() {
        return (
            <div>
                <ProfileHeader />
                <ProfileAbout />
                <ProfileCreds />
                <ProfileGithub />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);