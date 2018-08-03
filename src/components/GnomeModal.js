import React from 'react';
import './../styles/index.css';

export class GnomeModal extends React.Component {

    render() {
        let gnome = this.props.gnome;
        console.log(gnome);
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card mb-3">
                            <img className="card-img-top" src={gnome.thumbnail} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{gnome.name}</h5>
                                <p>Age: <span className="attribute">{gnome.age}</span></p>
                                <p>Height: <span className="attribute">{Math.trunc(gnome.height)} cm</span></p>
                                <p>Weight: <span className="attribute">{Math.trunc(gnome.weight)} kg</span></p>
                                {/* <p>Hair color: <span className="attribute"></span></p> */}
                                <p>Professions:
                                    {gnome.professions.map(function (profession, index) {
                                        return <span> {profession}{index < gnome.professions.length-1 && <span>,</span>}</span>
                                    })}
                                </p>
                                <p>Friends:
                                    {gnome.friends.map(function (friend, index) {
                                        return <span> {friend}{index < gnome.friends.length-1 && <span>,</span>}</span>
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}