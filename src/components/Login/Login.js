import React from 'react'
import './Login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component{
    render(){ 
        return(
          
<div class="login-form">

    <div class="main-div">
        <div class="panel">
        <h2>Вхід</h2>
   </div>

    <form id="Login" >

        <div class="form-group">
            <input type="email" class="form-control" id="inputEmail" placeholder="Логін" autocomplete="off"/>
        </div>

        <div class="form-group">
            <input type="password" class="form-control" id="inputPassword" placeholder="Пароль"/>
        </div>

        <button type="submit" class="btn btn-primary">Вхід</button>

        <label for="remember-me" class="remember">
            <span>Запам'ятати</span> <span><input id="remember-me" name="remember-me" type="checkbox"/></span>
        </label>

        <div id="register-link" class="text-right">
          <a href="#" class="text-info" >Забули пароль?</a>
        </div>

    </form>

    </div>
</div>
        )
    }
}
export default Login;