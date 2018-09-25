import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, clearCurrentProfile } from '../../actions/profileActions';
import { ClipLoader } from 'react-spinners';
import ProfileActions from './ProfileActions';


class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(event) {
        event.preventDefault();
        this.props.clearCurrentProfile();
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={loading}
            />;
        }
        else {
            // Check to see if a profile exist
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions />
                        <div style={{ marginBottom: '60px' }}>
                            <button onClick={event => this.onDeleteClick(event)} className="btn btn-danger"> Delete my account </button>
                        </div>

                    </div>
                );
            }
            else {
                dashboardContent =
                    <div>

                        <p>You have not created a profile yet.</p>
                        <Link to='/create-profile' className='btn btn-lg btn-info'>
                            Create profile
                        </Link>
                    </div>
            }
        }


        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="cold-md-12">
                            <h1 className="display-4">DashBoard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, clearCurrentProfile })(Dashboard);
