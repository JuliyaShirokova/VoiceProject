export const levelsSource = {
    "level-1": [
        { "word":"а", "syllable":"а" },
    ],
    "level-2": [
        { "word":"о", "syllable":"о" },
    ],
    "level-3": [
        { "word":"м", "syllable":"м" },
    ],
    "level-4": [
        { "word":"ма", "syllable":"ма" },
        { "word":"мама", "syllable":"ма-ма" },
        { "word":"папа", "syllable":"па-па" },
        { "word":"мо", "syllable":"мо" }
    ]
}

const levelKeys = Object.keys(levelsSource);
export const maxLevel = levelKeys.length;