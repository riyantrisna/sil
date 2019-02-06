const moment = require('moment');
const Lang = require('./Lang');
import { AsyncStorage } from 'react-native';

module.exports = {

    isEmpty(value){
        return (!value || value == undefined || value == "" || value.length == 0);
    },
    inArray(strs, arrays){
        for(var i in arrays) {
            if(arrays[i] == strs) return true;
        }
        return false;
    },
    datetimeFormats(value){
        return !this.isEmpty(value) ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
    },
    langText(strs, userLang){
        if(userLang==='id'){
            return Lang['id'][strs];
        }else if(userLang==='en'){
            return Lang['en'][strs];
        }else{
            return Lang['en'][strs];
        }
    }
};