export const levelsSource = {
    "level-1": {
        name: 'а, у, о',
        complexity: 1,
        values: [
            { "word":"a", "syllable":"a" },
            { "word":"у", "syllable":"у" },
            { "word":"о", "syllable":"о" },
            { "word":"ау", "syllable":"а-у" },
            { "word":"уа", "syllable":"у-а" },
            { "word":"ау", "syllable":"ау" },
            { "word":"уа", "syllable":"уа" },
        ],
    },
    "level-2": {
        name: 'е, и, м',
        complexity: 1,
        values: [
            { "word":"е", "syllable":"е" },
            { "word":"и", "syllable":"и" },
            { "word":"м", "syllable":"м" },
            { "word":"ма", "syllable":"ма" },
            { "word":"му", "syllable":"му" },
            { "word":"мо", "syllable":"мо" },
            { "word":"ми", "syllable":"ми" },
            { "word":"ум", "syllable":"ум" },
            { "word":"ам", "syllable":"ам" },
            { "word":"ом", "syllable":"ом" },
            { "word":"им", "syllable":"им" }
        ],
    },
    "level-3": {
        name: 'а, о, у, и, м',
        complexity: 1,
        values: [
            { "word":"мам", "syllable":"ма-м" },
            { "word":"мом", "syllable":"мо-м" },
            { "word":"мум", "syllable":"му-м" },
            { "word":"мим", "syllable":"ми-м" },
            { "word":"ама", "syllable":"а-ма" },
            { "word":"ома", "syllable":"о-ма" },
            { "word":"ума", "syllable":"у-ма" },
            { "word":"има", "syllable":"и-ма" },
        ],
    },
    "level-4": {
        name: 'а, о, м',
        complexity: 2,
        values: [
            { "word":"мама", "syllable":"ма-ма" },
            { "word":"мамо", "syllable":"ма-мо" },
            { "word":"маму", "syllable":"ма-му" }
        ],
    },
    "level-5": {
        name: 'а, о, у, и, н',
        complexity: 1,
        values: [
        { "word":"а", "syllable":"а" },
        { "word":"у", "syllable":"у" },
        { "word":"о", "syllable":"о" },
        { "word":"е", "syllable":"е" },
        { "word":"и", "syllable":"и" },
        { "word":"н", "syllable":"н" },
        { "word":"на", "syllable":"на" },
        { "word":"но", "syllable":"но" },
        { "word":"ну", "syllable":"ну" },
        { "word":"но", "syllable":"но" },
        { "word":"не", "syllable":"не" },
        { "word":"ни", "syllable":"ни" },
        ],
    },
    "level-6": {
        name: 'а, о, у, и, л',
        complexity: 1,
        values: [
        { "word":"у", "syllable":"у" },
        { "word":"о", "syllable":"о" },
        { "word":"е", "syllable":"е" },
        { "word":"и", "syllable":"и" },    
        { "word":"л", "syllable":"л" },
        { "word":"лу", "syllable":"лу" },
        { "word":"ло", "syllable":"ло" },
        { "word":"ле", "syllable":"ле" },
        { "word":"ли", "syllable":"ли" },
        { "word":"лом", "syllable":"ло-м" },
        { "word":"ном", "syllable":"но-м" },
        { "word":"нум", "syllable":"ну-м" },
        { "word":"луна", "syllable":"лу-на" },
        { "word":"наум", "syllable":"На-ум" },
        ]
    }
}

const levelKeys = Object.keys(levelsSource);
export const maxLevel = levelKeys.length;