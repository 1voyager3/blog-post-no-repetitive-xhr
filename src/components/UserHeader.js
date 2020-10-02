import React, {Component} from "react";
import {connect} from "react-redux";
// for Solution #1 of action creator with memoize function
// import {fetchUser} from "../actions";

class UserHeader extends Component {

    // for Solution #1 of action creator with memoize function
    // componentDidMount() {
    //      this.props.fetchUser(this.props.userId);
    // }

    render() {
        // instead of here all this logic it is going to be calculated in mapStateToProps function
        // const user = this.props.users.find(user => user.id === this.props.userId);

        // destruction from this.props.user which define in mapStateToProps function
        // const user  = this.props.user;
        const {user} = this.props;

        if (!user) {
            return null;
        }

        return (
            <div className="header">
                {user.name}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // second argument "ownProps" is reference of passed props "this.props"
    // console.log(ownProps.userId)
    // console.log(state)

    // returning according to reducer
    return {user: state.users.find(user => user.id === ownProps.userId)};
}

export default connect(
    mapStateToProps,
    // for Solution #1 of action creator with memoize function
    // {fetchUser}
)(UserHeader);