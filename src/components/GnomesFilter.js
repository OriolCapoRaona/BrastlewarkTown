import React from 'react';
import { Gnome } from './Gnome';
import { GnomeModal } from './GnomeModal';
import './../styles/index.css';

export class GnomesFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedGnome: null,
            userPreferences: {
                weight: {
                    min: -Infinity,
                    max: Infinity,
                },
                height: {
                    min: -Infinity,
                    max: Infinity,
                },
                age: {
                    min: -Infinity,
                    max: Infinity,
                },
                professions: [],
                alphabetically: false,
                hairColor: [],
                gnomesToShow: this.props.gnomes.length,
            },
            gnomesStatistics: this.getStatistics(),
        };
    }

    getStatistics() {
        let statistics = {
            weight: {
                min: Infinity,
                max: -Infinity,
            },
            height: {
                min: Infinity,
                max: -Infinity,
            },
            age: {
                min: Infinity,
                max: -Infinity,
            },
            hairColor: [],
            professions: [],
        };

        this.props.gnomes.forEach(function (gnome) {
            if (gnome.weight > statistics.weight.max) statistics.weight.max = gnome.weight;
            if (gnome.weight < statistics.weight.min) statistics.weight.min = gnome.weight;

            if (gnome.height > statistics.height.max) statistics.height.max = gnome.height;
            if (gnome.height < statistics.height.min) statistics.height.min = gnome.height;

            if (gnome.age > statistics.age.max) statistics.age.max = gnome.age;
            if (gnome.age < statistics.age.min) statistics.age.min = gnome.age;

            if (statistics.hairColor.indexOf(gnome.hair_color) == -1) {
                statistics.hairColor.push(gnome.hair_color);
            }

            gnome.professions.forEach(function (job) {
                if (statistics.professions.indexOf(job) == -1) statistics.professions.push(job);
            })
        })
        statistics.professions = statistics.professions.sort(function(job1, job2){
            job1=job1.replace(' ',''); job2=job2.replace(' ','');
            if(job1 < job2) return -1;
            else if(job1 === job2) return 0;
            else return 1;
        });

        return statistics;
    }

    filterGnomes() {
        let that = this;
        let gnomes = this.props.gnomes;
        //filter by weight
        gnomes = gnomes.filter(function (gnome) {
            return (gnome.weight >= that.state.userPreferences.weight.min && gnome.weight <= that.state.userPreferences.weight.max);
        })

        //filter by height
        gnomes = gnomes.filter(function (gnome) {
            return (gnome.height >= that.state.userPreferences.height.min && gnome.height <= that.state.userPreferences.height.max);
        })

        //filter by age
        gnomes = gnomes.filter(function (gnome) {
            return (gnome.age >= that.state.userPreferences.age.min && gnome.age <= that.state.userPreferences.age.max);
        })

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

        if (that.state.userPreferences.gnomesToShow) {
            gnomes = gnomes.slice(0, that.state.userPreferences.gnomesToShow);
        }

        return gnomes;
    }

    SelectGnome = (selectedGnome) => {
        this.setState({
            selectedGnome: selectedGnome
        });
    }

    selectJob(job){
        let professions = this.state.userPreferences.professions;
        if(professions.indexOf(job) === -1){
            professions.push(job);
        } else {
            professions.splice(professions.indexOf(job), 1);
        }
        this.setState({
            professions: professions,
        });
    }

    selectHairColor(hairColor){
        let hairColors = this.state.userPreferences.hairColor;
        if(hairColors.indexOf(hairColor) === -1){
            hairColors.push(hairColor);
        } else {
            hairColors.splice(hairColors.indexOf(hairColor), 1);
        }
        this.setState({
            hairColor: hairColors,
        });
    }

    render() {
        let that = this;
        let gnomes = this.filterGnomes();
        return (
            <div>
                <div id="filters">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Professions
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {/* //profession filter */}
                            {
                                this.state.gnomesStatistics.professions.map(function (job, index) {
                                    return (
                                        <div key={index} className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id={"defaultCheck"+index} onClick={that.selectJob.bind(that, job)}/>
                                            <label className="form-check-label" htmlFor={"defaultCheck"+index}>
                                                {job}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hair color
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {/* //hair filter */}
                            {
                                this.state.gnomesStatistics.hairColor.map(function (hairColor, index) {
                                    return (
                                        <div key={index} className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id={"defaultCheck"+index} onClick={that.selectHairColor.bind(that, hairColor)} />
                                            <label className="form-check-label" htmlFor={"defaultCheck"+index} style={{color:hairColor}}>
                                                {hairColor}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div id="content">
                    {gnomes.map(function (gnome_, index) {
                        return (
                            <Gnome key={index} key1={index} gnome={gnome_} SelectGnome={that.SelectGnome.bind(this)}/>
                        )
                    })}
                </div>
                <GnomeModal gnome={that.state.selectedGnome} />
            </div>
        )
    }
}