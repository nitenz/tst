import React from 'react';
import FormInput from '../form-input/form-input.component';
import './register.styles.scss';

import { setCurrentUser } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

class Register extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            email:'',
            password:''
        }
    }

    componentDidMount(){
        this.setState({sessionId:'' });
    }

    registered = data => {
        if( !data.error ){
            const username = this.state.email;
            this.setState({ email: '', password: ''});
            this.props.setCurrentUser( {username:username,sessionId:data.token} );
        }else{
            alert( data.error );
        }
        
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try{
            if( email && password ) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        "email": email,
                        "password": password
                     })
                };
               
                fetch('https://reqres.in/api/register', requestOptions)
                    .then(response => response.json())
                    .then(data => this.registered(data) );
            }
            
        }
        catch( error ){
            console.error(error);
        }   
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        return(
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email"
                        type="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange} 
                        label="email"
                        required
                     />
                    
                    <FormInput 
                        name="password" 
                        type="password"  
                        value={this.state.password}
                        handleChange={this.handleChange} 
                        label="password"
                        required 
                    />
                     <div className="buttons">
                        <button className="custom-button" type="submit" value="Submit Form" > Register </button>
                    </div>
                </form> 
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
  )(Register);
