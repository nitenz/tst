import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './login.styles.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            email:'',
            password:''    
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try{
            if( email === 'nitenz@gmail.com' && password === 'teste') {
                alert( 'Logged in' );
                this.setState({ email: '', password: '' });
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
            <div className="login">
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
                        <CustomButton  type="submit" value="Submit Form"> Login </CustomButton>
                    </div>
                </form> 
            </div>
        )
    }
}

export default Login;