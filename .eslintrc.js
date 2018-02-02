module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "arrowFunctions" : true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "rules": {
        "no-unused-vars": [
            "warn",
        ],
        "react/jsx-uses-react": [
            2
        ],
        "react/no-unknown-property" : [ 2 ],
        "react/jsx-uses-vars": [2],
        "indent": [
            "warn",
            "tab"
        ],
        "linebreak-style": [
            0,
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};