import React from 'react';
import './logout.styles.scss';

import { setCurrentUser } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            navigate: false
        }
    }

    handleClick = async event => {
        try{
            this.props.setCurrentUser( {username:'',sessionId:''} );
            this.setState({navigate:true},() =>  window.location.reload(false) );
        }
        catch( error ){
            console.error(error);
        }   
    }

    render(){
        const {navigate} = this.state;

        if(navigate){
            return <Redirect to="/" push={true}/>;
        }

        return(
            <div className={`logout ${this.props.currentUser.username ? '': 'hide'}`}>
                <div className="buttons">
                    <button className="custom-button" onClick={this.handleClick} > Logout </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});
  
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch( setCurrentUser(user) )
});
  
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Logout);
