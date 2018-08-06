import React from 'react';
import './../styles/index.css';
import { Loggin } from './Loggin';
import { HomePage } from './HomePage';

// This components leads the Game, showing first the Log In screen, and then the HomePage
export class Game extends React.Component {

    states = ['loggin', 'homepage']

    constructor() {
        super();
        this.state = {
            username: null,
            phase: this.states[0]
        }
    }

    LogIn = (_username) => {
        this.setState({
            username: _username,
            phase: this.states[1],
        })
    }

    render() {
        let that = this;
        return (
            <div style={{ height: '100%' }}>
                {
                    this.state.phase === this.states[0] ?

                        <Loggin LogIn={this.LogIn.bind(this)} />
                        :
                        <HomePage username={that.state.username}/>

                }
            </div>
        )
    }
}