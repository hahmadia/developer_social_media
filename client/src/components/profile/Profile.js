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
        const { getProfileByHandle } = this.props;
        const { handle } = this.props.match.params;
        if (handle) {
            getProfileByHandle(handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { profile, loading } = nextProps.profile;
        const { history, errors } = nextProps;
        const profileNotExist = (errors.noprofile) && (profile == null);
        if (profileNotExist && loading) {
            history.push('/not-found');
        }
    }
    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={loading}
            />;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6" />
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        education={profile.education}
                        experience={profile.experience}
                    />
                    <br></br>
                    {profile.githubusername ? (
                        <ProfileGithub username={profile.githubusername} name={profile.user.name} />
                    ) : null}
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);