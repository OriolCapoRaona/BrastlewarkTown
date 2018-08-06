import React from 'react';
import { Gnome } from './Gnome';
import { GnomeModal } from './GnomeModal';
import './../styles/index.css';

// This component allows us to aplly different filters at the same time:
// - Filter by professions
// - Filter by hair color
// - Order list by: weight, height, age or alphabetically
export class GnomesFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedGnome: null,
            userPreferences: {
                sortBy: '',
                professions: [],
                hairColor: [],
            },
            gnomesStatistics: this.getStatistics(),
        };
    }

    getStatistics() {
        let statistics = {
            hairColor: [],
            professions: [],
        };

        this.props.gnomes.forEach(function (gnome) {
            if (statistics.hairColor.indexOf(gnome.hair_color) === -1) {
                statistics.hairColor.push(gnome.hair_color);
            }

            gnome.professions.forEach(function (job) {
                if (statistics.professions.indexOf(job) === -1) statistics.professions.push(job);
            })
        })
        statistics.professions = statistics.professions.sort(function (job1, job2) {
            job1 = job1.replace(' ', ''); job2 = job2.replace(' ', '');
            if (job1 < job2) return -1;
            else if (job1 === job2) return 0;
            else return 1;
        });

        return statistics;
    }

    filterGnomes() {
        let that = this;
        let gnomes = this.props.gnomes;
        
        //filter by hair color
        if (that.state.userPreferences.hairColor.length) {
            let hairColorsSelected = that.state.userPreferences.hairColor;
            gnomes = gnomes.filter(function (gnome) {
                for (var i = 0; i < hairColorsSelected.length; i++) {
                    if (gnome.hair_color.indexOf(hairColorsSelected[i]) > -1) {
                        return true;
                    }
                }
                return false;
            });
        }

        //filter by profession
        if (that.state.userPreferences.professions.length) {
            let professionsSelected = that.state.userPreferences.professions;
            gnomes = gnomes.filter(function (gnome) {
                for (var i = 0; i < professionsSelected.length; i++) {
                    if (gnome.professions.indexOf(professionsSelected[i]) > -1) {
                        return true;
                    }
                }
                return false;
            });
        }
        
        //sort gnomes by selected feature
        if(that.state.userPreferences.sortBy.length){
            let feature = that.state.userPreferences.sortBy;
            gnomes.sort(function(gnome1, gnome2){
                if(gnome1[feature] < gnome2[feature]) return -1;
                else if(gnome1[feature] === gnome2[feature]) return 0;
                else return 1;
            })
        }

        return gnomes;
    }

    SelectGnome = (selectedGnome) => {
        this.setState({
            selectedGnome: selectedGnome
        });
    }

    selectJob(job) {
        let professions = this.state.userPreferences.professions;
        if (professions.indexOf(job) === -1) {
            professions.push(job);
        } else {
            professions.splice(professions.indexOf(job), 1);
        }
        this.setState({
            professions: professions,
        });
    }

    selectHairColor(hairColor) {
        let hairColors = this.state.userPreferences.hairColor;
        if (hairColors.indexOf(hairColor) === -1) {
            hairColors.push(hairColor);
        } else {
            hairColors.splice(hairColors.indexOf(hairColor), 1);
        }
        this.setState({
            hairColor: hairColors,
        });
    }

    selectSortBy(property) {
        let userPreferences = this.state.userPreferences;
        userPreferences.sortBy = property;
        this.setState({
            userPreferences: userPreferences
        })
    }

    render() {
        let that = this;
        let gnomes = this.filterGnomes();
        return (
            <div>
                <div id="filters" className="row filterTools">

                    {/* profession filter */}
                    <div className="dropdown tool">
                        <button className="btn btnReturnHome filter dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Professions
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {
                                this.state.gnomesStatistics.professions.map(function (job, index) {
                                    return (
                                        <div key={index} className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id={"defaultCheck" + index} onClick={that.selectJob.bind(that, job)} />
                                            <label className="form-check-label" htmlFor={"defaultCheck" + index}>
                                                {job}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* hair filter */}
                    <div className="dropdown tool">
                        <button className="btn btnReturnHome filter dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hair color
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            {
                                this.state.gnomesStatistics.hairColor.map(function (hairColor, index) {
                                    return (
                                        <div key={index} className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id={"defaultCheck" + index} onClick={that.selectHairColor.bind(that, hairColor)} />
                                            <label className="form-check-label" htmlFor={"defaultCheck" + index} style={{ color: hairColor }}>
                                                {hairColor}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* sort by*/}
                    <div className="dropdown tool sortby">
                        
                        <span>Sort by </span>

                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btnReturnHome filter" onClick={that.selectSortBy.bind(that, 'height')}>
                                <input type="radio" name="options" id="option1" autoComplete="off" /> height
                            </label>
                            <label className="btn btnReturnHome filter" onClick={that.selectSortBy.bind(that, 'weight')}>
                                <input type="radio" name="options" id="option2" autoComplete="off" /> weight
                            </label>
                            <label className="btn btnReturnHome filter" onClick={that.selectSortBy.bind(that, 'age')}>
                                <input type="radio" name="options" id="option3" autoComplete="off" /> age
                            </label>
                            <label className="btn btnReturnHome filter" onClick={that.selectSortBy.bind(that, 'name')}>
                                <input type="radio" name="options" id="option3" autoComplete="off" /> alphabetically
                            </label>
                        </div>
                    </div>

                </div>
                <div id="content" className="GroupedSection">
                    {gnomes.map(function (gnome_, index) {
                        return (
                            <Gnome key={index} key1={index} gnome={gnome_} SelectGnome={that.SelectGnome.bind(this)} />
                        )
                    })}
                </div>
                <GnomeModal gnome={that.state.selectedGnome} />
            </div>
        )
    }
}