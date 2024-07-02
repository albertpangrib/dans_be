const _ = require('lodash');

const camelCaseConverter = (key) => {
    let tempKey = key.replace(/_/g, ' ');
    let camelCase = '';
    tempKey = tempKey.split(' ');
    if (tempKey.length > 1) {
        camelCase = tempKey.map(function(word, i) {
            if (i > 0) return word[0].toUpperCase() + word.slice(1);
        });
        camelCase[0] = tempKey[0];
        camelCase = camelCase.join();
        camelCase = camelCase.replace(/,/g, '');
    } else camelCase = tempKey[0];

    return camelCase;
};

const keyArrayObjectSubtitution = (obj) => {
    if (!_.isEmpty(obj) && obj.length > 0 ) {
        const newObj = obj.map(dt => {
            return keyObjectSubtitution(dt);
        });

        return newObj;
    }
};

const keyObjectSubtitution = (obj) => {
    let newData = {};
    let newKey = '';
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        newKey = camelCaseConverter(keys[i]);
        if (typeof obj[keys[i]] === 'object' && obj[keys[i]] !== null) {
            if (obj[keys[i]].length >= 1) {
                newData[newKey] = keyArrayObjectSubtitution(obj[keys[i]]);
            } else if (obj[keys[i]].length === undefined) {
                if (obj[keys[i]] instanceof Date) newData[newKey] = obj[keys[i]];
                else newData[newKey] = keyObjectSubtitution(obj[keys[i]]);
            }
        } else {
            newData[newKey] = obj[keys[i]];
        }
    }

  return newData;
};

const camelCaseKeysToUnderscore = (obj) => {
    if (typeof(obj) != 'object') return obj;

    for(var oldName in obj){
        let newName = oldName.replace(/([A-Z])/g, function($1){return '_'+$1.toLowerCase();});
        
        if (newName != oldName) {
            if (Object.prototype.hasOwnProperty.call(obj, oldName)) {
                obj[newName] = obj[oldName];
                delete obj[oldName];
            }
        }
        
        if (typeof(obj[newName]) == 'object') {
            obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
        }

    }

    return obj;
};

module.exports = {
  keyObjectSubtitution,
  keyArrayObjectSubtitution,
  camelCaseKeysToUnderscore
};