import React from 'react';
import './../styles/index.css';

//Represents a small card gnome
export class Gnome extends React.Component {

    HandleChange = () => {
        this.props.SelectGnome(this.props.gnome);
    }

    render(){
        let gnome = this.props.gnome;
        return(
            <div className="card GnomeCard FadeInEffect" onClick={this.HandleChange} data-toggle="modal" data-target="#exampleModal">
                <img className="card-img-top GnomeCard__Thumbnail" src={gnome.thumbnail} alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{gnome.name}</h5>
                </div>
            </div>
        )
    }
}