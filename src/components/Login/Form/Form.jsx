import React from 'react';
import './Form.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../LoginHelper/_actions';


class Form extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }



    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (

            <div className="login-form">

                <div className="main-div">
                    <div >
                        <h2>Вхід</h2>
                    </div>

                    <form id="Login" onSubmit={this.handleSubmit} >

                        <div  className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <input type="text" className="form-control" name="username" id="inputEmail" autoComplete="off" placeholder="Логін" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                            <div className="help-block">Заповніть поле "Логін"</div>
                        }
                        </div>

                        <div  className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <input type="password" className="form-control" id="inputPassword" name="password" autoComplete="off" placeholder="Пароль"  value={password} onChange={this.handleChange}/>
                            {submitted && !password &&
                            <div className="help-block">Заповніть поле "Пароль"</div>
                        }
                        </div>

                        <button type="submit" className="btn btn-primary">Вхід</button>
                        {loggingIn &&
                            <img src="data:i;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>

                        <label className="remember">
                            <span>Запам'ятати</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span>
                        </label>

                        <div id="register-link" className="text-right">
                            <a href="#" className="text-info" >Забули пароль?</a>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
const connectedLoginPage = connect(mapStateToProps)(Form);
export  { connectedLoginPage as Form }; 

