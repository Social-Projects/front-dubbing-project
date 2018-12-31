import React from 'react';
import './Logout.css';

class Logout extends React.Component {
    render() {
        return (
            <div className="logout">
                {/* <span class="user-name"> Ввійшов як {this.props.user.name} {this.props.user.surname}</span> */}
                <span className="user-name">Ввійшов як Март Отто</span>
                <button className="user-action">Вихід</button>
            </div>
        );
    }
}

export default Logout;