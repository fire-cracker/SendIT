module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "root":true,
    "rules": {
        "class-methods-use-this": 0,
        "no-console": 0,
        "no-alert":0,
        "no-plusplus":0,
        "consistent-return":0,
        "comma-dangle":0,
        "import/no-unresolved":0,
        "no-param-reassign":0,
        "no-shadow": ["error", { "allow": ["req", "res", "err"] }],
        "import/prefer-default-export":0
        // "func-names":0,
    },
    "env":{
        "mocha": true,
        "node": true,
        "es6": true,
        "browser": true

    }

    
}

