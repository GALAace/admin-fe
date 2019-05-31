import React 		from 'react';
import { Link } 	from 'react-router-dom';

import Util from 'util/bs.jsx';
import User         from 'service/user-service.jsx'

const _bs 			= new Util();
const _user 	    = new User();

class NavTop extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            username: _bs.getStorage('userInfo').username || ''
		}
	}
    // 退出登录
    onLogout(){
        _user.logout().then(res => {
            _bs.removeStorage('userInfo');
            window.location.href = '/login';
        }, errMsg => {
            _bs.errorTips(errMsg);
        });
    }
	render(){
		return (
			<div className="navbar navbar-default top-navbar">
	            <div className="navbar-header">
	                <Link className="navbar-brand" to="/"><b>BStore</b>admin</Link>
	                <span></span>
	            </div>
	            <div className="notice">
	            	欢迎使用BStore后台管理系统
	            </div>
	            <ul className="nav navbar-top-links navbar-right">
	                <li className="dropdown">
	                    <a className="dropdown-toggle" href="javascript:;">
	                        <i className="fa fa-user fa-fw"></i>
		                    {
		                        this.state.username
		                        ? <span>欢迎, {this.state.username}</span>
	                            : <span>欢迎您</span>
	                        }
                            <i className="fa fa-caret-down"></i>
	                    </a>
	                    <ul className="dropdown-menu dropdown-user">
	                        <li>
		                        <a onClick ={(e) => {this.onLogout();}} >
	                                <i className="fa fa-sign-out fa-fw"></i>
	                                <span>退出登录</span>
		                        </a>
	                        </li>
	                    </ul>
	                
	                </li>
	                
	            </ul>
	        </div>
		);
	}
}

export default NavTop;