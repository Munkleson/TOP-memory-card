export default {
    classic: {
        timer: 5000,
        Easy: {
            numberOfCards: 6,
        },
        Medium: {
            numberOfCards: 12,
        },
        Hard: {
            numberOfCards: 20,
        },
        Insane: {
            numberOfCards: 30,
        },
        Custom: {
            maxShown: 30,
            minCards: 6,
            maxCards: 30
        }
    },
    standard: {
        timer: 5000,
        Easy: {
            numberOfCards: 6,
            maxShown: 3,
        },
        Medium: {
            numberOfCards: 12,
            maxShown: 6,
        },
        Hard: {
            numberOfCards: 20,
            maxShown: 9,
        },
        Insane: {
            numberOfCards: 30,
            maxShown: 9,
        },
        Nightmare: {
            numberOfCards: 99,
            maxShown: 9,
        },
        Custom: {
            maxShown: 9,
            minCards: 6,
            maxCards: 99,
        }
    },
    "fifty-fifty": {
        timer: 3000,
        Easy: {
            numberOfCards: 10,
            maxShown: 2,
        },
        Medium: {
            numberOfCards: 18,
            maxShown: 2,
        },
        Hard: {
            numberOfCards: 28,
            maxShown: 2,
        },
        Insane: {
            numberOfCards: 45,
            maxShown: 2,
        },
        Nightmare: {
            numberOfCards: 99,
            maxShown: 2,
        },
        Custom: {
            maxShown: 2,
            minCards: 6,
            maxCards: 99,
        }
    },
    "fifty-fifty mix": {
        timer: 3000,
        Hard: {
            numberOfCards: 30,
            maxShown: 2,
        },
        Insane: {
            numberOfCards: 45,
            maxShown: 2,
        },
        Nightmare: {
            numberOfCards: 99,
            maxShown: 2,
        },
        Custom: {
            maxShown: 2,
            minCards: 30,
            maxCards: 99,
        }
    }
}

