import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../LoginHelper/_actions';
import './Manage.css'

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="login-form">
             <div className="mainmenu">
          
                <h1>Вітаємо, {user.firstName}!</h1>
                <p id="sub">Ви увійшли в систему</p>

                <p id="all">Усі зареєстровані працівники:</p>
                {users.loading && <em>Завантаження користувачів</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li className="listOfAdmins" key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Видалення ...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span  > &mdash; <a onClick={this.handleDeleteUser(user.id)}><span  className="del">Видалити користувача</span></a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                </p>
            </div>
            </div>
        
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };