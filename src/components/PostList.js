import React, {Component} from "react";
import {connect} from "react-redux";
// for Solution #1 of action creator with memoize funcion
// import { fetchPosts} from "../actions";
import { fetchPostsAndUsers} from "../actions";
import UserHeader from "./UserHeader";


class PostList extends Component {

    componentDidMount() {

        // for Solution #1 of action creator with memoize function
        // this.props.fetchPosts();

        this.props.fetchPostsAndUsers();
    }

    renderList() {
        return this.props.posts.map( post => {
            return (
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId={post.userId}/>
                    </div>
                </div>
            )
        })
    }

    render() {

        // console.log(this.props.posts)

        return (
            <div className="ui relaxed divided list">
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // returning according to reducer
    return {posts: state.posts};
}

export default connect(
    mapStateToProps,
    // for Solution #1 of action creator with memoize function
    // {fetchPosts}
    {fetchPostsAndUsers}
)(PostList);