const americanOnly = require("./american-only");
const britishOnly = require("./british-only");
const americanToBritishSpelling = require("./american-to-british-spelling");
const americanToBritishTitles = require("./american-to-british-titles");
const britishToAmericanTitles = require("./british-to-american-titles");

const reverseDict = (obj) =>
    Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({ [v]: k })));

const americanBritishDict = {
    ...americanOnly,
    ...americanToBritishSpelling,
};

const reverseAmericanToBritishSpelling = reverseDict(americanToBritishSpelling);

const britishAmericanDict = {
    ...britishOnly,
    ...reverseAmericanToBritishSpelling,
};

const translate = (str, locale) => {
    const originalStr = str;
    const lowerCasedOriginalStr = originalStr.toLowerCase();
    const translationType = locale;

    const dict =
        translationType === "american-to-british"
            ? americanBritishDict
            : britishAmericanDict;

    const titlesHonorificsDict =
        translationType === "american-to-british"
            ? americanToBritishTitles
            : britishToAmericanTitles;

    const timeRegex =
        translationType === "american-to-british"
            ? /([1-9]|1[012]):[0-5][0-9]/g
            : /([1-9]|1[012]).[0-5][0-9]/g;

    const matchesMap = {};

    Object.entries(titlesHonorificsDict).map(([k, v]) => {
        if (lowerCasedOriginalStr.includes(k)) {
            matchesMap[k] = v;
        }
    });

    const wordsWithSpace = Object.fromEntries(
        Object.entries(dict).filter(([k, v]) => k.includes(" "))
    );

    Object.entries(wordsWithSpace).map(([k, v]) => {
        if (lowerCasedOriginalStr.includes(k)) {
            matchesMap[k] = v;
        }
    });

    lowerCasedOriginalStr
        .match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g)
        .map((word) => {
            if (dict[word]) return (matchesMap[word] = dict[word]);
        });

    const matchedTimes = lowerCasedOriginalStr.match(timeRegex);

    if (matchedTimes) {
        matchedTimes.map((e) => {
            if (translationType === "american-to-british") {
                return (matchesMap[e] = e.replace(":", "."));
            }
            return (matchesMap[e] = e.replace(".", ":"));
        });
    }

    if (Object.keys(matchesMap).length === 0) return null;

    const translation = replaceAll(originalStr, matchesMap);

    const translationWithHighlight = replaceAllWithHighlight(
        originalStr,
        matchesMap
    );

    return { translation, translationWithHighlight };
};

const replaceAll = (str, mapObj) => {
    const re = new RegExp(Object.keys(mapObj).join("|"), "gi");

    return str.replace(re, (matched) => mapObj[matched.toLowerCase()]);
};

const replaceAllWithHighlight = (str, mapObj) => {
    const re = new RegExp(Object.keys(mapObj).join("|"), "gi");

    return str.replace(re, (matched) => {
        return `<span class="highlight">${mapObj[matched.toLowerCase()]}</span>`;
    });
};

module.exports = translate;