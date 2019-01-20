import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';

class CommentForm extends Component {
    state = {
        text: '',
        errors: {}
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const { postId } = this.props
        const { text } = this.state;

        const newComment = {
            text: text,
            name: user.name,
            avatar: user.avatar
        }

        this.props.addComment(postId, newComment);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if (isEmpty(nextProps.errors)) {
            this.setState({ text: '' });
        }
        this.setState({ errors: nextProps.errors });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Make a comment
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Reply to post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps, { addComment })(CommentForm);