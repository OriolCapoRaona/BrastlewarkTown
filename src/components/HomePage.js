import React from 'react';
import { GnomeService } from '../services/GnomeService';
import { Object } from 'core-js';
import { GnomeGroup } from './GnomeGroup';
import { Gnome } from './Gnome';
import { GnomeModal } from './GnomeModal';
import {GnomesFilter} from './GnomesFilter';

export class HomePage extends React.Component {

    constructor() {
        super();
        let that = this;
        this.state = {
            gnomes: [],
            gnomesByProfession: {},
            gnomesByAge: {},
            gnomesByName: [],
            gnomesStartingByLetter: {},
            selectedGnomeIndex: null,
            gnomeService: new GnomeService(),
            selectedGnome: null,
            selectedGnomes: [],
            selectedGnomesTitle: "",
        }

        this.state.gnomeService.GetGnomes.then(function (gnomes) {
            that.setState({
                gnomes: gnomes
            })
            let gnomesByProfession = that.state.gnomeService.groupGnomesByFeature("professions");
            let gnomesByAge = that.state.gnomeService.groupGnomesByFeature("age");
            let gnomesByName = that.state.gnomeService.sortGnomesByName();
            let gnomesStartingByLetter = that.state.gnomeService.gnomesStartingByLetter();
            that.setState({
                gnomesByProfession: gnomesByProfession,
                gnomesByAge: gnomesByAge,
                gnomesByName: gnomesByName,
                gnomesStartingByLetter: gnomesStartingByLetter,
            })
        });

    }

    handleClick = (selectedGnomeIndex) => {
        this.setState({
            selectedGnomeIndex: selectedGnomeIndex
        });
    }

    SelectGnome = (selectedGnome) => {
        this.setState({
            selectedGnome: selectedGnome
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
            <div className="Body">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="https://www.shareicon.net/download/2016/08/02/805648_gnome.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
                        Brastlewark
                    </a>
                </nav>
                <div className="Body__Spacing">
                    {
                        this.state.selectedGnomesTitle.length ?

                            <GnomeGroup gnomes={this.state.selectedGnomes} groupedTitle={this.state.selectedGnomesTitle} ReturnHome={this.ReturnHome.bind(this)} />
                            :
                            <div>
                                <div className="FadeInEffect">

                                    <div className="jumbotron jumbotron-fluid" style={{ 'backgroundColor': '#e9ecef6e' }}>
                                        <div className="container">
                                            <h1 className="display-4">Welcome!</h1>
                                            <p className="lead">You have arrived to Brastlewark town</p>
                                            <p>
                                                In this town, the inhabitants are Gnomes. They live in peace: they go to work every day, and meet their friends and their couples. There are {this.state.gnomes.length} habitants, so it's quite difficult to identify quickly some members. In this simple React JS App, we'll give you an approach of their profiles, depending on some features.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        <h3>Gnomes grouped by profession</h3>
                                                    </button>
                                                </h5>
                                            </div>

                                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="GroupedSectionContainer">
                                                        <div className="GroupedSection">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        <h3>Gnomes grouped by <span title={ageTooltip} style={{ textDecoration: "underline", cursor: "help" }}>age range</span> </h3>
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="GroupedSectionContainer">
                                                        <div className="GroupedSection">
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
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                        <h3>All</h3>
                                                    </button>
                                                </h5>
                                            </div>

                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    {this.state.gnomes.map(function (gnome_, index) {
                                                        return (
                                                            <Gnome key={index} key1={index} gnome={gnome_} SelectGnome={that.SelectGnome.bind(this)} />
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingFour">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                        <h3>Gnomes sorted alphabetically</h3>
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    {this.state.gnomesByName.map(function (gnome_, index) {
                                                        return (
                                                            <Gnome key={index} key1={index} gnome={gnome_} SelectGnome={that.SelectGnome.bind(this)} />
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingFive">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                        <h3>Gnomes starting by letter</h3>
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="GroupedSectionContainer">
                                                        <div className="GroupedSection">
                                                            {Object.keys(that.state.gnomesStartingByLetter).map(function (prop, index) {
                                                                return (
                                                                    <div key={index} className="FeatureBox" onClick={() => that.selectGnomeGroup(that.state.gnomesStartingByLetter[prop], "age: " + prop)}>
                                                                        <h5>{prop}</h5>
                                                                        <p>{that.state.gnomesStartingByLetter[prop].length}</p>
                                                                    </div>
                                                                )
                                                            })}
                                                            <div style={{ clear: "both" }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingSix">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                        <h3>More filters</h3>
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    {that.state.gnomes.length && 
                                                    <GnomesFilter gnomes={that.state.gnomes}/>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ clear: 'both' }}></div>

                                <GnomeModal gnome={that.state.selectedGnome} />
                            </div>
                    }
                </div>
            </div>
        )
    }
}