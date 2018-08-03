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
}