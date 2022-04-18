import React, { Component } from 'react';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pass: ''
		};
	}

    onPsswordChange(e) {
        this.setState({
            pass: e.target.value
        })
    }

	render() {
		const { pass } = this.state;
        const {login, logErr, lengthErr} = this.props

        let renderLogErr, renderLengthErr;

        logErr ? renderLogErr = <span className='login-error'>Incorrectly entered password!</span> : null
        lengthErr ? renderLengthErr = <span className='login-error'>The password must be longer than 5 characters!</span> : null

		return (
			<div className="login-container">
				<div className="login">
					<h2 className="uk-modal-title uk-text-center">Authorization</h2>
					<div className="uk-margin-top uk-text-lead">Password</div>
					<input
                        className="uk-input uk-margin-top"
                        placeholder="Password"
                        name=""
                        id=""
                        type="password"
                        onChange={(e) => this.onPsswordChange(e)}
                        value={pass}
                        />
                        {renderLogErr}
                        {renderLengthErr}
					<button
                        type='button'
                        className="uk-button uk-button-primary uk-margin-top"
                        onClick={() => login(pass)}>
                        Enter 
                    </button>
				</div>
			</div>
		);
	}
}
