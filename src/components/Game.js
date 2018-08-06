import React from 'react';
import './../styles/index.css';
import { Loggin } from './Loggin';
import { HomePage } from './HomePage';

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
        console.log(this.state.phase)
        return (
            <div style={{ height: '100%' }}>
                {
                    this.state.phase === this.states[0] ?

                        <Loggin LogIn={this.LogIn.bind(this)} />
                        :
                        <HomePage />

                }
            </div>
        )
    }
}