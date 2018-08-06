import React from 'react';
import './../styles/index.css';
import { Gnome } from './Gnome';
import { GnomeModal } from './GnomeModal';

// This component represents a specific group of gnomes filtered by some feature.  
// Here, you can filter gnomes by name, and see their details by clicking on them
export class GnomeGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterValue: "",
            selectedGnome: this.props.gnomes[0],
        }
    }

    componentDidMount() {
        let that = this;
        let inputFilter = document.getElementById("gnomeFilter");
        inputFilter.onkeyup = function () {
            let value = inputFilter.value;
            that.setState({
                filterValue: value
            })
        }
    }

    SelectGnome = (selectedGnome) => {
        this.setState({
            selectedGnome: selectedGnome
        });
    }

    render() {
        let that = this;
        let gnomes = this.props.gnomes;
        //Apply filter by name
        if (that.state.filterValue.length) {
            gnomes = gnomes.filter(function (gnome) {
                return gnome.name.toLowerCase().indexOf(that.state.filterValue.toLowerCase()) > -1;
            });
        }
        return (
            <div className="FadeInEffect">
                <div>
                    <button type="button" className="btn btnReturnHome" onClick={()=>this.props.ReturnHome()}><i className="fas fa-arrow-left"></i>  Return home</button>
                </div>
                <h3 style={{marginLeft: "30px", marginTop: "30px"}}>Gnomes grouped by {that.props.groupedTitle}</h3>
                <div className="GroupedGnomes">
                    <div className="input-group nameFilter">
                        <input type="text" id="gnomeFilter" className="form-control" placeholder="Filter by name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    {gnomes.map(function (gnome, index) {
                        return (
                            <Gnome key={index} key1={index} gnome={gnome} SelectGnome={that.SelectGnome.bind(this)} />
                        )
                    })}
                </div>
                <GnomeModal gnome={that.state.selectedGnome}/>
            </div>
        )
    }
}