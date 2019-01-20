import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { ClipLoader } from 'react-spinners';


class Post extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getPost(id);
    }

    render() {
        const { post, loading } = this.props;
        const { id } = this.props.match.params;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <ClipLoader />
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={id} />
                    <CommentFeed postId={id} comments={post.comments} />
                </div>
            );
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light">
                                Back to feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post.post,
})

export default connect(mapStateToProps, { getPost })(Post);