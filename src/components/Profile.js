import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { username, swipestotal } = this.props;

        return (
            <div className="profile__container">
                <div className="profile">
                    <span className="profile__name"><b>{username}</b></span><br />
                    <span className="profile__swipes"><b>{swipestotal}</b> swipes</span>
                </div>
            </div>

        )
    }
}

export default Profile;