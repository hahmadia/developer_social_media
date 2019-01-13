import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
    state = {
        clientId: 'b49ce8ebfe371e44d61e',
        clientSecret: '84d1ee8ba3f6f190ad0f9d796568129f7b39e1ba',
        repoCount: 5,
        sort: 'created: asc',
        repos: []
    }

    componentDidMount() {
        const { username } = this.props;
        const { repoCount, sort, clientId, clientSecret } = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${repoCount}&sort=${sort}&client_id=${clientId}
        &client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                if (this.refs.myRef) {
                    this.setState({ repos: data });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { repos } = this.state;
        const { name } = this.props;
        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <a href={repo.html_url} className="text-primary" target="_blank">
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                        <span className="badge badge-success mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-danger mr-1">
                            Forks: {repo.forks_count}
                        </span>
                        <span className="badge badge-primary">
                            Watches: {repo.watchers_count}
                        </span>
                    </div>
                </div>
            </div>
        ));
        return (
            <div ref="myRef">
                <hr />
                <h4>{name} Github Repos</h4>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default ProfileGithub;