import $ from 'jquery';

export class GnomeService {

    constructor(){
        this.gnomes = [];
    }

    get GetGnomes() {
        let that = this;
        return new Promise(function (resolve, reject) {
            $.getJSON('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json', function (data) {
                resolve(data.Brastlewark);
                that.gnomes = data.Brastlewark;
            });
        })        
    }

    groupGnomesByFeature(feature){
        let groupedGnomes = {};
        this.gnomes.forEach(function(gnome){
            if(gnome[feature].hasOwnProperty("length")){
                gnome[feature].forEach(function(property){
                    if(!groupedGnomes.hasOwnProperty(property)){
                        groupedGnomes[property] = [gnome];
                    } else {
                        groupedGnomes[property].push(gnome);
                    }
                })
            } else {
                if(!groupedGnomes.hasOwnProperty(gnome[feature])){
                    groupedGnomes[gnome[feature]] = [gnome];
                } else {
                    groupedGnomes[gnome[feature]].push(gnome);
                }
            }
        })
        // console.log(groupedGnomes);
        return groupedGnomes;
    }

    sortGnomesByName(){
        let sortedGnomes = this.gnomes.sort(function(gnome1, gnome2){
            if(gnome1.name < gnome2.name) return -1;
            else if(gnome1.name === gnome2.name) return 0;
            else return 1;
        })
        return sortedGnomes;
    }

    gnomesStartingByLetter(){
        let groupedGnomes = {};
        this.gnomes.forEach(function(gnome){
            if(!groupedGnomes.hasOwnProperty(gnome.name[0].toLocaleUpperCase())){
                groupedGnomes[gnome.name[0].toLocaleUpperCase()] = [gnome];
            } else {
                groupedGnomes[gnome.name[0].toLocaleUpperCase()].push(gnome);
            }
        })
        return groupedGnomes;
    }
}