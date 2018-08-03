import React from 'react';
import { GnomeService } from '../services/GnomeService';
import { Object } from 'core-js';
import { GnomeGroup } from './GnomeGroup';
import { Popover } from 'react-bootstrap';

export class Game extends React.Component {

    constructor() {
        super();
        let that = this;
        this.state = {
            gnomes: [],
            gnomesByProfession: {},
            gnomesByAge: {},
            selectedGnomeIndex: null,
            gnomeService: new GnomeService(),
            selectedGnomes: [],
            selectedGnomesTitle: "",
        }

        this.state.gnomeService.GetGnomes.then(function (gnomes) {
            that.setState({
                gnomes: gnomes
            })
            let gnomesByProfession = that.state.gnomeService.groupGnomesByFeature("professions");
            let gnomesByAge = that.state.gnomeService.groupGnomesByFeature("age");
            that.setState({
                gnomesByProfession: gnomesByProfession,
                gnomesByAge: gnomesByAge,
            })
        });

    }

    handleClick = (selectedGnomeIndex) => {
        this.setState({
            selectedGnomeIndex: selectedGnomeIndex
        });
    }

    selectGnomeGroup = (gnomes, filterTitle) => {
        this.setState({
            selectedGnomes: gnomes,
            selectedGnomesTitle: filterTitle
        })
    }

    ReturnHome = () => {
        this.setState({
            selectedGnomesTitle: '',
        })
    }

    // componentDidMount(){
    //     $(function () {
    //         $('.example-popover').popover({
    //           container: 'body'
    //         })
    //       })
    // }

    render() {
        let that = this;
        let gnomesByAgeKeys = Object.keys(this.state.gnomesByAge);
        gnomesByAgeKeys.sort(function (a, b) {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
        });
        let ageGroups = { "babies": [], "youngs": [], "adults": [], "elder": [] };
        for (var i = 0; i < gnomesByAgeKeys.length; i++) {
            let age = gnomesByAgeKeys[i];
            let selectedGroup = "";
            if (age < 100) selectedGroup = 'babies';//ageGroups['babies'] = ageGroups['babies'].concat(this.state.gnomesByAge[age]);//+= this.state.gnomesByAge[age].length;
            else if (age >= 100 && age < 200) selectedGroup = 'youngs';//ageGroups['youngs'] += this.state.gnomesByAge[age].length;
            else if (age >= 200 && age < 300) selectedGroup = 'adults';//ageGroups['adults'] += this.state.gnomesByAge[age].length;
            else if (age >= 300) selectedGroup = 'elder';//ageGroups['elder'] += this.state.gnomesByAge[age].length;
            ageGroups[selectedGroup] = ageGroups[selectedGroup].concat(this.state.gnomesByAge[age]);
        }

        let ageTooltip = "babies age less than 100 years\nyoungs age between 100 and 200 years\nadults age between 200 and 300 years\nelders grater than 300 years";

        return (
            <div>
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                        <img src="https://www.shareicon.net/download/2016/08/02/805648_gnome.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                        Brastlewark
                    </a>
                </nav>
                {/* <div className="Header">
                    <div className="row">
                        <img className="Icon" src="https://www.shareicon.net/download/2016/08/02/805648_gnome.svg" />
                        <h1>Brastlewark Town</h1>
                    </div>
                </div> */}
                <div className="Body">
                    {
                        this.state.selectedGnomesTitle.length ?

                            <GnomeGroup gnomes={this.state.selectedGnomes} groupedTitle={this.state.selectedGnomesTitle} ReturnHome={this.ReturnHome.bind(this)} />
                            :
                            <div className="FadeInEffect">

                                <div class="jumbotron jumbotron-fluid">
                                    <div class="container">
                                        <h1 class="display-4">Welcome!</h1>
                                        <p class="lead">You have arrived to Brastlewark</p>
                                        <p>
                                            In this town, the inhabitants are Gnomes. They live in peace: they go to work every day, and meet their friends and their couples. There are {this.state.gnomes.length} habitants, so it's quite difficult to identify quickly some members. In this simple React JS App, we'll give you an approach of their profiles, depending on some features.
                                        </p>
                                    </div>
                                </div>

                                <div className="GroupedSection">
                                    <h3>Gnomes grouped by profession (#gnomes)</h3>
                                    {Object.keys(this.state.gnomesByProfession).map(function (prop, index) {
                                        return (
                                            <div key={index} className="FeatureBox" onClick={() => that.selectGnomeGroup(that.state.gnomesByProfession[prop], "profession: " + prop)}>
                                                <h5>{prop}</h5>
                                                <p>{that.state.gnomesByProfession[prop].length}</p>
                                            </div>
                                        )
                                    })}
                                    <div style={{ clear: "both" }}></div>
                                </div>

                                <div className="GroupedSection">
                                    <h3>Gnomes grouped by <span title={ageTooltip} style={{ textDecoration: "underline", cursor: "help" }}>age range</span>  (#gnomes)</h3>
                                    {Object.keys(ageGroups).map(function (prop, index) {
                                        return (
                                            <div key={index} className="FeatureBox" onClick={() => that.selectGnomeGroup(ageGroups[prop], "age: " + prop)}>
                                                <h5>{prop}</h5>
                                                <p>{ageGroups[prop].length}</p>
                                            </div>
                                        )
                                    })}
                                    <div style={{ clear: "both" }}></div>
                                </div>
                            </div>
                    }

                    {/* {this.state.gnomes.map(function (gnome_, index) {
                    return <Gnome key={index} key1={index} gnome={gnome_} handleClick={that.handleClick.bind(this)} />
                })}

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            {this.state.selectedGnomeIndex && 
                                <Gnome key1={0} gnome={this.state.gnomes[this.state.selectedGnomeIndex]}/>
                            }
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
        )
    }
}