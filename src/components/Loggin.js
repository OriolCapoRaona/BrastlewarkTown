import React from 'react';
import './../styles/index.css';
import $ from 'jquery';

export class Loggin extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="LogginBackground">

                <div style={{width:'30%'}}>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon2"><i class="fas fa-lock"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon2" />
                    </div>
                </div>
            </div>
        )
    }
}