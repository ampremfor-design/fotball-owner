/*
=========================================================
FOOTBALL OWNER
Club Management Simulator
Vanilla JavaScript
=========================================================
*/

(() => {
    "use strict";

    /* =====================================================
       CONFIG
    ===================================================== */

    const SAVE_KEY = "football_owner_careers_v5";
    const CURRENT_VERSION = 5;

    const DIVISIONS = {
        1: {
            name: "Premier League",
            clubs: 20,
            maxPlayerOvr: 99,
            baseOvr: 82
        },

        2: {
            name: "Championship",
            clubs: 24,
            maxPlayerOvr: 90,
            baseOvr: 73
        },

        3: {
            name: "League One",
            clubs: 24,
            maxPlayerOvr: 83,
            baseOvr: 66
        },

        4: {
            name: "League Two",
            clubs: 24,
            maxPlayerOvr: 76,
            baseOvr: 60
        },

        5: {
            name: "National League",
            clubs: 24,
            maxPlayerOvr: 70,
            baseOvr: 55
        }
    };


    const OWNER_TYPES = {

        investor: {
            label: "Investor",
            cash: 14000000,
            finance: 8,
            business: 7,
            fan: 0
        },

        passionate: {
            label: "Passionate Owner",
            cash: 10000000,
            finance: 2,
            business: 2,
            fan: 10
        },

        business: {
            label: "Business Owner",
            cash: 12000000,
            finance: 5,
            business: 10,
            fan: 2
        },

        risk: {
            label: "Risk Taker",
            cash: 15500000,
            finance: -2,
            business: 5,
            fan: -3
        }
    };


    const TEAM_NAMES = {

        1: [
            "Arsenal",
            "Aston Villa",
            "Bournemouth",
            "Brentford",
            "Brighton",
            "Burnley",
            "Chelsea",
            "Crystal Palace",
            "Everton",
            "Fulham",
            "Leeds United",
            "Liverpool",
            "Manchester City",
            "Manchester United",
            "Newcastle United",
            "Nottingham Forest",
            "Sunderland",
            "Tottenham",
            "West Ham",
            "Wolverhampton"
        ],

        2: [
            "Blackburn Rovers",
            "Bristol City",
            "Cardiff City",
            "Coventry City",
            "Derby County",
            "Hull City",
            "Ipswich Town",
            "Leicester City",
            "Middlesbrough",
            "Millwall",
            "Norwich City",
            "Oxford United",
            "Plymouth Argyle",
            "Portsmouth",
            "Preston",
            "Queens Park Rangers",
            "Reading",
            "Sheffield United",
            "Sheffield Wednesday",
            "Southampton",
            "Stoke City",
            "Swansea City",
            "Watford",
            "West Brom"
        ],

        3: [
            "Barnsley",
            "Blackpool",
            "Bolton",
            "Burton Albion",
            "Charlton",
            "Exeter",
            "Fleetwood",
            "Huddersfield",
            "Leyton Orient",
            "Lincoln City",
            "Mansfield",
            "Northampton",
            "Peterborough",
            "Rotherham",
            "Stevenage",
            "Stockport",
            "Wigan",
            "Wycombe",
            "Doncaster",
            "Wrexham",
            "Reading B",
            "Bristol Rovers",
            "Cambridge United",
            "Luton"
        ],

        4: [
            "Accrington",
            "Barrow",
            "Bromley",
            "Carlisle",
            "Cheltenham",
            "Chesterfield",
            "Colchester",
            "Crewe",
            "Crawley",
            "Doncaster B",
            "Fleetwood B",
            "Gillingham",
            "Grimsby",
            "Harrogate",
            "Milton Keynes",
            "Morecambe",
            "Newport",
            "Notts County",
            "Salford",
            "Swindon",
            "Tranmere",
            "Walsall",
            "AFC Wimbledon",
            "Oldham"
        ],

        5: [
            "Aldershot",
            "Altrincham",
            "Barnet",
            "Boston United",
            "Boreham Wood",
            "Braintree",
            "Dagenham FC",
            "Eastleigh",
            "Ebbsfleet",
            "FC Halifax",
            "Forest Green",
            "Gateshead",
            "Hartlepool",
            "Maidenhead",
            "Oldham Athletic",
            "Rochdale",
            "Solihull Moors",
            "Southend",
            "Sutton United",
            "Tamworth",
            "Torquay",
            "Wealdstone",
            "Woking",
            "York City"
        ]
    };


    const FIRST_NAMES = [
        "Arthur",
        "James",
        "Oliver",
        "Harry",
        "Noah",
        "George",
        "Jack",
        "Leo",
        "Charlie",
        "Oscar",
        "Theo",
        "Alfie",
        "Henry",
        "Archie",
        "Freddie",
        "Liam",
        "Jacob",
        "Lucas",
        "Ethan",
        "Finley",
        "Daniel",
        "Max",
        "Thomas",
        "William",
        "Teddy",
        "Benjamin",
        "Adam",
        "Mason",
        "Isaac",
        "Riley",
        "Samuel",
        "Alexander",
        "Edward",
        "Hugo",
        "Nathan",
        "Dylan",
        "Cameron",
        "Louis"
    ];


    const LAST_NAMES = [
        "Smith",
        "Taylor",
        "Walker",
        "Carter",
        "Wilson",
        "Davies",
        "Roberts",
        "Johnson",
        "Evans",
        "Thomas",
        "Harris",
        "Williams",
        "Jones",
        "Brown",
        "Clark",
        "Lewis",
        "Young",
        "Hall",
        "Allen",
        "King",
        "Wright",
        "Green",
        "Baker",
        "Turner",
        "Hill",
        "Moore",
        "Cooper",
        "Ward",
        "Morris",
        "Cook",
        "Bell",
        "Murphy",
        "Bailey",
        "Foster",
        "Mills",
        "Price",
        "Stone",
        "Wood",
        "Collins",
        "Gray"
    ];


    const MANAGER_NAMES = [
        "Thomas Wilson",
        "Michael Carter",
        "Daniel Brooks",
        "Oliver Bennett",
        "James Foster",
        "Samuel Wright",
        "Daniel Morgan",
        "Alexander Cole",
        "David Palmer",
        "Marcus Scott",
        "Nathan King",
        "Ryan Taylor"
    ];


    const SCOUT_NAMES = [
        "Ethan Brooks",
        "Martin Doyle",
        "Alex Reed",
        "Ryan Mercer",
        "Lewis Grant",
        "Peter Shaw",
        "Aaron Cole"
    ];


    const SPONSORS = [
        {
            name: "Nova Tech",
            annualBase: 800000,
            years: [2, 3],
            fan: 5,
            media: 3,
            reputation: 20,
            controversial: false
        },

        {
            name: "Britannia Air",
            annualBase: 1600000,
            years: [2, 3],
            fan: 3,
            media: 4,
            reputation: 30,
            controversial: false
        },

        {
            name: "Northstar Energy",
            annualBase: 2600000,
            years: [2, 4],
            fan: -1,
            media: 2,
            reputation: 45,
            controversial: false
        },

        {
            name: "MetroBank",
            annualBase: 4200000,
            years: [2, 4],
            fan: 2,
            media: 5,
            reputation: 55,
            controversial: false
        },

        {
            name: "Vertex Motors",
            annualBase: 6500000,
            years: [3, 5],
            fan: 1,
            media: 3,
            reputation: 65,
            controversial: false
        },

        {
            name: "GlobalBet",
            annualBase: 8200000,
            years: [2, 4],
            fan: -8,
            media: -10,
            reputation: 50,
            controversial: true
        }
    ];


    /* =====================================================
       STATE
    ===================================================== */

    const state = {

        career: null,

        activeTab: "dashboard",

        matchTimer: null,

        matchOpen: false,

        currentMatch: null
    };


    /* =====================================================
       DOM HELPERS
    ===================================================== */

    const $ = (id) => document.getElementById(id);

    const $$ = (selector) =>
        Array.from(document.querySelectorAll(selector));


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    function clamp(value, min, max) {
        return Math.max(
            min,
            Math.min(max, value)
        );
    }


    function randomInt(min, max) {
        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;
    }


    function randomFloat(min, max) {
        return Math.random() *
            (max - min) +
            min;
    }


    function pick(array) {
        return array[
            Math.floor(
                Math.random() * array.length
            )
        ];
    }


    function uid(prefix = "id") {

        return (
            prefix +
            "_" +
            Date.now().toString(36) +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 9)
        );
    }


    function money(value) {

        const absolute =
            Math.abs(value);

        const sign =
            value < 0 ? "-" : "";

        if (
            absolute >= 1000000000
        ) {
            return `${sign}£${(
                absolute / 1000000000
            ).toFixed(2)}B`;
        }

        if (
            absolute >= 1000000
        ) {
            return `${sign}£${(
                absolute / 1000000
            ).toFixed(1)}M`;
        }

        if (
            absolute >= 1000
        ) {
            return `${sign}£${Math.round(
                absolute / 1000
            )}K`;
        }

        return `${sign}£${Math.round(
            absolute
        )}`;
    }


    function fullMoney(value) {

        return (
            "£" +
            Math.round(value)
                .toLocaleString("en-GB")
        );
    }


    function dateLabel(value) {

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "—";
        }

        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    function addDays(
        dateString,
        amount
    ) {

        const date =
            new Date(dateString);

        date.setDate(
            date.getDate() + amount
        );

        return date.toISOString();
    }


    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );
    }


    /* =====================================================
       TOAST
    ===================================================== */

    function toast(
        title,
        message,
        type = "default"
    ) {

        const root =
            $("toastRoot");

        if (!root) {
            return;
        }

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "toast";

        if (type === "positive") {
            element.style.setProperty(
                "--toast-color",
                "#4cf58a"
            );
        }

        if (type === "negative") {
            element.style.setProperty(
                "--toast-color",
                "#ff6175"
            );
        }

        element.innerHTML = `
            <b>${escapeHTML(title)}</b>
            <span>${escapeHTML(message)}</span>
        `;

        root.appendChild(element);

        setTimeout(() => {

            element.remove();

        }, 4000);
    }


    /* =====================================================
       PLAYER ECONOMY
    ===================================================== */

    function calculateMarketValue(
        overall,
        age,
        potential,
        division
    ) {

        /*
        High OVR = exponentially expensive.

        Examples roughly:

        OVR 60  -> millions
        OVR 70  -> 10M+
        OVR 80  -> 20M+
        OVR 90  -> 60M+
        OVR 95  -> 90M+
        */

        const ageFactor =
            age <= 21
                ? 1.20
                : age <= 24
                    ? 1.12
                    : age <= 28
                        ? 1
                        : age <= 31
                            ? 0.78
                            : 0.55;

        const divisionFactor =
            1 +
            ((6 - division) * 0.08);

        const potentialFactor =
            1 +
            (
                Math.max(
                    0,
                    potential - overall
                ) * 0.045
            );

        const base =
            Math.pow(
                Math.max(
                    overall,
                    40
                ) / 42,
                4.15
            ) * 190000;

        const value =
            base *
            ageFactor *
            divisionFactor *
            potentialFactor;

        return (
            Math.max(
                50000,
                Math.round(
                    value / 50000
                ) * 50000
            )
        );
    }


    function calculateWage(
        overall,
        age,
        division
    ) {

        const divisionFactor = {

            1: 1.85,
            2: 1.35,
            3: 1.02,
            4: 0.78,
            5: 0.58

        }[division] || 0.58;


        const ageFactor =
            age < 23
                ? 0.82
                : age < 29
                    ? 1
                    : 1.08;


        const base =
            Math.pow(
                Math.max(
                    overall,
                    40
                ) / 40,
                3.55
            ) * 1600;


        return Math.max(
            450,
            Math.round(
                (
                    base *
                    divisionFactor *
                    ageFactor
                ) / 50
            ) * 50
        );
    }


    /* =====================================================
       PLAYER GENERATOR
    ===================================================== */

    function randomPlayerName() {

        return (
            pick(FIRST_NAMES) +
            " " +
            pick(LAST_NAMES)
        );
    }


    function makePlayer(
        options = {}
    ) {

        const division =
            options.division ??
            5;

        const overall =
            options.ovr ??
            randomInt(
                45,
                DIVISIONS[
                    division
                ].maxPlayerOvr
            );

        const potential =
            options.potential ??
            clamp(
                overall +
                randomInt(
                    2,
                    15
                ),
                overall,
                96
            );

        const age =
            options.age ??
            randomInt(
                18,
                31
            );

        return {

            id:
                uid("player"),

            name:
                options.name ||
                randomPlayerName(),

            position:
                options.position ||
                pick([
                    "GK",
                    "CB",
                    "FB",
                    "CM",
                    "AM",
                    "WG",
                    "ST"
                ]),

            age,

            ovr:
                overall,

            potential,

            scouted:
                options.scouted ??
                false,

            hiddenOvr:
                options.hiddenOvr ??
                false,

            hiddenPotential:
                options.hiddenPotential ??
                false,

            value:
                calculateMarketValue(
                    overall,
                    age,
                    potential,
                    division
                ),

            wage:
                calculateWage(
                    overall,
                    age,
                    division
                ),

            contractYears:
                options.contractYears ??
                randomInt(1, 4),

            morale:
                options.morale ??
                randomInt(65, 90),

            form:
                options.form ??
                randomInt(-2, 5),

            injuredWeeks:
                options.injuredWeeks ??
                0,

            appearances:
                0,

            goals:
                0,

            assists:
                0,

            academyProduct:
                options.academyProduct ??
                false
        };
    }


    /* =====================================================
       MANAGER GENERATOR
    ===================================================== */

    function makeManager(
        options = {}
    ) {

        const overall =
            options.overall ??
            randomInt(
                48,
                82
            );

        return {

            id:
                uid("manager"),

            name:
                options.name ||
                pick(MANAGER_NAMES),

            age:
                options.age ??
                randomInt(
                    39,
                    61
                ),

            overall,

            tactics:
                options.tactics ??
                clamp(
                    overall +
                    randomInt(-6, 7),
                    40,
                    96
                ),

            youth:
                options.youth ??
                randomInt(
                    45,
                    88
                ),

            motivation:
                options.motivation ??
                randomInt(
                    45,
                    90
                ),

            experience:
                options.experience ??
                randomInt(
                    45,
                    90
                ),

            salary:
                options.salary ??
                Math.round(
                    (
                        Math.pow(
                            overall / 45,
                            3
                        ) *
                        180000
                    ) / 5000
                ) * 5000,

            contractYears:
                options.contractYears ??
                randomInt(1, 3)
        };
    }


    /* =====================================================
       SCOUT
    ===================================================== */

    function makeScout(
        options = {}
    ) {

        const level =
            options.level ??
            1;

        return {

            id:
                uid("scout"),

            name:
                options.name ||
                pick(SCOUT_NAMES),

            level,

            accuracy:
                options.accuracy ??
                clamp(
                    58 + level * 9,
                    58,
                    96
                ),

            weeklyCost:
                options.weeklyCost ??
                level * 15000
        };
    }


    /* =====================================================
       ACADEMY
    ===================================================== */

    function makeYouthProspect() {

        const base =
            randomInt(
                40,
                58
            );

        return {

            id:
                uid("youth"),

            name:
                randomPlayerName(),

            age:
                randomInt(
                    15,
                    18
                ),

            position:
                pick([
                    "GK",
                    "CB",
                    "FB",
                    "CM",
                    "AM",
                    "WG",
                    "ST"
                ]),

            hiddenOvr:
                base,

            hiddenPotential:
                randomInt(
                    base + 8,
                    Math.min(
                        94,
                        base + 28
                    )
                ),

            discovered:
                false,

            promoted:
                false,

            development:
                randomInt(0, 2)
        };
    }


    /* =====================================================
       LEAGUES
    ===================================================== */

    function buildLeagues(
        clubName,
        division
    ) {

        const leagues = {};

        for (
            let d = 1;
            d <= 5;
            d++
        ) {

            leagues[d] =
                TEAM_NAMES[d].map(
                    name => ({

                        id:
                            uid("team"),

                        name,

                        baseOvr:
                            DIVISIONS[d].baseOvr +
                            randomInt(-5, 5),

                        points: 0,

                        played: 0,

                        won: 0,

                        drawn: 0,

                        lost: 0,

                        gf: 0,

                        ga: 0,

                        gd: 0,

                        form: []
                    })
                );
        }


        const userLeague =
            leagues[division];

        const team =
            userLeague[
                randomInt(
                    0,
                    userLeague.length - 1
                )
            ];

        team.name =
            clubName;

        team.baseOvr =
            DIVISIONS[division].baseOvr +
            randomInt(-2, 3);

        return leagues;
    }


    /* =====================================================
       SCHEDULE GENERATOR
    ===================================================== */

    function generateFixtures(
        teamIds
    ) {

        let teams =
            [...teamIds];

        if (
            teams.length %
            2 !== 0
        ) {
            teams.push(null);
        }

        const rounds =
            teams.length - 1;

        const weeks = [];

        for (
            let round = 0;
            round < rounds;
            round++
        ) {

            const matches = [];

            for (
                let i = 0;
                i < teams.length / 2;
                i++
            ) {

                const home =
                    teams[i];

                const away =
                    teams[
                        teams.length -
                        1 -
                        i
                    ];

                if (
                    home &&
                    away
                ) {

                    matches.push({
                        home:
                            round % 2 === 0
                                ? home
                                : away,

                        away:
                            round % 2 === 0
                                ? away
                                : home
                    });
                }
            }

            weeks.push(
                matches
            );

            teams = [
                teams[0],

                teams[
                    teams.length - 1
                ],

                ...teams.slice(
                    1,
                    teams.length - 1
                )
            ];
        }


        const secondHalf =
            weeks.map(
                week =>
                    week.map(
                        match => ({
                            home:
                                match.away,

                            away:
                                match.home
                        })
                    )
            );


        return [
            ...weeks,
            ...secondHalf
        ];
    }


    function buildSeasonSchedule(
        career
    ) {

        const league =
            career.leagues[
                career.division
            ];

        const fixtureWeeks =
            generateFixtures(
                league.map(
                    team => team.id
                )
            );


        career.leagueSchedule =
            fixtureWeeks.map(
                (matches, index) => ({

                    week:
                        index + 1,

                    matches:
                        matches.map(
                            match => ({

                                home:
                                    match.home,

                                away:
                                    match.away,

                                played:
                                    false,

                                homeGoals:
                                    null,

                                awayGoals:
                                    null
                            })
                        )
                })
            );
    }


    /* =====================================================
       CAREER CREATION
    ===================================================== */

    function createCareer(
        data
    ) {

        const division =
            clamp(
                Number(data.division) || 5,
                1,
                5
            );

        const ownerType =
            OWNER_TYPES[
                data.ownerType
            ]
                ? data.ownerType
                : "investor";


        const clubName =
            data.clubName.trim() ||
            "Phoenix FC";


        const clubShort =
            (
                data.shortName.trim() ||
                clubName.substring(
                    0,
                    3
                )
            ).toUpperCase();


        const career = {

            version:
                CURRENT_VERSION,

            id:
                uid("career"),

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString(),

            season:
                2026,

            date:
                "2026-08-01T12:00:00",

            currentWeek:
                1,

            division,

            clubTeamId:
                null,


            club: {

                name:
                    clubName,

                short:
                    clubShort,

                city:
                    data.city.trim() ||
                    "London",

                primary:
                    data.primary ||
                    "#5965f2",

                secondary:
                    data.secondary ||
                    "#0b1320"
            },


            owner: {

                name:
                    data.ownerName.trim() ||
                    "Danish",

                type:
                    ownerType,

                reputation:
                    clamp(
                        28 +
                        OWNER_TYPES[
                            ownerType
                        ].fan +
                        randomInt(-3, 4),

                        1,
                        100
                    )
            },


            cash:
                OWNER_TYPES[
                    ownerType
                ].cash,


            debt:
                0,


            reputation:
                clamp(
                    35 +
                    OWNER_TYPES[
                        ownerType
                    ].business +
                    randomInt(0, 6),

                    1,
                    100
                ),


            fanSupport:
                clamp(
                    58 +
                    OWNER_TYPES[
                        ownerType
                    ].fan +
                    randomInt(-3, 5),

                    1,
                    100
                ),


            boardConfidence:
                clamp(
                    65 +
                    OWNER_TYPES[
                        ownerType
                    ].finance +
                    randomInt(-3, 5),

                    1,
                    100
                ),


            mediaReputation:
                clamp(
                    45 +
                    OWNER_TYPES[
                        ownerType
                    ].business +
                    randomInt(-4, 5),

                    1,
                    100
                ),


            facilities: {

                stadiumLevel:
                    division <= 2
                        ? 4
                        : 2,

                trainingLevel:
                    2,

                academyLevel:
                    2,

                scoutingLevel:
                    1
            },


            squad: [],

            manager: null,

            managers: [],

            scouts: [],

            sponsor: null,

            sponsorOffers: [],

            scoutingBudget:
                750000,

            scoutReports: [],

            academy: [],

            transferMarket: [],

            transfers: [],

            leagueSchedule: [],

            leagues: {},


            cups: {

                fa: {

                    round:
                        division >= 4
                            ? "Qualifying"
                            : division === 3
                                ? "First Round"
                                : "Third Round",

                    eliminated:
                        false,

                    active:
                        true,

                    history: []
                },


                carabao: {

                    round:
                        division >= 3
                            ? "Round 1"
                            : division === 2
                                ? "Round 2"
                                : "Round 3",

                    eliminated:
                        false,

                    active:
                        true,

                    history: []
                }
            },


            weeklyRevenue:
                0,

            weeklyCosts:
                0,


            stats: {

                wins:
                    0,

                draws:
                    0,

                losses:
                    0,

                goalsFor:
                    0,

                goalsAgainst:
                    0
            }
        };


        /*
        Create leagues
        */

        career.leagues =
            buildLeagues(
                career.club.name,
                division
            );


        /*
        Find club entry
        */

        const team =
            career.leagues[
                division
            ].find(
                t =>
                    t.name ===
                    career.club.name
            ) ||
            career.leagues[
                division
            ][0];


        team.name =
            career.club.name;


        career.clubTeamId =
            team.id;


        /*
        Squad
        */

        career.squad =
            createStartingSquad(
                career
            );


        /*
        Manager
        */

        career.manager =
            makeManager({
                overall:
                    clamp(
                        DIVISIONS[
                            division
                        ].baseOvr +
                        randomInt(-3, 9),

                        45,
                        88
                    )
            });


        career.managers.push(
            structuredClone(
                career.manager
            )
        );


        /*
        Scouts
        */

        career.scouts = [

            makeScout({
                level: 2
            })

        ];


        /*
        Academy
        */

        career.academy =
            Array.from(
                {
                    length: 6
                },
                () =>
                    makeYouthProspect()
            );


        /*
        League
        */

        buildSeasonSchedule(
            career
        );


        /*
        Market
        */

        generateTransferMarket(
            career,
            true
        );


        /*
        Sponsors
        */

        generateSponsorOffers(
            career
        );


        /*
        Initial news
        */

        addNews(
            career,
            "New era",
            `${career.club.name} begins a new chapter under owner ${career.owner.name}.`,
            "board"
        );


        addNews(
            career,
            "Season begins",
            `The club enters the ${DIVISIONS[division].name}.`,
            "club"
        );


        normalizePlayerEconomy(
            career
        );


        return career;
    }


    /* =====================================================
       STARTING SQUAD
    ===================================================== */

    function createStartingSquad(
        career
    ) {

        const cap =
            DIVISIONS[
                career.division
            ].maxPlayerOvr;


        const average =
            Math.max(
                42,
                cap - randomInt(7, 11)
            );


        const positions = [

            "GK",

            "CB",
            "CB",

            "FB",
            "FB",

            "CM",
            "CM",

            "AM",

            "WG",
            "WG",

            "ST",

            "GK",
            "CB",
            "FB",
            "CM",
            "AM",
            "WG",
            "ST"
        ];


        return positions.map(
            (
                position,
                index
            ) =>
                makePlayer({

                    position,

                    age:
                        randomInt(
                            18,
                            30
                        ),

                    ovr:
                        clamp(
                            average +
                            randomInt(
                                -5,
                                4
                            ),

                            38,
                            cap
                        ),

                    potential:
                        clamp(
                            average +
                            randomInt(
                                3,
                                13
                            ),

                            average,
                            90
                        ),

                    scouted:
                        true,

                    hiddenOvr:
                        false,

                    hiddenPotential:
                        false,

                    division:
                        career.division,

                    name:
                        index === 0
                            ? "Arthur Lewis"
                            : undefined
                })
        );
    }


    function normalizePlayerEconomy(
        career
    ) {

        career.squad.forEach(
            player => {

                player.value =
                    calculateMarketValue(
                        player.ovr,
                        player.age,
                        player.potential,
                        career.division
                    );

                player.wage =
                    calculateWage(
                        player.ovr,
                        player.age,
                        career.division
                    );
            }
        );
    }


    /* =====================================================
       CLUB OVERALL
    ===================================================== */

    function calculateClubOverall(
        career
    ) {

        const cap =
            DIVISIONS[
                career.division
            ].maxPlayerOvr;


        const eligible =
            career.squad
                .filter(
                    player =>
                        player.injuredWeeks <= 0 &&
                        player.ovr <= cap
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        (
                            b.ovr +
                            b.form
                        ) -
                        (
                            a.ovr +
                            a.form
                        )
                )
                .slice(
                    0,
                    11
                );


        if (
            !eligible.length
        ) {
            return 1;
        }


        let total =
            eligible.reduce(
                (
                    sum,
                    player
                ) =>
                    sum +
                    player.ovr +
                    player.form * 0.25 +
                    player.morale * 0.02,

                0
            );


        let result =
            total /
            eligible.length;


        if (
            career.manager
        ) {

            result += (
                career.manager.tactics -
                60
            ) * 0.06;
        }


        return clamp(
            Math.round(result),
            1,
            99
        );
    }


    /* =====================================================
       MATCH STRENGTH
    ===================================================== */

    function calculateAvailableStrength(
        career
    ) {

        const cap =
            DIVISIONS[
                career.division
            ].maxPlayerOvr;


        const players =
            career.squad
                .filter(
                    player =>
                        player.injuredWeeks <= 0 &&
                        player.ovr <= cap
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        (
                            b.ovr +
                            b.form
                        ) -
                        (
                            a.ovr +
                            a.form
                        )
                )
                .slice(
                    0,
                    11
                );


        if (
            !players.length
        ) {
            return 1;
        }


        return (
            players.reduce(
                (
                    total,
                    player
                ) =>
                    total +
                    player.ovr +
                    (
                        player.form *
                        0.25
                    ) +
                    (
                        player.morale *
                        0.02
                    ),

                0
            ) /
            players.length
        );
    }


    /* =====================================================
       NEWS / INBOX
    ===================================================== */

    function addNews(
        career,
        title,
        body,
        type = "club"
    ) {

        career.news ||= [];

        career.news.unshift({

            id:
                uid("news"),

            title,

            body,

            type,

            date:
                career.date
        });


        career.news =
            career.news.slice(
                0,
                60
            );
    }


    function addInbox(
        career,
        subject,
        body,
        tone = "neutral"
    ) {

        career.inbox ||= [];

        career.inbox.unshift({

            id:
                uid("mail"),

            subject,

            body,

            tone,

            date:
                career.date,

            read:
                false
        });


        career.inbox =
            career.inbox.slice(
                0,
                80
            );
    }


    /* =====================================================
       SAVE SYSTEM
    ===================================================== */

    function getSaves() {

        try {

            const raw =
                localStorage.getItem(
                    SAVE_KEY
                );

            if (!raw) {
                return [];
            }

            const data =
                JSON.parse(
                    raw
                );

            return Array.isArray(
                data
            )
                ? data
                : [];

        } catch {

            return [];
        }
    }


    function saveCareer(
        career = state.career,
        silent = false
    ) {

        if (!career) {
            return false;
        }


        career.updatedAt =
            new Date()
                .toISOString();


        const saves =
            getSaves();


        const copy =
            JSON.parse(
                JSON.stringify(
                    career
                )
            );


        const existingIndex =
            saves.findIndex(
                save =>
                    save.id ===
                    career.id
            );


        if (
            existingIndex >= 0
        ) {

            saves[
                existingIndex
            ] = copy;

        } else {

            saves.unshift(
                copy
            );
        }


        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(
                saves.slice(
                    0,
                    20
                )
            )
        );


        if (!silent) {

            toast(
                "Career saved",
                `${career.club.name} has been saved.`,
                "positive"
            );
        }


        return true;
    }


    function deleteSave(
        id
    ) {

        const saves =
            getSaves()
                .filter(
                    save =>
                        save.id !== id
                );


        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(
                saves
            )
        );


        renderSaveList();


        toast(
            "Career deleted",
            "The save file has been removed."
        );
    }


    /* =====================================================
       MODALS
    ===================================================== */

    function openModal(
        id
    ) {

        const element =
            $(id);

        if (
            element
        ) {

            element.classList.remove(
                "hidden"
            );
        }
    }


    function closeModal(
        id
    ) {

        const element =
            $(id);

        if (
            element
        ) {

            element.classList.add(
                "hidden"
            );
        }
    }


    function openGenericModal(
        html
    ) {

        const root =
            $("genericModalContent");


        if (!root) {
            return;
        }


        root.innerHTML =
            html;


        openModal(
            "genericModal"
        );


        root.querySelectorAll(
            "[data-close]"
        ).forEach(
            element => {

                element.addEventListener(
                    "click",
                    () =>
                        closeModal(
                            element.dataset.close
                        )
                );
            }
        );
    }


    /* =====================================================
       STARTER NOTE
    ===================================================== */

    function updateStarterNote() {

        const division =
            Number(
                $("startDivisionInput")
                    ?.value || 5
            );


        const ownerType =
            $("ownerTypeInput")
                ?.value ||
            "investor";


        const divisionData =
            DIVISIONS[
                division
            ];


        const owner =
            OWNER_TYPES[
                ownerType
            ];


        const note =
            $("starterNote");


        if (!note) {
            return;
        }


        note.innerHTML = `
            Starting in
            <b>
                Division ${division}
            </b>
            (
                ${escapeHTML(
                    divisionData.name
                )}
            ),
            your estimated starting cash is
            <b>
                ${money(owner.cash)}
            </b>.
            The maximum eligible player OVR in this division is
            <b>
                ${divisionData.maxPlayerOvr}
            </b>.
        `;
    }


    /* =====================================================
       LOAD / START
    ===================================================== */

    function showApp() {

        $("startScreen")
            ?.classList.add(
                "hidden"
            );


        $("app")
            ?.classList.remove(
                "hidden"
            );


        renderApp();
    }


    function renderSaveList() {

        const root =
            $("saveList");


        if (!root) {
            return;
        }


        const saves =
            getSaves();


        if (
            !saves.length
        ) {

            root.innerHTML = `
                <div class="notice">
                    No career saves found yet.
                </div>
            `;

            return;
        }


        root.innerHTML =
            saves.map(
                save => `
                    <div class="save-card">

                        <div class="save-meta">

                            <b>
                                ${escapeHTML(
                                    save.club?.name ||
                                    "Unnamed Club"
                                )}
                            </b>

                            <span>
                                ${escapeHTML(
                                    save.owner?.name ||
                                    "Unknown Owner"
                                )}
                                ·
                                Division ${save.division}
                                ·
                                ${dateLabel(
                                    save.updatedAt ||
                                    save.date
                                )}
                            </span>

                        </div>


                        <div class="save-actions">

                            <button
                                class="btn btn-secondary load-save"
                                data-save-id="${save.id}"
                            >
                                Load
                            </button>

                            <button
                                class="btn btn-secondary delete-save"
                                data-save-id="${save.id}"
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                `
            ).join("");


        root.querySelectorAll(
            ".load-save"
        ).forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const save =
                            getSaves()
                                .find(
                                    item =>
                                        item.id ===
                                        button.dataset.saveId
                                );


                        if (!save) {
                            return;
                        }


                        state.career =
                            migrateCareer(
                                save
                            );


                        closeModal(
                            "loadModal"
                        );


                        showApp();


                        toast(
                            "Career loaded",
                            `${state.career.club.name} is back in your hands.`,
                            "positive"
                        );
                    }
                );
            }
        );


        root.querySelectorAll(
            ".delete-save"
        ).forEach(
            button => {

                button.addEventListener(
                    "click",
                    () =>
                        deleteSave(
                            button.dataset.saveId
                        )
                );
            }
        );
    }


    function migrateCareer(
        career
    ) {

        career.version =
            CURRENT_VERSION;


        career.news ||=
            [];


        career.inbox ||=
            [];


        career.scouts ||=
            [
                makeScout({
                    level: 1
                })
            ];


        career.academy ||=
            Array.from(
                {
                    length: 6
                },
                () =>
                    makeYouthProspect()
            );


        career.scoutReports ||=
            [];


        career.sponsorOffers ||=
            [];


        career.transferMarket ||=
            [];


        career.transfers ||=
            [];


        career.facilities ||=
            {
                stadiumLevel: 2,
                trainingLevel: 2,
                academyLevel: 2,
                scoutingLevel: 1
            };


        career.cups ||=
            {
                fa: {},
                carabao: {}
            };


        if (
            !career.leagueSchedule ||
            !career.leagueSchedule.length
        ) {

            if (
                career.leagues &&
                career.division
            ) {

                buildSeasonSchedule(
                    career
                );
            }
        }


        if (
            !career.manager &&
            career.managers?.length
        ) {

            career.manager =
                career.managers[
                    career.managers.length - 1
                ];
        }


        normalizePlayerEconomy(
            career
        );


        return career;
    }


    /* =====================================================
       EVENT BINDING
    ===================================================== */

    function bindGlobalEvents() {

        $("newGameBtn")
            ?.addEventListener(
                "click",
                () => {

                    updateStarterNote();

                    openModal(
                        "newGameModal"
                    );
                }
            );


        $("openLoadBtn")
            ?.addEventListener(
                "click",
                () => {

                    renderSaveList();

                    openModal(
                        "loadModal"
                    );
                }
            );


        $("saveOpenBtn")
            ?.addEventListener(
                "click",
                () => {

                    renderSaveList();

                    openModal(
                        "loadModal"
                    );
                }
            );


        $("createGameBtn")
            ?.addEventListener(
                "click",
                handleCreateCareer
            );


        $("advanceBtn")
            ?.addEventListener(
                "click",
                () => {

                    if (
                        state.career
                    ) {

                        simulateCurrentWeek(
                            true
                        );
                    }
                }
            );


        $("ownerTypeInput")
            ?.addEventListener(
                "change",
                updateStarterNote
            );


        $("startDivisionInput")
            ?.addEventListener(
                "change",
                updateStarterNote
            );


        $$("[data-close]")
            .forEach(
                element => {

                    element.addEventListener(
                        "click",
                        () =>
                            closeModal(
                                element.dataset.close
                            )
                    );
                }
            );


        $$(".nav-item[data-tab]")
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () =>
                            switchTab(
                                button.dataset.tab
                            )
                    );
                }
            );


     document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeModal(
                        "newGameModal"
                    );

                    closeModal(
                        "loadModal"
                    );

                    closeModal(
                        "genericModal"
                    );

                    closeMatchday();
                }


                if (
                    (
                        event.ctrlKey ||
                        event.metaKey
                    ) &&
                    event.key.toLowerCase() ===
                    "s"
                ) {

                    event.preventDefault();

                    saveCareer();
                }
            }
        );
    }


    function handleCreateCareer() {

        const data = {

            ownerName:
                $("ownerNameInput")
                    ?.value ||
                "Danish",

            clubName:
                $("clubNameInput")
                    ?.value ||
                "Phoenix FC",

            city:
                $("clubCityInput")
                    ?.value ||
                "London",

            shortName:
                $("clubShortInput")
                    ?.value ||
                "PFC",

            ownerType:
                $("ownerTypeInput")
                    ?.value ||
                "investor",

            division:
                $("startDivisionInput")
                    ?.value ||
                5,

            primary:
                $("primaryColorInput")
                    ?.value ||
                "#5965f2",

            secondary:
                $("secondaryColorInput")
                    ?.value ||
                "#0b1320"
        };


        if (
            data.ownerName.trim().length <
            2
        ) {

            toast(
                "Invalid owner",
                "Please enter an owner name.",
                "negative"
            );

            return;
        }


        if (
            data.clubName.trim().length <
            2
        ) {

            toast(
                "Invalid club",
                "Please enter a club name.",
                "negative"
            );

            return;
        }


        state.career =
            createCareer(
                data
            );


        closeModal(
            "newGameModal"
        );


        showApp();


        saveCareer(
            state.career,
            true
        );


        toast(
            "Career created",
            `${state.career.club.name} enters the ${DIVISIONS[state.career.division].name}.`,
            "positive"
        );
    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    function switchTab(
        tab
    ) {

        state.activeTab =
            tab;


        $$(".nav-item[data-tab]")
            .forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.tab ===
                        tab
                    );
                }
            );


        renderApp();
    }


    /* =====================================================
       RENDER APP
    ===================================================== */

    function renderApp() {

        const career =
            state.career;


        if (!career) {
            return;
        }


        normalizePlayerEconomy(
            career
        );


        $("sideClubName").textContent =
            career.club.name;


        $("sidebarLogo").textContent =
            career.club.short;


        $("cashTop").textContent =
            money(
                career.cash
            );


        $("seasonLabel").textContent =
            `${career.season}/${String(
                career.season + 1
            ).slice(-2)}`;


        $("dateLabel").textContent =
            dateLabel(
                career.date
            );


        const labels = {

            dashboard: [
                "OWNER CENTRE",
                "Dashboard"
            ],

            squad: [
                "TEAM MANAGEMENT",
                "Squad"
            ],

            transfers: [
                "PLAYER MARKET",
                "Transfers"
            ],

            scouting: [
                "RECRUITMENT",
                "Scouting"
            ],

            academy: [
                "YOUTH DEVELOPMENT",
                "Academy"
            ],

            staff: [
                "CLUB STAFF",
                "Staff"
            ],

            sponsors: [
                "COMMERCIAL",
                "Sponsors"
            ],

            club: [
                "BUSINESS",
                "Club & Finance"
            ],

            competitions: [
                "FOOTBALL",
                "Competitions"
            ],

            inbox: [
                "COMMUNICATIONS",
                "Inbox"
            ]
        };


        const current =
            labels[
                state.activeTab
            ] ||
            labels.dashboard;


        $("pageEyebrow")
            .textContent =
            current[0];


        $("pageTitle")
            .textContent =
            current[1];


        const root =
            $("pageRoot");


        if (!root) {
            return;
        }


        root.classList.remove(
            "pop"
        );


        void root.offsetWidth;


        root.classList.add(
            "pop"
        );


        switch (
            state.activeTab
        ) {

            case "dashboard":

                root.innerHTML =
                    renderDashboard(
                        career
                    );

                break;


            case "squad":

                root.innerHTML =
                    renderSquad(
                        career
                    );

                break;


            case "transfers":

                root.innerHTML =
                    renderTransfers(
                        career
                    );

                break;


            case "scouting":

                root.innerHTML =
                    renderScouting(
                        career
                    );

                break;


            case "academy":

                root.innerHTML =
                    renderAcademy(
                        career
                    );

                break;


            case "staff":

                root.innerHTML =
                    renderStaff(
                        career
                    );

                break;


            case "sponsors":

                root.innerHTML =
                    renderSponsors(
                        career
                    );

                break;


            case "club":

                root.innerHTML =
                    renderClub(
                        career
                    );

                break;


            case "competitions":

                root.innerHTML =
                    renderCompetitions(
                        career
                    );

                break;


            case "inbox":

                root.innerHTML =
                    renderInbox(
                        career
                    );

                break;
        }


        bindPageEvents();
    }


    /* =====================================================
       DASHBOARD
    ===================================================== */

    function renderDashboard(
        career
    ) {

        const team =
            findUserTeam(
                career
            );


        const next =
            getNextFixture(
                career
            );


        const position =
            getLeagueTable(
                career
            ).findIndex(
                team =>
                    team.id ===
                    career.clubTeamId
            ) + 1;


        const overall =
            calculateClubOverall(
                career
            );


        const value =
            calculateClubValue(
                career
            );


        return `

            <div class="page-grid">

                <div>


                    <!-- CLUB HERO -->

                    <section class="hero-card">

                        <div class="hero-top">

                            <div class="club-identity">

                                <div
                                    class="club-badge"
                                    style="
                                        background:
                                            linear-gradient(
                                                135deg,
                                                ${career.club.primary},
                                                ${career.club.secondary}
                                            );
                                    "
                                >

                                    ${escapeHTML(
                                        career.club.short
                                    )}

                                </div>


                                <div>

                                    <h3>
                                        ${escapeHTML(
                                            career.club.name
                                        )}
                                    </h3>

                                    <p>
                                        ${escapeHTML(
                                            career.club.city
                                        )}
                                        · Owner
                                        ${escapeHTML(
                                            career.owner.name
                                        )}
                                    </p>

                                </div>

                            </div>


                            <div class="hero-stat">

                                <b>
                                    ${overall}
                                </b>

                                <span>
                                    Club Overall
                                </span>

                                <small
                                    style="
                                        display:block;
                                        margin-top:7px;
                                        color:#718398;
                                        font-size:8px;
                                    "
                                >
                                    Value
                                    ${money(
                                        value
                                    )}
                                </small>

                            </div>

                        </div>


                        <div
                            class="grid-4"
                            style="
                                margin-top:29px;
                                position:relative;
                                z-index:2;
                            "
                        >

                            ${kpi(
                                "Cash",
                                money(
                                    career.cash
                                )
                            )}

                            ${kpi(
                                "Position",
                                position
                                    ? `#${position}`
                                    : "—"
                            )}

                            ${kpi(
                                "Fan Support",
                                career.fanSupport
                            )}

                            ${kpi(
                                "Board",
                                career.boardConfidence
                            )}

                        </div>

                    </section>


                    <!-- NEXT MATCH -->

                    <section
                        class="card"
                        style="margin-top:18px"
                    >

                        <div class="section-head">

                            <h3>
                                Next Match
                            </h3>

                            <span>
                                ${
                                    next
                                        ? `Matchweek ${next.week}`
                                        : "No fixture"
                                }
                            </span>

                        </div>


                        ${
                            next
                                ? renderNextMatch(
                                      career,
                                      next
                                  )
                                : `
                                    <div class="notice">
                                        League schedule complete.
                                    </div>
                                `
                        }

                    </section>


                    <!-- PULSE -->

                    <section
                        class="card"
                        style="margin-top:18px"
                    >

                        <div class="section-head">

                            <h3>
                                Club Pulse
                            </h3>

                            <span>
                                Live indicators
                            </span>

                        </div>


                        ${meter(
                            "Owner Reputation",
                            career.owner.reputation
                        )}

                        ${meter(
                            "Media Reputation",
                            career.mediaReputation
                        )}

                        ${meter(
                            "Facilities",
                            calculateFacilities(
                                career
                            )
                        )}

                    </section>

                </div>


                <!-- RIGHT COLUMN -->

                <aside>


                    <section class="card">

                        <div class="section-head">

                            <h3>
                                Latest News
                            </h3>

                            <span>
                                ${
                                    career.news?.length ||
                                    0
                                }
                                stories
                            </span>

                        </div>


                        <div class="mini-list">

                            ${
                                career.news
                                    ?.slice(
                                        0,
                                        7
                                    )
                                    .map(
                                        newsRow
                                    )
                                    .join("") ||
                                `<div class="notice">
                                    No news yet.
                                </div>`
                            }

                        </div>

                    </section>


                    <section
                        class="card"
                        style="margin-top:18px"
                    >

                        <div class="section-head">

                            <h3>
                                Club Snapshot
                            </h3>

                            <span>
                                ${
                                    career.inbox
                                        ?.filter(
                                            x =>
                                                !x.read
                                        )
                                        .length ||
                                    0
                                }
                                unread
                            </span>

                        </div>


                        <div class="mini-list">

                            ${snapshot(
                                "Division",
                                `D${career.division} · ${DIVISIONS[career.division].name}`
                            )}

                            ${snapshot(
                                "Manager",
                                `${
                                    career.manager?.name ||
                                    "No manager"
                                } · OVR ${
                                    career.manager?.overall ||
                                    0
                                }`
                            )}

                            ${snapshot(
                                "Sponsor",
                                career.sponsor
                                    ? `${
                                        career.sponsor.name
                                      } · ${money(
                                          career.sponsor.annual
                                      )}/yr`
                                    : "No sponsor"
                            )}

                            ${snapshot(
                                "Academy",
                                `Level ${
                                    career.facilities.academyLevel
                                }`
                            )}

                            ${snapshot(
                                "Scout",
                                `Level ${
                                    career.scouts?.[0]
                                        ?.level ||
                                    0
                                }`
                            )}

                        </div>

                    </section>


                    <section
                        class="card"
                        style="margin-top:18px"
                    >

                        <div class="section-head">

                            <h3>
                                Sponsored Offer
                            </h3>

                            <span>
                                Optional
                            </span>

                        </div>


                        <div class="notice">

                            Watch a short sponsor
                            offer to receive a
                            weekly bonus of

                            <b>
                                £250K
                            </b>.

                        </div>


                        <button
                            class="
                                btn
                                btn-primary
                                full
                            "
                            style="margin-top:10px"
                            data-action="rewarded-ad"
                            ${
                                career.adClaimedWeek ===
                                career.currentWeek
                                    ? "disabled"
                                    : ""
                            }
                        >

                            ${
                                career.adClaimedWeek ===
                                career.currentWeek
                                    ? "Offer Claimed This Week"
                                    : "▶ Watch Sponsor Offer · +£250K"
                            }

                        </button>

                    </section>

                </aside>

            </div>

        `;
    }


    function renderNextMatch(
        career,
        fixture
    ) {

        const home =
            career.leagues[
                career.division
            ].find(
                team =>
                    team.id ===
                    fixture.home
            );


        const away =
            career.leagues[
                career.division
            ].find(
                team =>
                    team.id ===
                    fixture.away
            );


        if (
            !home ||
            !away
        ) {

            return `
                <div class="notice">
                    Fixture unavailable.
                </div>
            `;
        }


        return `

            <div class="match-card">

                <div class="team-side">

                    <b>
                        ${escapeHTML(
                            home.name
                        )}
                    </b>

                    <span>
                        ${
                            home.id ===
                            career.clubTeamId
                                ? "HOME"
                                : "AWAY"
                        }
                    </span>

                </div>


                <div class="score-box">

                    <b>
                        VS
                    </b>

                    <span>
                        RNG MATCH ENGINE
                    </span>

                </div>


                <div class="team-side">

                    <b>
                        ${escapeHTML(
                            away.name
                        )}
                    </b>

                    <span>
                        ${
                            away.id ===
                            career.clubTeamId
                                ? "HOME"
                                : "AWAY"
                        }
                    </span>

                </div>

            </div>


            <button
                class="simulate-match-button"
                data-action="simulate-match"
            >
                Simulate Matchweek
            </button>

        `;
    }


    /* =====================================================
       SQUAD
    ===================================================== */

    function renderSquad(
        career
    ) {

        const cap =
            DIVISIONS[
                career.division
            ].maxPlayerOvr;


        return `

            <div class="page-grid">

                <div>

                    <section class="card">

                        <div class="section-head">

                            <div>

                                <h3>
                                    First Team
                                </h3>

                                <span>
                                    ${
                                        career.squad.length
                                    }
                                    players
                                </span>

                            </div>


                            <span>
                                OVR cap:
                                ${cap}
                            </span>

                        </div>


                        <div class="table-wrap">

                            <table class="data-table">

                                <thead>

                                    <tr>
                                        <th>Player</th>
                                        <th>Pos</th>
                                        <th>Age</th>
                                        <th>OVR</th>
                                        <th>Value</th>
                                        <th>Wage</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>

                                </thead>


                                <tbody>

                                    ${
                                        career.squad
                                            .map(
                                                player =>
                                                    renderPlayerRow(
                                                        career,
                                                        player
                                                    )
                                            )
                                            .join("")
                                    }

                                </tbody>

                            </table>

                        </div>

                    </section>

                </div>


                <aside>

                    <section class="card">

                        <div class="section-head">

                            <h3>
                                Squad Overview
                            </h3>

                            <span>
                                Live
                            </span>

                        </div>


                        ${meter(
                            "Morale",
                            average(
                                career.squad.map(
                                    p =>
                                        p.morale
                                )
                            )
                        )}


                        ${meter(
                            "Form",
                            clamp(
                                50 +
                                average(
                                    career.squad.map(
                                        p =>
                                            p.form
                                    )
                                ) * 6,
                                0,
                                100
                            )
                        )}


                        ${meter(
                            "Fitness",
                            clamp(
                                100 -
                                average(
                                    career.squad.map(
                                        p =>
                                            p.injuredWeeks > 0
                                                ? 30
                                                : 0
                                    )
                                ),
                                0,
                                100
                            )
                        )}


                        <div
                            class="notice"
                            style="margin-top:14px"
                        >

                            Players above your
                            division OVR cap
                            remain under contract,
                            but are not eligible
                            for match strength.

                        </div>

                    </section>

                </aside>

            </div>

        `;
    }


    function renderPlayerRow(
        career,
        player
    ) {

        const cap =
            DIVISIONS[
                career.division
            ].maxPlayerOvr;


        const overCap =
            player.ovr >
            cap;


        let status;


        if (
            player.injuredWeeks > 0
        ) {

            status = `
                <span class="
                    status-chip
                    chip-red
                ">
                    Injured
                    ${player.injuredWeeks}w
                </span>
            `;

        } else if (
            overCap
        ) {

            status = `
                <span class="
                    status-chip
                    chip-yellow
                ">
                    Over Cap
                </span>
            `;

        } else {

            status = `
                <span class="
                    status-chip
                    chip-green
                ">
                    Eligible
                </span>
            `;
        }


        return `

            <tr>

                <td>

                    <b>
                        ${escapeHTML(
                            player.name
                        )}
                    </b>

                    ${
                        player.academyProduct
                            ? `
                                <span
                                    class="subtle"
                                >
                                    · Academy
                                </span>
                            `
                            : ""
                    }

                </td>

                <td>
                    ${player.position}
                </td>

                <td>
                    ${player.age}
                </td>

                <td>
                    ${player.ovr}
                </td>

                <td>
                    ${money(
                        player.value
                    )}
                </td>

                <td>
                    ${fullMoney(
                        player.wage
                    )}/wk
                </td>

                <td>
                    ${status}
                </td>

                <td>

                    <button
                        class="btn btn-secondary"
                        data-action="player-detail"
                        data-id="${player.id}"
                    >
                        View
                    </button>

                </td>

            </tr>

        `;
    }


    /* =====================================================
       TRANSFERS
    ===================================================== */

    function renderTransfers(
        career
    ) {

        generateTransferMarket(
            career
        );


        return `

            <section class="card">

                <div class="section-head">

                    <div>

                        <h3>
                            Transfer Market
                        </h3>

                        <span>
                            Exact OVR stays hidden
                            until scouted.
                        </span>

                    </div>


                    <span>
                        Budget
                        ${money(
                            career.cash
                        )}
                    </span>

                </div>


                <div class="table-wrap">

                    <table class="data-table">

                        <thead>

                            <tr>

                                <th>
                                    Player
                                </th>

                                <th>
                                    Age
                                </th>

                                <th>
                                    Pos
                                </th>

                                <th>
                                    Scout
                                </th>

                                <th>
                                    Market Value
                                </th>

                                <th>
                                    Wage
                                </th>

                                <th>
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${
                                career.transferMarket
                                    .map(
                                        player => `

                                            <tr>

                                                <td>
                                                    <b>
                                                        ${escapeHTML(
                                                            player.name
                                                        )}
                                                    </b>
                                                </td>

                                                <td>
                                                    ${player.age}
                                                </td>

                                                <td>
                                                    ${player.position}
                                                </td>

                                                <td>

                                                    ${
                                                        player.scouted
                                                            ? `
                                                                <span
                                                                    class="
                                                                        status-chip
                                                                        chip-green
                                                                    "
                                                                >
                                                                    OVR
                                                                    ${player.ovr}
                                                                </span>
                                                            `
                                                            : `
                                                                <span
                                                                    class="
                                                                        status-chip
                                                                        chip-blue
                                                                    "
                                                                >
                                                                    Hidden
                                                                </span>
                                                            `
                                                    }

                                                </td>


                                                <td>

                                                    ${
                                                        player.scouted
                                                            ? money(
                                                                player.value
                                                            )
                                                            : `${money(
                                                                player.value *
                                                                0.8
                                                            )}
                                                            —
                                                            ${money(
                                                                player.value *
                                                                1.2
                                                            )}`
                                                    }

                                                </td>


                                                <td>
                                                    ${fullMoney(
                                                        player.wage
                                                    )}/wk
                                                </td>


                                                <td>

                                                    <div
                                                        style="
                                                            display:flex;
                                                            gap:6px;
                                                        "
                                                    >

                                                        <button
                                                            class="btn btn-secondary"
                                                            data-action="scout-player"
                                                            data-id="${player.id}"
                                                        >
                                                            Scout
                                                        </button>


                                                        <button
                                                            class="btn btn-primary"
                                                            data-action="buy-player"
                                                            data-id="${player.id}"
                                                        >
                                                            Buy
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        `
                                    )
                                    .join("")
                            }

                        </tbody>

                    </table>

                </div>

            </section>


            <section
                class="card"
                style="margin-top:18px"
            >

                <div class="section-head">

                    <div>

                        <h3>
                            Sell Players
                        </h3>

                        <span>
                            Generate a market offer
                        </span>

                    </div>

                </div>


                <div class="mini-list">

                    ${
                        [...career.squad]
                            .sort(
                                (
                                    a,
                                    b
                                ) =>
                                    b.value -
                                    a.value
                            )
                            .slice(
                                0,
                                8
                            )
                            .map(
                                player => `

                                    <div class="list-row">

                                        <div class="row-main">

                                            <div class="avatar">
                                                ${player.position}
                                            </div>

                                            <div>

                                                <b>
                                                    ${escapeHTML(
                                                        player.name
                                                    )}
                                                </b>

                                                <span>
                                                    OVR
                                                    ${player.ovr}
                                                    ·
                                                    ${money(
                                                        player.value
                                                    )}
                                                </span>

                                            </div>

                                        </div>


                                        <button
                                            class="btn btn-secondary"
                                            data-action="sell-player"
                                            data-id="${player.id}"
                                        >
                                            List for Sale
                                        </button>

                                    </div>

                                `
                            )
                            .join("")
                    }

                </div>

            </section>

        `;
    }


    /* =====================================================
       SCOUTING
    ===================================================== */

    function renderScouting(
        career
    ) {

        return `

            <div class="page-grid">

                <div>


                    <section class="card">

                        <div class="section-head">

                            <div>

                                <h3>
                                    Scout Department
                                </h3>

                                <span>
                                    Reveal player information
                                </span>

                            </div>


                            <span>
                                Budget
                                ${money(
                                    career.scoutingBudget
                                )}
                            </span>

                        </div>


                        <div class="grid-3">

                            ${
                                career.scouts
                                    .map(
                                        scout => `

                                            <div
                                                class="card"
                                                style="padding:15px"
                                            >

                                                <span
                                                    class="subtle"
                                                >
                                                    SCOUT
                                                </span>

                                                <b
                                                    style="
                                                        display:block;
                                                        margin-top:7px;
                                                        font-size:12px;
                                                    "
                                                >
                                                    ${escapeHTML(
                                                        scout.name
                                                    )}
                                                </b>

                                                <span
                                                    style="
                                                        display:block;
                                                        margin-top:5px;
                                                        color:#8191a4;
                                                        font-size:9px;
                                                    "
                                                >
                                                    Level
                                                    ${scout.level}
                                                    ·
                                                    Accuracy
                                                    ${scout.accuracy}%
                                                </span>

                                            </div>

                                        `
                                    )
                                    .join("")
                            }

                        </div>

                    </section>


                    <section
                        class="card"
                        style="margin-top:18px"
                    >

                        <div class="section-head">

                            <h3>
                                Scout Reports
                            </h3>

                            <span>
                                ${
                                    career.scoutReports
                                        .length
                                }
                            </span>

                        </div>


                        <div class="mini-list">

                            ${
                                career.scoutReports
                                    .slice()
                                    .reverse()
                                    .map(
                                        report => `

                                            <div
                                                class="list-row"
                                            >

                                                <div
                                                    class="row-main"
                                                >

                                                    <div class="avatar">
                                                        ⌕
                                                    </div>

                                                    <div>

                                                        <b>
                                                            ${escapeHTML(
                                                                report.playerName
                                                            )}
                                                        </b>

                                                        <span>
                                                            OVR
                                                            ${report.ovr}
                                                            · POT
                                                            ${report.potential}
                                                            ·
                                                            ${escapeHTML(
                                                                report.verdict
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>


                                                <div
                                                    class="row-value"
                                                >

                                                    <b>
                                                        ${money(
                                                            report.value
                                                        )}
                                                    </b>

                                                    <span>
                                                        ${dateLabel(
                                                            report.date
                                                        )}
                                                    </span>

                                                </div>

                                            </div>

                                        `
                                    )
                                    .join("") ||
                                `
                                    <div class="notice">
                                        No scouting reports yet.
                                        Go to Transfers and scout
                                        a player.
                                    </div>
                                `
                            }

                        </div>

                    </section>

                </div>


                <aside>

                    <section class="card">

                        <div class="section-head">

                            <h3>
                                Scouting Rules
                            </h3>

                            <span>
                                Important
                            </span>

                        </div>


                        <div class="notice">

                            Player OVR and potential
                            are hidden before scouting.

                            Better scouts produce
                            more accurate reports.

                        </div>


                        ${meter(
                            "Scout Accuracy",
                            career.scouts[0]
                                ?.accuracy ||
                            0
                        )}

                    </section>

                </aside>

            </div>

        `;
    }


    /* =====================================================
       ACADEMY
    ===================================================== */

    function renderAcademy(
        career
    ) {

        return `

            <div class="page-grid">

                <div>

                    <section class="card">

                        <div class="section-head">

                            <div>

                                <h3>
                                    Academy
                                </h3>

                                <span>
                                    Youth development
                                </span>

                            </div>


                            <span>
                                Level
                                ${career.facilities.academyLevel}
                            </span>

                        </div>


                        <div class="grid-3">

                            ${
                                career.academy
                                    .map(
                                        prospect => {

                                            const revealed =
                                                prospect.discovered;


                                            const overall =
                                                revealed
                                                    ? clamp(
                                                        prospect.hiddenOvr +
                                                        prospect.development,
                                                        1,
                                                        99
                                                    )
                                                    : "??";


                                            const potential =
                                                revealed
                                                    ? prospect.hiddenPotential
                                                    : "??";


                                            return `

                                                <div
                                                    class="card"
                                                    style="padding:15px"
                                                >

                                                    <div
                                                        style="
                                                            display:flex;
                                                            justify-content:space-between;
                                                            gap:8px;
                                                        "
                                                    >

                                                        <b
                                                            style="font-size:12px"
                                                        >
                                                            ${escapeHTML(
                                                                prospect.name
                                                            )}
                                                        </b>


                                                        <span
                                                            class="
                                                                status-chip
                                                                ${
                                                                    revealed
                                                                        ? "chip-green"
                                                                        : "chip-blue"
                                                                }
                                                            "
                                                        >
                                                            ${
                                                                revealed
                                                                    ? "SCOUTED"
                                                                    : "HIDDEN"
                                                            }
                                                        </span>

                                                    </div>


                                                    <div
                                                        style="
                                                            margin-top:8px;
                                                            color:#738499;
                                                            font-size:9px;
                                                        "
                                                    >
                                                        ${
                                                            prospect.position
                                                        }
                                                        · Age
                                                        ${
                                                            prospect.age
                                                        }
                                                    </div>


                                                    <div
                                                        style="
                                                            display:grid;
                                                            grid-template-columns:1fr 1fr;
                                                            gap:8px;
                                                            margin-top:12px;
                                                        "
                                                    >

                                                        <div
                                                            class="notice"
                                                        >
                                                            <span
                                                                class="subtle"
                                                            >
                                                                OVR
                                                            </span>

                                                            <br>

                                                            <b
                                                                style="
                                                                    font-size:15px
                                                                "
                                                            >
                                                                ${overall}
                                                            </b>

                                                        </div>


                                                        <div
                                                            class="notice"
                                                        >
                                                            <span
                                                                class="subtle"
                                                            >
                                                                POT
                                                            </span>

                                                            <br>

                                                            <b
                                                                style="
                                                                    font-size:15px
                                                                "
                                                            >
                                                                ${potential}
                                                            </b>

                                                        </div>

                                                    </div>


                                                    <button
                                                        class="
                                                            btn
                                                            ${
                                                                revealed
                                                                    ? "btn-primary"
                                                                    : "btn-secondary"
                                                            }
                                                            full
                                                        "
                                                        style="margin-top:11px"
                                                        data-action="academy-scout"
                                                        data-id="${prospect.id}"
                                                    >

                                                        ${
                                                            revealed

                                                                ? prospect.age >= 16
                                                                    ? "Promote to First Team"
                                                                    : "Continue Development"

                                                                : "Scout Prospect"
                                                        }

                                                    </button>

                                                </div>

                                            `;
                                        }
                                    )
                                    .join("")
                            }

                        </div>

                    </section>

                </div>


                <aside>

                    <section class="card">

                        <div class="section-head">

                            <h3>
                                Academy Development
                            </h3>

                            <span>
                                Investment
                            </span>

                        </div>


                        ${meter(
                            "Academy Level",
                            career.facilities.academyLevel *
                            12.5
                        )}


                        ${meter(
                            "Youth Manager",
                            career.manager?.youth ||
                            0
                        )}


                        <button
                            class="
                                btn
                                btn-secondary
                                full
                            "
                            style="margin-top:13px"
                            data-action="upgrade-academy"
                        >
                            Upgrade Academy
                        </button>

                    </section>

                </aside>

            </div>

        `;
    }


    /* =====================================================
       STAFF
    ===================================================== */

    function renderStaff(
        career
    ) {

        const market =
            generateManagerMarket(
                career
            );


        return `

            <section class="card">

                <div class="section-head">

                    <div>

                        <h3>
                            Current Manager
                        </h3>

                        <span>
                            Contract
                            ${
                                career.manager
                                    ?.contractYears ||
                                0
                            }
                            years
                        </span>

                    </div>


                    <span>
                        OVR
                        ${
                            career.manager
                                ?.overall ||
                            0
                        }
                    </span>

                </div>


                ${
                    career.manager

                        ? `

                            <div
                                class="list-row"
                            >

                                <div
                                    class="row-main"
                                >

                                    <div
                                        class="avatar"
                                    >
                                        M
                                    </div>

                                    <div>

                                        <b>
                                            ${escapeHTML(
                                                career.manager.name
                                            )}
                                        </b>

                                        <span>
                                            Age
                                            ${
                                                career.manager.age
                                            }
                                            · Salary
                                            ${money(
                                                career.manager.salary
                                            )}/year
                                        </span>

                                    </div>

                                </div>


                                <div
                                    class="row-value"
                                >

                                    <b>
                                        Tactics
                                        ${
                                            career.manager.tactics
                                        }
                                    </b>

                                    <span>
                                        Youth
                                        ${
                                            career.manager.youth
                                        }
                                        · Motivation
                                        ${
                                            career.manager.motivation
                                        }
                                    </span>

                                </div>

                            </div>

                        `

                        : `

                            <div class="notice">
                                No manager employed.
                            </div>

                        `
                }


                <div
                    class="grid-4"
                    style="margin-top:13px"
                >

                    ${kpi(
                        "Tactics",
                        career.manager?.tactics ||
                        0
                    )}

                    ${kpi(
                        "Youth",
                        career.manager?.youth ||
                        0
                    )}

                    ${kpi(
                        "Motivation",
                        career.manager?.motivation ||
                        0
                    )}

                    ${kpi(
                        "Experience",
                        career.manager?.experience ||
                        0
                    )}

                </div>

            </section>


            <section
                class="card"
                style="margin-top:18px"
            >

                <div class="section-head">

                    <div>

                        <h3>
                            Manager Market
                        </h3>

                        <span>
                            Hire a new head coach
                        </span>

                    </div>

                </div>


                <div class="table-wrap">

                    <table class="data-table">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Age</th>
                                <th>OVR</th>
                                <th>Tactics</th>
                                <th>Youth</th>
                                <th>Salary</th>
                                <th></th>

                            </tr>

                        </thead>


                        <tbody>

                            ${
                                market
                                    .map(
                                        manager => `

                                            <tr>

                                                <td>
                                                    <b>
                                                        ${escapeHTML(
                                                            manager.name
                                                        )}
                                                    </b>
                                                </td>

                                                <td>
                                                    ${manager.age}
                                                </td>

                                                <td>
                                                    ${manager.overall}
                                                </td>

                                                <td>
                                                    ${manager.tactics}
                                                </td>

                                                <td>
                                                    ${manager.youth}
                                                </td>

                                                <td>
                                                    ${money(
                                                        manager.salary
                                                    )}/year
                                                </td>

                                                <td>

                                                    <button
                                                        class="btn btn-primary"
                                                        data-action="hire-manager"
                                                        data-id="${manager.id}"
                                                    >
                                                        Hire
                                                    </button>

                                                </td>

                                            </tr>

                                        `
                                    )
                                    .join("")
                            }

                        </tbody>

                    </table>

                </div>

            </section>

        `;
    }


    /* =====================================================
       SPONSORS
    ===================================================== */

    function renderSponsors(
        career
    ) {

        generateSponsorOffers(
            career
        );


        return `

            <section class="card">

                <div class="section-head">

                    <div>

                        <h3>
                            Sponsor Market
                        </h3>

                        <span>
                            Commercial contracts
                        </span>

                    </div>


                    <span>
                        ${
                            career.sponsor
                                ? career.sponsor.name
                                : "No sponsor"
                        }
                    </span>

                </div>


                <div class="grid-3">

                    ${
                        career.sponsorOffers
                            .map(
                                sponsor => `

                                    <div
                                        class="card"
                                        style="padding:15px"
                                    >

                                        <div
                                            style="
                                                display:flex;
                                                justify-content:space-between;
                                                gap:8px;
                                            "
                                        >

                                            <b
                                                style="font-size:13px"
                                            >
                                                ${escapeHTML(
                                                    sponsor.name
                                                )}
                                            </b>


                                            <span
                                                class="
                                                    status-chip
                                                    ${
                                                        sponsor.controversial
                                                            ? "chip-yellow"
                                                            : "chip-green"
                                                    }
                                                "
                                            >
                                                ${
                                                    sponsor.controversial
                                                        ? "CONTROVERSIAL"
                                                        : "CLEAN"
                                                }
                                            </span>

                                        </div>


                                        <div
                                            style="
                                                margin-top:9px;
                                                color:#75869a;
                                                font-size:9px;
                                            "
                                        >
                                            ${
                                                sponsor.years[0]
                                            }
                                            –
                                            ${
                                                sponsor.years[1]
                                            }
                                            years

                                            ·

                                            Reputation
                                            ${
                                                sponsor.reputation
                                            }

                                        </div>


                                        <div
                                            style="
                                                margin-top:13px;
                                                font-size:24px;
                                                font-weight:900;
                                            "
                                        >
                                            ${money(
                                                sponsor.annual
                                            )}
                                        </div>


                                        <div
                                            class="subtle"
                                        >
                                            annual sponsorship
                                        </div>


                                        <div
                                            class="notice"
                                            style="margin-top:11px"
                                        >

                                            Fan
                                            ${
                                                sponsor.fan >= 0
                                                    ? "+"
                                                    : ""
                                            }
                                            ${
                                                sponsor.fan
                                            }

                                            ·

                                            Media
                                            ${
                                                sponsor.media >= 0
                                                    ? "+"
                                                    : ""
                                            }
                                            ${
                                                sponsor.media
                                            }

                                        </div>


                                        <button
                                            class="
                                                btn
                                                btn-primary
                                                full
                                            "
                                            style="margin-top:10px"
                                            data-action="sign-sponsor"
                                            data-id="${sponsor.id}"
                                            ${
                                                career.reputation <
                                                sponsor.reputation
                                                    ? "disabled"
                                                    : ""
                                            }
                                        >

                                            ${
                                                career.reputation <
                                                sponsor.reputation

                                                    ? `Need Reputation ${sponsor.reputation}`

                                                    : "Sign Contract"
                                            }

                                        </button>

                                    </div>

                                `
                            )
                            .join("")
                    }

                </div>

            </section>


            <section
                class="card"
                style="margin-top:18px"
            >

                <div class="section-head">

                    <h3>
                        Current Sponsorship
                    </h3>

                    <span>
                        Commercial
                    </span>

                </div>


                ${
                    career.sponsor

                        ? `

                            <div class="mini-list">

                                ${snapshot(
                                    "Sponsor",
                                    career.sponsor.name
                                )}

                                ${snapshot(
                                    "Annual Value",
                                    money(
                                        career.sponsor.annual
                                    )
                                )}

                                ${snapshot(
                                    "Years",
                                    career.sponsor.years
                                )}

                                ${snapshot(
                                    "Fan Response",
                                    career.sponsor.fan >= 0
                                        ? `+${career.sponsor.fan}`
                                        : career.sponsor.fan
                                )}

                            </div>

                        `

                        : `
                            <div class="notice">
                                No sponsor contract yet.
                            </div>
                        `
                }

            </section>

        `;
    }


    /* =====================================================
       CLUB / FINANCE
    ===================================================== */

    function renderClub(
        career
    ) {

        const weeklyWages =
            career.squad.reduce(
                (
                    sum,
                    player
                ) =>
                    sum +
                    player.wage,

                0
            ) +

            (
                career.manager
                    ?.salary ||
                0
            ) / 52 +

            career.scouts.reduce(
                (
                    sum,
                    scout
                ) =>
                    sum +
                    scout.weeklyCost,

                0
            );


        return `

            <div class="grid-4">

                ${kpi(
                    "Club Value",
                    money(
                        calculateClubValue(
                            career
                        )
                    )
                )}

                ${kpi(
                    "Weekly Wages",
                    money(
                        weeklyWages
                    )
                )}

                ${kpi(
                    "Fans",
                    career.fanSupport
                )}

                ${kpi(
                    "Reputation",
                    career.reputation
                )}

            </div>


            <div
                class="page-grid"
                style="margin-top:18px"
            >

                <section class="card">

                    <div class="section-head">

                        <h3>
                            Facilities
                        </h3>

                        <span>
                            Investment
                        </span>

                    </div>


                    ${facilityRow(
                        career,
                        "Stadium",
                        "stadiumLevel",
                        8,
                        1300000
                    )}


                    ${facilityRow(
                        career,
                        "Training Centre",
                        "trainingLevel",
                        8,
                        900000
                    )}


                    ${facilityRow(
                        career,
                        "Academy",
                        "academyLevel",
                        8,
                        850000
                    )}


                    ${facilityRow(
                        career,
                        "Scouting Network",
                        "scoutingLevel",
                        8,
                        700000
                    )}

                </section>


                <section class="card">

                    <div class="section-head">

                        <h3>
                            Finance
                        </h3>

                        <span>
                            Current
                        </span>

                    </div>


                    ${snapshot(
                        "Available Cash",
                        money(
                            career.cash
                        )
                    )}


                    ${snapshot(
                        "Weekly Wage Bill",
                        money(
                            weeklyWages
                        )
                    )}


                    ${snapshot(
                        "Sponsor Income",
                        career.sponsor
                            ? money(
                                career.sponsor.annual /
                                52
                            )
                            : "£0"
                    )}


                    ${snapshot(
                        "Debt",
                        money(
                            career.debt
                        )
                    )}


                    ${snapshot(
                        "Club Value",
                        money(
                            calculateClubValue(
                                career
                            )
                        )
                    )}

                </section>

            </div>

        `;
    }


    function facilityRow(
        career,
        label,
        key,
        max,
        baseCost
    ) {

        const level =
            career.facilities[
                key
            ];


        const cost =
            level *
            baseCost;


        return `

            <div
                style="
                    padding:12px 0;
                    border-bottom:
                        1px solid
                        rgba(255,255,255,.04);
                "
            >

                <div class="statline">

                    <span>
                        ${label}
                        · Level
                        ${level}/${max}
                    </span>

                    <strong>
                        ${money(
                            cost
                        )}
                    </strong>

                </div>


                <div class="meter">

                    <i
                        style="
                            width:
                            ${
                                (
                                    level /
                                    max
                                ) *
                                100
                            }%;
                        "
                    ></i>

                </div>


                <button
                    class="btn btn-secondary"
                    style="margin-top:9px"
                    data-action="upgrade-facility"
                    data-key="${key}"
                    data-cost="${cost}"
                    ${
                        level >= max ||
                        career.cash < cost
                            ? "disabled"
                            : ""
                    }
                >
                    Upgrade
                </button>

            </div>

        `;
    }


    /* =====================================================
       COMPETITIONS
    ===================================================== */

    function renderCompetitions(
        career
    ) {

        const table =
            getLeagueTable(
                career
            );


        return `

            <div class="page-grid">

                <section class="card">

                    <div class="section-head">

                        <div>

                            <h3>
                                ${escapeHTML(
                                    DIVISIONS[
                                        career.division
                                    ].name
                                )}
                            </h3>

                            <span>
                                3 points win
                                ·
                                1 point draw
                                ·
                                0 loss
                            </span>

                        </div>


                        <span>
                            MW
                            ${career.currentWeek}
                            /
                            ${
                                career.leagueSchedule.length
                            }
                        </span>

                    </div>


                    <div class="table-wrap">

                        <table class="data-table">

                            <thead>

                                <tr>

                                    <th>#</th>

                                    <th>Club</th>

                                    <th>Pl</th>

                                    <th>W</th>

                                    <th>D</th>

                                    <th>L</th>

                                    <th>GD</th>

                                    <th>Pts</th>

                                </tr>

                            </thead>


                            <tbody>

                                ${
                                    table
                                        .map(
                                            (
                                                team,
                                                index
                                            ) => `

                                                <tr
                                                    class="${
                                                        team.id ===
                                                        career.clubTeamId
                                                            ? "me"
                                                            : ""
                                                    }"
                                                >

                                                    <td>

                                                        <span
                                                            class="
                                                                rank-badge
                                                            "
                                                        >
                                                            ${
                                                                index +
                                                                1
                                                            }
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <b>
                                                            ${escapeHTML(
                                                                team.name
                                                            )}
                                                        </b>

                                                    </td>


                                                    <td
                                                        class="num"
                                                    >
                                                        ${team.played}
                                                    </td>


                                                    <td
                                                        class="num"
                                                    >
                                                        ${team.won}
                                                    </td>


                                                    <td
                                                        class="num"
                                                    >
                                                        ${team.drawn}
                                                    </td>


                                                    <td
                                                        class="num"
                                                    >
                                                        ${team.lost}
                                                    </td>


                                                    <td
                                                        class="num"
                                                    >
                                                        ${team.gd}
                                                    </td>


                                                    <td
                                                        class="num"
                                                    >
                                                        <b>
                                                            ${team.points}
                                                        </b>
                                                    </td>

                                                </tr>

                                            `
                                        )
                                        .join("")
                                }

                            </tbody>

                        </table>

                    </div>

                </section>


                <aside>

                    <section class="card">

                        <div class="section-head">

                            <h3>
                                Cup Status
                            </h3>

                            <span>
                                ${career.season}
                            </span>

                        </div>


                        <div class="notice">

                            <b>
                                FA Cup
                            </b>

                            <br>

                            ${escapeHTML(
                                career.cups.fa.round ||
                                "—"
                            )}

                        </div>


                        <div
                            class="notice"
                            style="margin-top:8px"
                        >

                            <b>
                                Carabao Cup
                            </b>

                            <br>

                            ${escapeHTML(
                                career.cups.carabao.round ||
                                "—"
                            )}

                        </div>

                    </section>


                    <section
                        class="card"
                        style="margin-top:18px"
                    >

                        <div class="section-head">

                            <h3>
                                Recent Results
                            </h3>

                            <span>
                                League
                            </span>

                        </div>


                        <div class="mini-list">

                            ${
                                getRecentResults(
                                    career
                                )
                                    .map(
                                        result =>
                                            snapshot(
                                                result.label,
                                                result.result
                                            )
                                    )
                                    .join("")
                                ||
                                `
                                    <div class="notice">
                                        No results yet.
                                    </div>
                                `
                            }

                        </div>

                    </section>

                </aside>

            </div>

        `;
    }


    /* =====================================================
       INBOX
    ===================================================== */

    function renderInbox(
        career
    ) {

        const messages =
            career.inbox || [];


        return `

            <section class="card">

                <div class="section-head">

                    <div>

                        <h3>
                            Inbox
                        </h3>

                        <span>
                            ${
                                messages.filter(
                                    message =>
                                        !message.read
                                ).length
                            }
                            unread
                        </span>

                    </div>

                </div>


                <div class="mini-list">

                    ${
                        messages
                            .map(
                                message => `

                                    <div
                                        class="list-row"
                                        style="cursor:pointer"
                                        data-message-id="${message.id}"
                                    >

                                        <div
                                            class="row-main"
                                        >

                                            <div class="avatar">
                                                ✉
                                            </div>

                                            <div>

                                                <b>
                                                    ${escapeHTML(
                                                        message.subject
                                                    )}
                                                </b>

                                                <span>
                                                    ${escapeHTML(
                                                        message.body
                                                    )}
                                                </span>

                                            </div>

                                        </div>


                                        <div
                                            class="row-value"
                                        >

                                            <span>
                                                ${dateLabel(
                                                    message.date
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                `
                            )
                            .join("")
                        ||
                        `
                            <div class="notice">
                                Inbox empty.
                            </div>
                        `
                    }

                </div>

            </section>

        `;
    }


    /* =====================================================
       GENERIC UI HELPERS
    ===================================================== */

    function kpi(
        label,
        value
    ) {

        return `

            <div class="kpi">

                <span>
                    ${label}
                </span>

                <b>
                    ${value}
                </b>

            </div>

        `;
    }


    function meter(
        label,
        value
    ) {

        const amount =
            clamp(
                Number(value) || 0,
                0,
                100
            );


        return `

            <div class="statline">

                <span>
                    ${label}
                </span>

                <strong>
                    ${Math.round(
                        amount
                    )}
                </strong>

            </div>


            <div class="meter">

                <i
                    style="
                        width:${amount}%
                    "
                ></i>

            </div>

        `;
    }


    function snapshot(
        label,
        value
    ) {

        return `

            <div
                class="list-row"
            >

                <div
                    class="row-main"
                >

                    <div>

                        <b>
                            ${escapeHTML(
                                label
                            )}
                        </b>

                        <span>
                            ${escapeHTML(
                                value
                            )}
                        </span>

                    </div>

                </div>

            </div>

        `;
    }


    function newsRow(
        news
    ) {

        let icon = "•";


        if (
            news.type ===
            "match"
        ) {

            icon = "✓";

        } else if (
            news.type ===
            "training"
        ) {

            icon = "↗";

        } else if (
            news.type ===
            "board"
        ) {

            icon = "◆";
        }


        return `

            <div
                class="list-row"
            >

                <div
                    class="row-main"
                >

                    <div class="avatar">
                        ${icon}
                    </div>


                    <div>

                        <b>
                            ${escapeHTML(
                                news.title
                            )}
                        </b>

                        <span>
                            ${escapeHTML(
                                news.body
                            )}
                        </span>

                    </div>

                </div>


                <div
                    class="row-value"
                >

                    <span>
                        ${dateLabel(
                            news.date
                        )}
                    </span>

                </div>

            </div>

        `;
    }


    /* =====================================================
       PAGE EVENT BINDING
    ===================================================== */

    function bindPageEvents() {

        const root =
            $("pageRoot");


        if (!root) {
            return;
        }


        root.querySelectorAll(
            "[data-action]"
        ).forEach(
            element => {

                element.addEventListener(
                    "click",
                    () =>
                        handleAction(
                            element.dataset.action,
                            element
                        )
                );
            }
        );


        root.querySelectorAll(
            "[data-message-id]"
        ).forEach(
            element => {

                element.addEventListener(
                    "click",
                    () => {

                        const message =
                            state.career.inbox.find(
                                item =>
                                    item.id ===
                                    element.dataset.messageId
                            );


                        if (!message) {
                            return;
                        }


                        message.read =
                            true;


                        openGenericModal(`

                            <div class="eyebrow">
                                MESSAGE
                            </div>


                            <h2>
                                ${escapeHTML(
                                    message.subject
                                )}
                            </h2>


                            <p
                                style="
                                    margin-top:8px;
                                    color:#8a99ac;
                                    font-size:10px;
                                    line-height:1.7;
                                "
                            >
                                ${escapeHTML(
                                    message.body
                                )}
                            </p>


                            <button
                                class="
                                    btn
                                    btn-primary
                                "
                                data-close="genericModal"
                                style="
                                    margin-top:16px;
                                "
                            >
                                Close
                            </button>

                        `);


                        renderApp();
                    }
                );
            }
        );
    }


    /* =====================================================
       ACTION ROUTER
    ===================================================== */

    function handleAction(
        action,
        element
    ) {

        const career =
            state.career;


        if (!career) {
            return;
        }


        switch (action) {

            case "simulate-match":

                simulateCurrentWeek(
                    true
                );

                break;


            case "player-detail":

                openPlayerDetail(
                    element.dataset.id
                );

                break;


            case "scout-player":

                scoutPlayer(
                    element.dataset.id
                );

                break;


            case "buy-player":

                buyPlayer(
                    element.dataset.id
                );

                break;


            case "sell-player":

                sellPlayer(
                    element.dataset.id
                );

                break;


            case "renew-player":

                renewPlayer(
                    element.dataset.id
                );

                break;


            case "hire-manager":

                hireManager(
                    element.dataset.id
                );

                break;


            case "sign-sponsor":

                signSponsor(
                    element.dataset.id
                );

                break;


            case "upgrade-facility":

                upgradeFacility(
                    element.dataset.key,
                    Number(
                        element.dataset.cost
                    )
                );

                break;


            case "upgrade-academy":

                upgradeFacility(
                    "academyLevel",
                    career.facilities
                        .academyLevel *
                    850000
                );

                break;


            case "academy-scout":

                academyAction(
                    element.dataset.id
                );

                break;


            case "rewarded-ad":

                playRewardedAd();

                break;
        }
    }


    /* =====================================================
       PLAYER DETAIL
    ===================================================== */

    function openPlayerDetail(
        playerId
    ) {

        const player =
            state.career.squad.find(
                item =>
                    item.id ===
                    playerId
            );


        if (!player) {
            return;
        }


        const cap =
            DIVISIONS[
                state.career.division
            ].maxPlayerOvr;


        const overCap =
            player.ovr >
            cap;


        openGenericModal(`

            <div class="eyebrow">
                PLAYER PROFILE
            </div>


            <h2>
                ${escapeHTML(
                    player.name
                )}
            </h2>


            <p
                style="
                    margin:6px 0 0;
                    color:#77899f;
                    font-size:9px;
                "
            >
                ${player.position}
                · Age
                ${player.age}
                ·
                ${player.contractYears}
                years remaining
            </p>


            <div
                class="grid-3"
                style="margin-top:18px"
            >

                ${kpi(
                    "OVR",
                    player.ovr
                )}

                ${kpi(
                    "Potential",
                    player.potential
                )}

                ${kpi(
                    "Value",
                    money(
                        player.value
                    )
                )}

            </div>


            <div
                style="margin-top:15px"
            >

                ${meter(
                    "Morale",
                    player.morale
                )}

                ${meter(
                    "Form",
                    clamp(
                        50 +
                        player.form * 7,
                        0,
                        100
                    )
                )}

            </div>


            <div
                class="notice"
                style="margin-top:13px"
            >

                Division cap:
                <b>
                    ${cap}
                </b>

                <br>

                Status:
                <b>
                    ${
                        overCap
                            ? "Over Cap / Ineligible"
                            : "Eligible"
                    }
                </b>

            </div>


            <div
                style="
                    display:flex;
                    flex-wrap:wrap;
                    gap:8px;
                    margin-top:15px;
                "
            >

                <button
                    class="
                        btn
                        btn-primary
                    "
                    data-action="renew-player"
                    data-id="${player.id}"
                >
                    Renew Contract
                </button>


                <button
                    class="
                        btn
                        btn-secondary
                    "
                    data-action="sell-player"
                    data-id="${player.id}"
                >
                    Sell Player
                </button>


                <button
                    class="
                        btn
                        btn-secondary
                    "
                    data-close="genericModal"
                >
                    Close
                </button>

            </div>

        `);


        const root =
            $("genericModalContent");


        root.querySelectorAll(
            "[data-action]"
        ).forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const action =
                            button.dataset.action;


                        if (
                            action ===
                            "renew-player"
                        ) {

                            renewPlayer(
                                button.dataset.id
                            );
                        }


                        if (
                            action ===
                            "sell-player"
                        ) {

                            sellPlayer(
                                button.dataset.id
                            );
                        }
                    }
                );
            }
        );
    }


    /* =====================================================
       MATCH FIXTURE
    ===================================================== */

    function findUserTeam(
        career
    ) {

        return career.leagues[
            career.division
        ]?.find(
            team =>
                team.id ===
                career.clubTeamId
        ) || null;
    }


    function getNextFixture(
        career
    ) {

        for (
            const week
            of career.leagueSchedule
        ) {

            if (
                week.week <
                career.currentWeek
            ) {
                continue;
            }


            const fixture =
                week.matches.find(
                    match =>
                        (
                            match.home ===
                            career.clubTeamId
                        ) ||
                        (
                            match.away ===
                            career.clubTeamId
                        )
                );


            if (
                fixture &&
                !fixture.played
            ) {

                return {

                    ...fixture,

                    week:
                        week.week
                };
            }
        }


        return null;
    }


    /* =====================================================
       MATCH ENGINE
    ===================================================== */

    function simulateCurrentWeek(
        showMatchday = true
    ) {

        const career =
            state.career;


        const fixture =
            getNextFixture(
                career
            );


        if (!fixture) {

            finishSeason(
                career
            );

            return;
        }


        const league =
            career.leagues[
                career.division
            ];


        const homeTeam =
            league.find(
                team =>
                    team.id ===
                    fixture.home
            );


        const awayTeam =
            league.find(
                team =>
                    team.id ===
                    fixture.away
            );


        if (
            !homeTeam ||
            !awayTeam
        ) {
            return;
        }


        const userIsHome =
            fixture.home ===
            career.clubTeamId;


        const userStrength =
            calculateAvailableStrength(
                career
            );


        const opponentBase =
            (
                userIsHome
                    ? awayTeam.baseOvr
                    : homeTeam.baseOvr
            );


        /*
        RNG opponent variation
        */

        const opponentStrength =
            opponentBase +
            randomFloat(
                -2.5,
                2.5
            );


        /*
        Tactical influence
        */

        const tacticBoost =
            career.manager
                ? (
                    career.manager.tactics -
                    60
                ) *
                0.07
                : 0;


        /*
        Home advantage
        */

        const homeBoost =
            userIsHome
                ? 3.2
                : 0;


        /*
        Win chance
        */

        const winChance =
            clamp(
                50 +
                (
                    userStrength -
                    opponentStrength
                ) *
                4.2 +
                homeBoost +
                tacticBoost,

                5,
                95
            );


        /*
        Generate result
        */

        const result =
            generateMatchResult(
                userStrength,
                opponentStrength,
                userIsHome,
                career.manager
                    ?.tactics ||
                60
            );


        /*
        Apply
        */

        applyLeagueResult(
            career,
            fixture,
            result.homeGoals,
            result.awayGoals
        );


        updatePlayersAfterMatch(
            career,
            result,
            userIsHome
        );


        processCupEvents(
            career
        );


        processEconomy(
            career
        );


        developAcademy(
            career
        );


        generateWeeklyEvent(
            career,
            result
        );


        advanceCareerDate(
            career
        );


        /*
        Current week progresses
        */

        career.currentWeek =
            fixture.week + 1;


        /*
        Show cinematic match
        */

        if (
            showMatchday
        ) {

            playMatchday(
                career,
                homeTeam,
                awayTeam,
                result,
                winChance,
                userIsHome
            );

        } else {

            renderApp();
        }


        /*
        Season end
        */

        if (
            career.currentWeek >
            career.leagueSchedule.length
        ) {

            setTimeout(
                () =>
                    finishSeason(
                        career
                    ),
                1200
            );
        }


        saveCareer(
            career,
            true
        );
    }


    function generateMatchResult(
        userStrength,
        opponentStrength,
        userHome,
        tactics
    ) {

        const advantage =
            (
                userStrength -
                opponentStrength
            );


        const totalExpected =
            clamp(
                1.8 +
                advantage *
                0.025 +
                (
                    tactics -
                    60
                ) *
                0.004,

                0.8,
                4.6
            );


        let homeExpected =
            userHome
                ? totalExpected * 0.61
                : totalExpected * 0.42;


        let awayExpected =
            userHome
                ? totalExpected * 0.39
                : totalExpected * 0.58;


        homeExpected =
            clamp(
                homeExpected +
                0.15,
                0.2,
                4
            );


        awayExpected =
            clamp(
                awayExpected +
                0.15,
                0.2,
                4
            );


        let homeGoals =
            poisson(
                homeExpected
            );


        let awayGoals =
            poisson(
                awayExpected
            );


        /*
        Stronger teams get a little
        extra conversion chance.
        */

        if (
            advantage >
            7 &&
            Math.random() <
            0.35
        ) {

            if (
                userHome
            ) {
                homeGoals++;
            } else {
                awayGoals++;
            }
        }


        if (
            advantage <
            -8 &&
            Math.random() <
            0.28
        ) {

            if (
                userHome
            ) {
                awayGoals++;
            } else {
                homeGoals++;
            }
        }


        homeGoals =
            clamp(
                homeGoals,
                0,
                7
            );


        awayGoals =
            clamp(
                awayGoals,
                0,
                7
            );


        const possessionBase =
            clamp(
                50 +
                advantage *
                1.6 +
                randomInt(
                    -6,
                    6
                ),

                28,
                72
            );


        const shotsHome =
            clamp(
                Math.round(
                    7 +
                    homeExpected *
                    2.4 +
                    randomInt(
                        0,
                        7
                    )
                ),
                3,
                24
            );


        const shotsAway =
            clamp(
                Math.round(
                    7 +
                    awayExpected *
                    2.4 +
                    randomInt(
                        0,
                        7
                    )
                ),
                3,
                24
            );


        return {

            homeGoals,

            awayGoals,

            possessionHome:
                Math.round(
                    possessionBase
                ),

            possessionAway:
                100 -
                Math.round(
                    possessionBase
                ),

            shotsHome,

            shotsAway,

            xgHome:
                Math.max(
                    0.2,
                    homeExpected +
                    randomFloat(
                        -0.25,
                        0.25
                    )
                ),

            xgAway:
                Math.max(
                    0.2,
                    awayExpected +
                    randomFloat(
                        -0.25,
                        0.25
                    )
                ),

            commentary:
                generateCommentary(
                    homeGoals,
                    awayGoals
                )
        };
    }


    function poisson(
        lambda
    ) {

        const limit =
            Math.exp(-lambda);

        let probability =
            1;

        let count =
            0;


        do {

            count++;

            probability *=
                Math.random();

        } while (
            probability >
                limit &&
            count <
                10
        );


        return Math.max(
            0,
            count - 1
        );
    }


    /* =====================================================
       MATCH COMMENTARY
    ===================================================== */

    function generateCommentary(
        homeGoals,
        awayGoals
    ) {

        const normal = [

            "The match starts at a high tempo.",

            "The midfield battle is intense.",

            "The defence makes an important interception.",

            "A promising attack breaks down at the final pass.",

            "The manager calls for more width.",

            "The crowd reacts to a heavy challenge.",

            "The game opens up after the break.",

            "A tactical adjustment changes the rhythm."

        ];


        const timeline = [

            {
                minute: 8,
                text: pick(normal)
            },

            {
                minute: 22,
                text: pick(normal)
            },

            {
                minute: 44,
                text: "Half-time whistle."
            },

            {
                minute: 57,
                text: pick(normal)
            },

            {
                minute: 72,
                text: pick(normal)
            },

            {
                minute: 90,
                text: "Full-time whistle."
            }

        ];


        let remainingHome =
            homeGoals;


        let remainingAway =
            awayGoals;


        for (
            let minute = 12;
            minute <= 83 &&
            (
                remainingHome +
                remainingAway
            ) > 0;
            minute += randomInt(
                10,
                20
            )
        ) {

            let side;


            if (
                remainingHome >
                0 &&
                remainingAway >
                0
            ) {

                side =
                    Math.random() <
                    0.5
                        ? "home"
                        : "away";

            } else {

                side =
                    remainingHome >
                    0
                        ? "home"
                        : "away";
            }


            if (
                side ===
                "home"
            ) {

                remainingHome--;

            } else {

                remainingAway--;
            }


            timeline.push({

                minute:
                    clamp(
                        minute,
                        1,
                        90
                    ),

                goal:
                    true,

                side,

                text:
                    side === "home"
                        ? "GOAL! The home side finds the breakthrough."
                        : "GOAL! The away side strikes on the counter."
            });
        }


        timeline.sort(
            (
                a,
                b
            ) =>
                a.minute -
                b.minute
        );


        return timeline;
    }


    /* =====================================================
       APPLY RESULT
    ===================================================== */

    function applyLeagueResult(
        career,
        fixture,
        homeGoals,
        awayGoals
    ) {

        fixture.played =
            true;


        fixture.homeGoals =
            homeGoals;


        fixture.awayGoals =
            awayGoals;


        const league =
            career.leagues[
                career.division
            ];


        const home =
            league.find(
                team =>
                    team.id ===
                    fixture.home
            );


        const away =
            league.find(
                team =>
                    team.id ===
                    fixture.away
            );


        if (
            !home ||
            !away
        ) {
            return;
        }


        home.played++;

        away.played++;


        home.gf +=
            homeGoals;

        home.ga +=
            awayGoals;


        away.gf +=
            awayGoals;

        away.ga +=
            homeGoals;


        home.gd =
            home.gf -
            home.ga;


        away.gd =
            away.gf -
            away.ga;


        if (
            homeGoals >
            awayGoals
        ) {

            home.won++;

            away.lost++;

            home.points +=
                3;

            home.form.push(
                "W"
            );

            away.form.push(
                "L"
            );

        } else if (
            homeGoals <
            awayGoals
        ) {

            away.won++;

            home.lost++;

            away.points +=
                3;

            home.form.push(
                "W"
            );

            away.form.push(
                "L"
            );

        } else {

            home.drawn++;

            away.drawn++;

            home.points++;

            away.points++;

            home.form.push(
                "D"
            );

            away.form.push(
                "D"
            );
        }


        home.form =
            home.form.slice(
                -5
            );


        away.form =
            away.form.slice(
                -5
            );


        /*
        User result
        */

        const userGoals =
            fixture.home ===
            career.clubTeamId

                ? homeGoals
                : awayGoals;


        const opponentGoals =
            fixture.home ===
            career.clubTeamId

                ? awayGoals
                : homeGoals;


        career.stats.goalsFor +=
            userGoals;


        career.stats.goalsAgainst +=
            opponentGoals;


        if (
            userGoals >
            opponentGoals
        ) {

            career.stats.wins++;


            career.fanSupport =
                clamp(
                    career.fanSupport +
                    2,

                    0,
                    100
                );


            career.boardConfidence =
                clamp(
                    career.boardConfidence +
                    2,

                    0,
                    100
                );


            career.reputation =
                clamp(
                    career.reputation +
                    1,

                    0,
                    100
                );


            addNews(
                career,
                "Big win",
                `${career.club.name} win ${userGoals}–${opponentGoals}.`,
                "match"
            );


        } else if (
            userGoals ===
            opponentGoals
        ) {

            career.stats.draws++;


            career.fanSupport =
                clamp(
                    career.fanSupport +
                    0.3,

                    0,
                    100
                );


            addNews(
                career,
                "Hard-fought draw",
                `${career.club.name} share the points.`,
                "match"
            );


        } else {

            career.stats.losses++;


            career.fanSupport =
                clamp(
                    career.fanSupport -
                    2,

                    0,
                    100
                );


            career.boardConfidence =
                clamp(
                    career.boardConfidence -
                    1,

                    0,
                    100
                );


            addNews(
                career,
                "Setback",
                `${career.club.name} lose ${userGoals}–${opponentGoals}.`,
                "match"
            );
        }
    }


    /* =====================================================
       PLAYER MATCH UPDATE
    ===================================================== */

    function updatePlayersAfterMatch(
        career,
        result,
        userIsHome
    ) {

        const userGoals =
            userIsHome
                ? result.homeGoals
                : result.awayGoals;


        const cap =
            DIVISIONS[
                career.division
            ].maxPlayerOvr;


        const eligible =
            career.squad
                .filter(
                    player =>
                        player.ovr <= cap &&
                        player.injuredWeeks <=
                            0
                );


        eligible.forEach(
            player => {

                player.appearances++;

                player.form =
                    clamp(
                        player.form +
                        randomInt(
                            -1,
                            2
                        ),

                        -5,
                        8
                    );


                player.morale =
                    clamp(
                        player.morale +
                        (
                            userGoals >
                            0
                                ? 1
                                : -1
                        ),

                        20,
                        100
                    );


                if (
                    Math.random() <
                    0.025
                ) {

                    player.injuredWeeks =
                        randomInt(
                            1,
                            4
                        );
                }
            }
        );


        const attackers =
            eligible.filter(
                player =>
                    [
                        "ST",
                        "WG",
                        "AM"
                    ].includes(
                        player.position
                    )
            );


        for (
            let i = 0;
            i < userGoals;
            i++
        ) {

            if (
                attackers.length
            ) {

                pick(
                    attackers
                ).goals++;
            }
        }


        normalizePlayerEconomy(
            career
        );
    }


    /* =====================================================
       ECONOMY
    ===================================================== */

    function processEconomy(
        career
    ) {

        const wages =
            career.squad.reduce(
                (
                    sum,
                    player
                ) =>
                    sum +
                    player.wage,

                0
            ) +

            (
                career.manager
                    ?.salary ||
                0
            ) / 52 +

            career.scouts.reduce(
                (
                    sum,
                    scout
                ) =>
                    sum +
                    scout.weeklyCost,

                0
            );


        const stadiumIncome =
            180000 +
            career.facilities
                .stadiumLevel *
            50000 +
            career.fanSupport *
            3500;


        const sponsorIncome =
            career.sponsor
                ? career.sponsor.annual /
                  52
                : 0;


        const commercialIncome =
            35000 +
            career.reputation *
            700;


        const revenue =
            stadiumIncome +
            sponsorIncome +
            commercialIncome;


        career.weeklyRevenue =
            revenue;


        career.weeklyCosts =
            wages;


        career.cash +=
            revenue -
            wages;


        if (
            career.cash <
            0
        ) {

            career.boardConfidence =
                clamp(
                    career.boardConfidence -
                    3,

                    0,
                    100
                );


            addInbox(
                career,
                "Cash flow warning",
                "Your club is spending more than it earns this week.",
                "negative"
            );
        }
    }


    /* =====================================================
       ACADEMY DEVELOPMENT
    ===================================================== */

    function developAcademy(
        career
    ) {

        const youthStrength =
            (
                career.manager
                    ?.youth ||
                50
            );


        const chance =
            clamp(
                0.35 +
                youthStrength /
                1600 +
                career.facilities
                    .academyLevel *
                0.04,

                0.2,
                0.9
            );


        career.academy.forEach(
            prospect => {

                if (
                    prospect.promoted
                ) {
                    return;
                }


                if (
                    Math.random() <
                    chance
                ) {

                    prospect.development =
                        clamp(
                            prospect.development +
                            1,

                            0,
                            15
                        );
                }
            }
        );
    }


    /* =====================================================
       DATE
    ===================================================== */

    function advanceCareerDate(
        career
    ) {

        career.date =
            addDays(
                career.date,
                7
            );


        career.squad.forEach(
            player => {

                if (
                    player.injuredWeeks >
                    0
                ) {

                    player.injuredWeeks--;
                }
            }
        );
    }


    /* =====================================================
       WEEKLY RANDOM EVENTS
    ===================================================== */

    function generateWeeklyEvent(
        career,
        result
    ) {

        const roll =
            Math.random();


        if (
            roll < 0.12
        ) {

            const player =
                pick(
                    career.squad
                );


            player.form =
                clamp(
                    player.form +
                    2,

                    -5,
                    8
                );


            addNews(
                career,
                "Training boost",
                `${player.name} looked excellent in training. Form +2.`,
                "training"
            );


        } else if (
            roll < 0.2
        ) {

            career.fanSupport =
                clamp(
                    career.fanSupport +
                    1,

                    0,
                    100
                );


            addNews(
                career,
                "Fan momentum",
                "Atmosphere in the stands is improving.",
                "club"
            );


        } else if (
            result.homeGoals +
            result.awayGoals >=
            5
        ) {

            career.mediaReputation =
                clamp(
                    career.mediaReputation +
                    1,

                    0,
                    100
                );


            addNews(
                career,
                "Entertaining game",
                "The match generated plenty of attention.",
                "club"
            );
        }
    }


    /* =====================================================
       MARKET
    ===================================================== */

    function generateTransferMarket(
        career,
        force = false
    ) {

        if (
            !force &&
            career.transferMarket?.length
        ) {
            return;
        }


        const list = [];


        for (
            let i = 0;
            i < 16;
            i++
        ) {

            const rangeBase =
                DIVISIONS[
                    career.division
                ].maxPlayerOvr;


            const ovr =
                randomInt(
                    Math.max(
                        42,
                        rangeBase -
                        12
                    ),

                    Math.min(
                        96,
                        rangeBase +
                        18
                    )
                );


            const player =
                makePlayer({

                    ovr,

                    potential:
                        clamp(
                            ovr +
                            randomInt(
                                1,
                                15
                            ),

                            ovr,
                            97
                        ),

                    age:
                        randomInt(
                            17,
                            31
                        ),

                    division:
                        clamp(
                            career.division +
                            randomInt(
                                -1,
                                1
                            ),

                            1,
                            5
                        ),

                    scouted:
                        false,

                    hiddenOvr:
                        true,

                    hiddenPotential:
                        true
                });


            list.push(
                player
            );
        }


        career.transferMarket =
            list;
    }


    /* =====================================================
       SCOUT PLAYER
    ===================================================== */

    function scoutPlayer(
        playerId
    ) {

        const career =
            state.career;


        const player =
            career.transferMarket
                ?.find(
                    item =>
                        item.id ===
                        playerId
                );


        if (!player) {
            return;
        }


        const scout =
            career.scouts
                .slice()
                .sort(
                    (
                        a,
                        b
                    ) =>
                        b.level -
                        a.level
                )[0];


        const cost =
            75000 +
            (
                (
                    scout?.level ||
                    1
                ) -
                1
            ) *
            40000;


        if (
            career.scoutingBudget <
            cost
        ) {

            toast(
                "Scout budget too low",
                `You need ${money(cost)}.`,
                "negative"
            );

            return;
        }


        career.scoutingBudget -=
            cost;


        player.scouted =
            true;


        player.hiddenOvr =
            false;


        player.hiddenPotential =
            false;


        const uncertainty =
            Math.max(
                0,
                9 -
                (
                    scout?.level ||
                    1
                ) *
                2
            );


        const reportedOvr =
            clamp(
                player.ovr +
                randomInt(
                    -uncertainty,
                    uncertainty
                ),

                1,
                99
            );


        const reportedPotential =
            clamp(
                player.potential +
                randomInt(
                    -uncertainty,
                    uncertainty
                ),

                reportedOvr,
                99
            );


        player.scoutReport = {

            ovr:
                reportedOvr,

            potential:
                reportedPotential
        };


        const verdict =
            getScoutVerdict(
                career,
                reportedOvr,
                reportedPotential
            );


        career.scoutReports.push({

            id:
                uid("report"),

            playerId:
                player.id,

            playerName:
                player.name,

            ovr:
                reportedOvr,

            potential:
                reportedPotential,

            value:
                player.value,

            verdict,

            date:
                career.date
        });


        addInbox(
            career,
            "Scouting report complete",
            `${player.name}: OVR ${reportedOvr}, POT ${reportedPotential}.`,
            "positive"
        );


        saveCareer(
            career,
            true
        );


        renderApp();


        toast(
            "Scout report",
            `${player.name} · OVR ${reportedOvr} · POT ${reportedPotential}`,
            "positive"
        );
    }


    function getScoutVerdict(
        career,
        ovr,
        potential
    ) {

        const cap =
            DIVISIONS[
                career.division
            ].maxPlayerOvr;


        if (
            ovr >
            cap
        ) {

            return "Above division cap";
        }


        if (
            potential -
            ovr >=
            12
        ) {

            return "High upside";
        }


        if (
            ovr >=
            calculateClubOverall(
                career
            )
        ) {

            return "Ready now";
        }


        return "Project";
    }


    /* =====================================================
       BUY PLAYER
    ===================================================== */

    function buyPlayer(
        playerId
    ) {

        const career =
            state.career;


        const player =
            career.transferMarket
                ?.find(
                    item =>
                        item.id ===
                        playerId
                );


        if (!player) {
            return;
        }


        /*
        Unknown player:
        the price fluctuates
        until scout.
        */

        const fee =
            player.scouted

                ? player.value

                : Math.round(
                    player.value *
                    randomFloat(
                        0.9,
                        1.15
                    )
                );


        if (
            career.cash <
            fee
        ) {

            toast(
                "Transfer blocked",
                `You need ${money(fee)} to sign ${player.name}.`,
                "negative"
            );

            return;
        }


        career.cash -=
            fee;


        const signedPlayer =
            JSON.parse(
                JSON.stringify(
                    player
                )
            );


        signedPlayer.scouted =
            true;


        signedPlayer.hiddenOvr =
            false;


        signedPlayer.hiddenPotential =
            false;


        signedPlayer.contractYears =
            randomInt(
                2,
                5
            );


        career.squad.push(
            signedPlayer
        );


        career.transferMarket =
            career.transferMarket
                .filter(
                    item =>
                        item.id !==
                        playerId
                );


        career.transfers.unshift({

            type:
                "in",

            player:
                player.name,

            fee,

            date:
                career.date
        });


        normalizePlayerEconomy(
            career
        );


        addNews(
            career,
            "Transfer completed",
            `${player.name} joins the club for ${money(fee)}.`,
            "club"
        );


        addInbox(
            career,
            "New signing",
            `${player.name} has signed a ${signedPlayer.contractYears}-year deal.`,
            "positive"
        );


        saveCareer(
            career,
            true
        );


        renderApp();


        toast(
            "Transfer complete",
            `${player.name} signed for ${money(fee)}.`,
            "positive"
        );
    }


    /* =====================================================
       SELL PLAYER
    ===================================================== */

    function sellPlayer(
        playerId
    ) {

        const career =
            state.career;


        const index =
            career.squad.findIndex(
                player =>
                    player.id ===
                    playerId
            );


        if (
            index <
            0
        ) {
            return;
        }


        if (
            career.squad.length <=
            14
        ) {

            toast(
                "Sale blocked",
                "Keep at least 14 first-team players.",
                "negative"
            );

            return;
        }


        const player =
            career.squad[
                index
            ];


        const fee =
            Math.round(
                player.value *
                randomFloat(
                    0.82,
                    1.3
                )
            );


        career.cash +=
            fee;


        career.squad.splice(
            index,
            1
        );


        career.transfers.unshift({

            type:
                "out",

            player:
                player.name,

            fee,

            date:
                career.date
        });


        addNews(
            career,
            "Player sold",
            `${player.name} leaves for ${money(fee)}.`,
            "club"
        );


        saveCareer(
            career,
            true
        );


        closeModal(
            "genericModal"
        );


        renderApp();


        toast(
            "Player sold",
            `${player.name} sold for ${money(fee)}.`,
            "positive"
        );
    }


    /* =====================================================
       RENEW CONTRACT
    ===================================================== */

    function renewPlayer(
        playerId
    ) {

        const career =
            state.career;


        const player =
            career.squad.find(
                item =>
                    item.id ===
                    playerId
            );


        if (!player) {
            return;
        }


        const increase =
            randomFloat(
                0.15,
                0.42
            );


        const newWage =
            Math.round(
                (
                    player.wage *
                    (
                        1 +
                        increase
                    )
                ) /
                50
            ) * 50;


        const years =
            randomInt(
                2,
                5
            );


        const agentFee =
            newWage *
            12;


        if (
            career.cash <
            agentFee
        ) {

            toast(
                "Renewal failed",
                `You need ${money(agentFee)} for the renewal.`,
                "negative"
            );

            return;
        }


        career.cash -=
            agentFee;


        player.wage =
            newWage;


        player.contractYears =
            years;


        player.morale =
            clamp(
                player.morale +
                6,
                0,
                100
            );


        addInbox(
            career,
            "Contract renewed",
            `${player.name} signs a ${years}-year extension at ${fullMoney(newWage)}/week.`,
            "positive"
        );


        addNews(
            career,
            "Contract renewal",
            `${player.name} commits his future to the club.`,
            "club"
        );


        closeModal(
            "genericModal"
        );


        saveCareer(
            career,
            true
        );


        renderApp();


        toast(
            "Contract renewed",
            `${player.name} · ${years} years · ${fullMoney(newWage)}/week`,
            "positive"
        );
    }


    /* =====================================================
       MANAGER MARKET
    ===================================================== */

    function generateManagerMarket(
        career
    ) {

        if (
            career.managerMarket?.length
        ) {

            return career.managerMarket;
        }


        career.managerMarket =
            Array.from(
                {
                    length: 8
                },
                () =>
                    makeManager({

                        overall:
                            randomInt(
                                Math.max(
                                    45,
                                    DIVISIONS[
                                        career.division
                                    ].baseOvr -
                                    10
                                ),

                                Math.min(
                                    95,
                                    DIVISIONS[
                                        career.division
                                    ].baseOvr +
                                    16
                                ))
                            })
            );


        return career.managerMarket;
    }


    function hireManager(
        managerId
    ) {

        const career =
            state.career;


        const manager =
            generateManagerMarket(
                career
            ).find(
                item =>
                    item.id ===
                    managerId
            );


        if (!manager) {
            return;
        }


        const compensation =
            Math.round(
                manager.salary *
                1.3
            );


        if (
            career.cash <
            compensation
        ) {

            toast(
                "Manager deal failed",
                `You need ${money(compensation)}.`,
                "negative"
            );

            return;
        }


        career.cash -=
            compensation;


        career.manager =
            JSON.parse(
                JSON.stringify(
                    manager
                )
            );


        career.managers.push(
            JSON.parse(
                JSON.stringify(
                    manager
                )
            )
        );


        career.managerMarket =
            null;


        career.boardConfidence =
            clamp(
                career.boardConfidence +
                2,

                0,
                100
            );


        addNews(
            career,
            "New manager",
            `${manager.name} is appointed head coach.`,
            "club"
        );


        saveCareer(
            career,
            true
        );


        renderApp();


        toast(
            "Manager appointed",
            `${manager.name} takes charge.`,
            "positive"
        );
    }


    /* =====================================================
       SPONSORS
    ===================================================== */

    function generateSponsorOffers(
        career
    ) {

        career.sponsorOffers =
            SPONSORS
                .map(
                    sponsor => {

                        const annual =
                            Math.round(
                                (
                                    sponsor.annualBase *
                                    (
                                        1 -
                                        career.division *
                                        0.07
                                    ) *
                                    randomFloat(
                                        0.9,
                                        1.15
                                    ) +

                                    career.reputation *
                                    22000
                                ) /

                                50000

                            ) * 50000;


                        return {

                            ...JSON.parse(
                                JSON.stringify(
                                    sponsor
                                )
                            ),

                            id:
                                uid("sponsor"),

                            annual
                        };
                    }
                )
                .filter(
                    sponsor =>
                        sponsor.reputation <=
                        career.reputation +
                        20
                );
    }


    function signSponsor(
        sponsorId
    ) {

        const career =
            state.career;


        const sponsor =
            career.sponsorOffers.find(
                item =>
                    item.id ===
                    sponsorId
            );


        if (!sponsor) {
            return;
        }


        if (
            career.reputation <
            sponsor.reputation
        ) {

            toast(
                "Sponsor unavailable",
                `Reputation ${sponsor.reputation} is required.`,
                "negative"
            );

            return;
        }


        career.sponsor = {

            ...JSON.parse(
                JSON.stringify(
                    sponsor
                )
            ),

            years:
                randomInt(
                    sponsor.years[0],
                    sponsor.years[1]
                )
        };


        career.fanSupport =
            clamp(
                career.fanSupport +
                sponsor.fan,

                0,
                100
            );


        career.mediaReputation =
            clamp(
                career.mediaReputation +
                sponsor.media,

                0,
                100
            );


        career.boardConfidence =
            clamp(
                career.boardConfidence +
                3,

                0,
                100
            );


        if (
            sponsor.controversial
        ) {

            addNews(
                career,
                "Sponsor controversy",
                `${sponsor.name} brings major financial income but negative public reaction.`,
                "club"
            );


            addInbox(
                career,
                "Mixed sponsor reaction",
                "Board confidence improves, while media and fan response worsens.",
                "neutral"
            );

        } else {

            addNews(
                career,
                "Sponsor signed",
                `${sponsor.name} becomes the new commercial partner.`,
                "club"
            );
        }


        saveCareer(
            career,
            true
        );


        renderApp();


        toast(
            "Sponsor signed",
            `${sponsor.name} · ${money(sponsor.annual)}/year`,
            "positive"
        );
    }


    /* =====================================================
       FACILITIES
    ===================================================== */

    function upgradeFacility(
        key,
        cost
    ) {

        const career =
            state.career;


        if (
            !(
                key in
                career.facilities
            )
        ) {
            return;
        }


        if (
            career.facilities[
                key
            ] >= 8
        ) {
            return;
        }


        if (
            career.cash <
            cost
        ) {

            toast(
                "Insufficient funds",
                `You need ${money(cost)}.`,
                "negative"
            );

            return;
        }


        career.cash -=
            cost;


        career.facilities[
            key
        ]++;


        addNews(
            career,
            "Facility upgraded",
            `${key} reaches level ${career.facilities[key]}.`,
            "club"
        );


        saveCareer(
            career,
            true
        );


        renderApp();


        toast(
            "Upgrade complete",
            `${key} is now level ${career.facilities[key]}.`,
            "positive"
        );
    }


    /* =====================================================
       ACADEMY ACTION
    ===================================================== */

    function academyAction(
        prospectId
    ) {

        const career =
            state.career;


        const prospect =
            career.academy.find(
                item =>
                    item.id ===
                    prospectId
            );


        if (
            !prospect ||
            prospect.promoted
        ) {
            return;
        }


        /*
        Scout
        */

        if (
            !prospect.discovered
        ) {

            const cost =
                60000 +
                career.facilities
                    .academyLevel *
                18000;


            if (
                career.scoutingBudget <
                cost
            ) {

                toast(
                    "Academy scouting",
                    `You need ${money(cost)} scouting budget.`,
                    "negative"
                );

                return;
            }


            career.scoutingBudget -=
                cost;


            prospect.discovered =
                true;


            toast(
                "Prospect scouted",
                `${prospect.name} · OVR ${prospect.hiddenOvr + prospect.development} · POT ${prospect.hiddenPotential}`,
                "positive"
            );


            addInbox(
                career,
                "Academy report",
                `${prospect.name} has been assessed by the academy scouting team.`,
                "positive"
            );


            saveCareer(
                career,
                true
            );


            renderApp();


            return;
        }


        /*
        Promotion
        */

        if (
            prospect.age >=
            16
        ) {

            const overall =
                clamp(
                    prospect.hiddenOvr +
                    prospect.development,

                    1,
                    99
                );


            const player =
                makePlayer({

                    name:
                        prospect.name,

                    age:
                        prospect.age,

                    position:
                        prospect.position,

                    ovr:
                        overall,

                    potential:
                        prospect.hiddenPotential,

                    scouted:
                        true,

                    hiddenOvr:
                        false,

                    hiddenPotential:
                        false,

                    academyProduct:
                        true,

                    division:
                        career.division,

                    contractYears:
                        3,

                    morale:
                        78
                });


            career.squad.push(
                player
            );


            prospect.promoted =
                true;


            normalizePlayerEconomy(
                career
            );


            addNews(
                career,
                "Academy graduate",
                `${player.name} joins the first team.`,
                "club"
            );


            saveCareer(
                career,
                true
            );


            renderApp();


            toast(
                "Academy promotion",
                `${player.name} joins with OVR ${player.ovr}.`,
                "positive"
            );
        }
    }


    /* =====================================================
       CUPS
    ===================================================== */

    function processCupEvents(
        career
    ) {

        /*
        Cup events are independent
        of league results.

        This version is compact,
        but keeps distinct FA /
        Carabao progression.
        */

        if (
            career.cups.carabao.active &&
            !career.cups.carabao.eliminated &&
            Math.random() <
                0.17
        ) {

            advanceCup(
                career,
                "carabao"
            );
        }


        if (
            career.cups.fa.active &&
            !career.cups.fa.eliminated &&
            Math.random() <
                0.12
        ) {

            advanceCup(
                career,
                "fa"
            );
        }
    }


    function advanceCup(
        career,
        type
    ) {

        const cup =
            career.cups[
                type
            ];


        const rounds =
            type === "carabao"

                ? [
                    "Round 1",
                    "Round 2",
                    "Round 3",
                    "Round 4",
                    "Quarter-final",
                    "Semi-final",
                    "Final"
                ]

                : [
                    "Qualifying",
                    "First Round",
                    "Second Round",
                    "Third Round",
                    "Fourth Round",
                    "Fifth Round",
                    "Quarter-final",
                    "Semi-final",
                    "Final"
                ];


        const index =
            rounds.indexOf(
                cup.round
            );


        if (
            index <
            0
        ) {
            return;
        }


        const clubStrength =
            calculateAvailableStrength(
                career
            );


        const opposition =
            DIVISIONS[
                clamp(
                    career.division +
                    randomInt(
                        -1,
                        1
                    ),

                    1,
                    5
                )
            ].baseOvr +
            randomFloat(
                -3,
                4
            );


        const chance =
            clamp(
                52 +
                (
                    clubStrength -
                    opposition
                ) *
                4,

                10,
                90
            );


        const won =
            Math.random() *
            100 <
            chance;


        if (!won) {

            cup.eliminated =
                true;


            cup.active =
                false;


            cup.history.push({

                round:
                    cup.round,

                result:
                    "Eliminated"
            });


            addNews(
                career,
                `${type === "fa" ? "FA Cup" : "Carabao Cup"} exit`,
                `${career.club.name} are eliminated in the ${cup.round}.`,
                "club"
            );


            return;
        }


        cup.history.push({

            round:
                cup.round,

            result:
                "Won"
        });


        const nextRound =
            rounds[
                index + 1
            ];


        if (
            nextRound
        ) {

            cup.round =
                nextRound;


            addNews(
                career,
                `${type === "fa" ? "FA Cup" : "Carabao Cup"} progress`,
                `${career.club.name} advance to the ${nextRound}.`,
                "club"
            );


        } else {

            cup.active =
                false;


            addNews(
                career,
                `${type === "fa" ? "FA Cup" : "Carabao Cup"} Champions`,
                `${career.club.name} lift the trophy.`,
                "board"
            );


            career.reputation =
                clamp(
                    career.reputation +
                    6,

                    0,
                    100
                );


            career.cash +=
                type === "fa"
                    ? 3800000
                    : 2500000;
        }
    }


    /* =====================================================
       TABLE
    ===================================================== */

    function getLeagueTable(
        career
    ) {

        const league =
            career.leagues[
                career.division
            ];


        return [...league]
            .sort(
                (
                    a,
                    b
                ) =>

                    b.points -
                    a.points ||

                    b.gd -
                    a.gd ||

                    b.gf -
                    a.gf ||

                    a.name.localeCompare(
                        b.name
                    )
            );
    }


    function getRecentResults(
        career
    ) {

        const results = [];


        for (
            const week
            of [...career.leagueSchedule].reverse()
        ) {

            const fixture =
                week.matches.find(
                    match =>
                        match.played &&
                        (
                            match.home ===
                            career.clubTeamId ||
                            match.away ===
                            career.clubTeamId
                        )
                );


            if (!fixture) {
                continue;
            }


            const home =
                career.leagues[
                    career.division
                ].find(
                    team =>
                        team.id ===
                        fixture.home
                );


            const away =
                career.leagues[
                    career.division
                ].find(
                    team =>
                        team.id ===
                        fixture.away
                );


            const gf =
                fixture.home ===
                career.clubTeamId
                    ? fixture.homeGoals
                    : fixture.awayGoals;


            const ga =
                fixture.home ===
                career.clubTeamId
                    ? fixture.awayGoals
                    : fixture.homeGoals;


            results.push({

                label:
                    `MW ${week.week} · ${home?.name || "?"} vs ${away?.name || "?"}`,

                result:
                    `${gf}–${ga}`
            });


            if (
                results.length >=
                6
            ) {
                break;
            }
        }


        return results;
    }


    /* =====================================================
       SEASON
    ===================================================== */

    function finishSeason(
        career
    ) {

        const table =
            getLeagueTable(
                career
            );


        const position =
            table.findIndex(
                team =>
                    team.id ===
                    career.clubTeamId
            ) + 1;


        const size =
            table.length;


        const promoted =
            career.division > 1 &&
            position <= 4;


        const relegated =
            career.division < 5 &&
            position >= size - 4;


        if (
            promoted
        ) {

            career.division--;


            addNews(
                career,
                "Promotion achieved",
                `${career.club.name} move to ${DIVISIONS[career.division].name}.`,
                "board"
            );


            career.cash +=
                1500000;


            career.reputation =
                clamp(
                    career.reputation +
                    8,

                    0,
                    100
                );


            career.boardConfidence =
                clamp(
                    career.boardConfidence +
                    8,

                    0,
                    100
                );


        } else if (
            relegated
        ) {

            career.division++;


            addNews(
                career,
                "Relegation",
                `${career.club.name} drop into ${DIVISIONS[career.division].name}.`,
                "board"
            );


            career.reputation =
                clamp(
                    career.reputation -
                    6,

                    0,
                    100
                );


            career.boardConfidence =
                clamp(
                    career.boardConfidence -
                    12,

                    0,
                    100
                );


        } else {

            addNews(
                career,
                "Season complete",
                `${career.club.name} finish ${position}${ordinal(position)}.`,
                "club"
            );
        }


        /*
        New season
        */

        career.season++;


        career.date =
            `${career.season}-07-15T12:00:00`;


        career.stats = {

            wins: 0,

            draws: 0,

            losses: 0,

            goalsFor: 0,

            goalsAgainst: 0
        };


        career.leagues =
            buildLeagues(
                career.club.name,
                career.division
            );


        const newTeam =
            career.leagues[
                career.division
            ].find(
                team =>
                    team.name ===
                    career.club.name
            ) ||
            career.leagues[
                career.division
            ][0];


        newTeam.name =
            career.club.name;


        career.clubTeamId =
            newTeam.id;


        buildSeasonSchedule(
            career
        );


        career.currentWeek =
            1;


        career.cups.fa.round =
            career.division >= 4
                ? "Qualifying"
                : career.division === 3
                    ? "First Round"
                    : "Third Round";


        career.cups.fa.active =
            true;


        career.cups.fa.eliminated =
            false;


        career.cups.carabao.round =
            career.division >= 3
                ? "Round 1"
                : career.division === 2
                    ? "Round 2"
                    : "Round 3";


        career.cups.carabao.active =
            true;


        career.cups.carabao.eliminated =
            false;


        career.scoutingBudget +=
            500000;


        generateTransferMarket(
            career,
            true
        );


        generateSponsorOffers(
            career
        );


        saveCareer(
            career,
            true
        );


        renderApp();


        toast(
            "New season",
            `Welcome to ${career.season}/${String(career.season + 1).slice(-2)}.`,
            "positive"
        );
    }


    function ordinal(
        number
    ) {

        if (
            number % 100 >= 11 &&
            number % 100 <= 13
        ) {
            return "th";
        }


        return (
            {
                1: "st",
                2: "nd",
                3: "rd"
            }[
                number % 10
            ] ||
            "th"
        );
    }


    /* =====================================================
       VALUE / FACILITIES
    ===================================================== */

    function calculateClubValue(
        career
    ) {

        const squadValue =
            career.squad.reduce(
                (
                    sum,
                    player
                ) =>
                    sum +
                    player.value,

                0
            );


        const stadiumValue =
            career.facilities
                .stadiumLevel *
            750000;


        const academyValue =
            career.facilities
                .academyLevel *
            450000;


        const brandValue =
            career.reputation *
            40000;


        const sponsorValue =
            career.sponsor
                ?.annual ||
            0;


        return Math.round(
            (
                squadValue +
                stadiumValue +
                academyValue +
                brandValue +
                sponsorValue
            ) /
            50000
        ) * 50000;
    }


    function calculateFacilities(
        career
    ) {

        const values =
            Object.values(
                career.facilities
            );


        return Math.round(
            (
                values.reduce(
                    (
                        sum,
                        value
                    ) =>
                        sum +
                        value,

                    0
                ) /
                (
                    values.length *
                    8
                )
            ) *
            100
        );
    }


    function average(
        values
    ) {

        if (
            !values.length
        ) {
            return 0;
        }


        return (
            values.reduce(
                (
                    sum,
                    value
                ) =>
                    sum +
                    value,

                0
            ) /
            values.length
        );
    }


    /* =====================================================
       REWARDED AD PROTOTYPE
    ===================================================== */

    function playRewardedAd() {

        const career =
            state.career;


        if (!career) {
            return;
        }


        if (
            career.adClaimedWeek ===
            career.currentWeek
        ) {
            return;
        }


        const reward =
            250000;


        openGenericModal(`

            <div class="eyebrow">
                SPONSORED OFFER
            </div>


            <h2>
                Weekly Reward
            </h2>


            <p
                style="
                    margin-top:8px;
                    color:#8393a7;
                    font-size:10px;
                    line-height:1.7;
                "
            >
                Prototype rewarded-ad flow.
                In production, replace the
                countdown with your real
                rewarded-ad SDK callback.
            </p>


            <div
                id="adTimer"
                style="
                    margin:25px 0;
                    text-align:center;
                    color:#5d72ff;
                    font-size:52px;
                    font-weight:950;
                "
            >
                5
            </div>


            <button
                id="adClaimButton"
                class="
                    btn
                    btn-secondary
                    full
                "
                disabled
            >
                Waiting for sponsor...
            </button>

        `);


        let seconds =
            5;


        const timer =
            setInterval(
                () => {

                    seconds--;


                    const timerElement =
                        $("adTimer");


                    if (
                        timerElement
                    ) {

                        timerElement.textContent =
                            seconds;
                    }


                    if (
                        seconds <=
                        0
                    ) {

                        clearInterval(
                            timer
                        );


                        const button =
                            $("adClaimButton");


                        if (
                            !button
                        ) {
                            return;
                        }


                        button.disabled =
                            false;


                        button.className =
                            "btn btn-primary full";


                        button.textContent =
                            `Claim ${money(
                                reward
                            )}`;


                        button.addEventListener(
                            "click",
                            () => {

                                career.cash +=
                                    reward;


                                career.adClaimedWeek =
                                    career.currentWeek;


                                addNews(
                                    career,
                                    "Sponsor reward",
                                    `The club received ${money(reward)} from a sponsored offer.`,
                                    "club"
                                );


                                saveCareer(
                                    career,
                                    true
                                );


                                closeModal(
                                    "genericModal"
                                );


                                renderApp();


                                toast(
                                    "Reward claimed",
                                    `+${money(reward)} added to club cash.`,
                                    "positive"
                                );
                            }
                        );
                    }

                },
                1000
            );
    }


    /* =====================================================
       MATCHDAY CINEMATIC UI
    ===================================================== */

    function playMatchday(
        career,
        homeTeam,
        awayTeam,
        result,
        winChance,
        userIsHome
    ) {

        const overlay =
            $("matchdayOverlay");


        const content =
            $("matchdayContent");


        const round =
            $("matchdayRound");


        if (
            !overlay ||
            !content
        ) {

            renderApp();

            return;
        }


        overlay.classList.remove(
            "hidden"
        );


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        state.matchOpen =
            true;


        if (
            round
        ) {

            round.textContent =
                `MATCHWEEK ${career.currentWeek - 1}`;
        }


        const clubShort =
            career.club.short;


        const homeShort =
            homeTeam.id ===
            career.clubTeamId

                ? clubShort

                : homeTeam.name
                    .slice(
                        0,
                        3
                    )
                    .toUpperCase();


        const awayShort =
            awayTeam.id ===
            career.clubTeamId

                ? clubShort

                : awayTeam.name
                    .slice(
                        0,
                        3
                    )
                    .toUpperCase();


        content.innerHTML = `

            <div class="match-teams">


                <div class="match-team">

                    <div class="match-team-badge">

                        ${escapeHTML(
                            homeShort
                        )}

                    </div>


                    <strong>
                        ${escapeHTML(
                            homeTeam.name
                        )}
                    </strong>


                    <span>
                        OVR
                        ${
                            homeTeam.id ===
                            career.clubTeamId
                                ? calculateClubOverall(
                                    career
                                )
                                : Math.round(
                                    homeTeam.baseOvr
                                )
                        }
                    </span>

                </div>


                <div class="match-score">

                    <div
                        class="match-score-main"
                        id="animatedScore"
                    >
                        0 — 0
                    </div>


                    <div
                        class="match-score-time"
                        id="metricStatus"
                    >
                        KICK OFF
                    </div>

                </div>


                <div class="match-team">

                    <div class="match-team-badge">

                        ${escapeHTML(
                            awayShort
                        )}

                    </div>


                    <strong>
                        ${escapeHTML(
                            awayTeam.name
                        )}
                    </strong>


                    <span>
                        OVR
                        ${
                            awayTeam.id ===
                            career.clubTeamId
                                ? calculateClubOverall(
                                    career
                                )
                                : Math.round(
                                    awayTeam.baseOvr
                                )
                        }
                    </span>

                </div>

            </div>


            <div class="match-probability">

                <div class="match-probability-top">

                    <span>
                        YOUR WIN PROBABILITY
                    </span>

                    <b>
                        ${Math.round(
                            winChance
                        )}%
                    </b>

                </div>


                <div
                    class="match-probability-bar"
                >

                    <i
                        style="
                            width:
                            ${Math.round(
                                winChance
                            )}%
                        "
                    ></i>

                </div>

            </div>


            <div
                class="match-feed"
                id="matchFeed"
            >
            </div>


            <div
                class="match-result"
                id="matchResult"
                style="display:none"
            >

                <div
                    class="match-result-title"
                    id="resultTitle"
                >
                    FULL TIME
                </div>


                <div
                    class="match-result-subtitle"
                    id="resultSubtitle"
                >
                </div>


                <div
                    style="
                        display:flex;
                        justify-content:center;
                        gap:7px;
                        flex-wrap:wrap;
                        margin-top:12px;
                    "
                >

                    <span
                        class="
                            status-chip
                            chip-blue
                        "
                    >
                        Poss
                        ${result.possessionHome} —
                        ${result.possessionAway}
                    </span>


                    <span
                        class="
                            status-chip
                            chip-blue
                        "
                    >
                        Shots
                        ${result.shotsHome} —
                        ${result.shotsAway}
                    </span>


                    <span
                        class="
                            status-chip
                            chip-blue
                        "
                    >
                        xG
                        ${result.xgHome.toFixed(1)}
                        —
                        ${result.xgAway.toFixed(1)}
                    </span>

                </div>


                <button
                    class="
                        btn
                        btn-primary
                        continue-match-btn
                    "
                    id="continueMatchBtn"
                >
                    Continue Career →
                </button>

            </div>

        `;


        const feed =
            $("matchFeed");


        const score =
            $("animatedScore");


        const status =
            $("metricStatus");


        const timeline =
            result.commentary.slice();


        let index =
            0;


        let animatedHomeGoals =
            0;


        let animatedAwayGoals =
            0;


        function nextCommentary() {

            if (
                index >=
                timeline.length
            ) {

                finishMatchday();

                return;
            }


            const event =
                timeline[
                    index++
                ];


            if (
                status
            ) {

                status.textContent =
                    `${event.minute}'`;
            }


            if (
                event.goal
            ) {

                if (
                    event.side ===
                    "home"
                ) {

                    animatedHomeGoals++;

                } else {

                    animatedAwayGoals++;
                }


                if (
                    score
                ) {

                    score.textContent =
                        `${animatedHomeGoals} — ${animatedAwayGoals}`;
                }


                content.classList.add(
                    "goal-flash"
                );


                setTimeout(
                    () =>
                        content.classList.remove(
                            "goal-flash"
                        ),
                    350
                );
            }


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                event.goal
                    ? "match-feed-item goal"
                    : "match-feed-item";


            row.textContent =
                `${event.minute}' · ${event.text}`;


            feed?.appendChild(
                row
            );


            if (
                feed
            ) {

                feed.scrollTop =
                    feed.scrollHeight;
            }


            state.matchTimer =
                setTimeout(
                    nextCommentary,
                    event.goal
                        ? 760
                        : 430
                );
        }


        function finishMatchday() {

            clearTimeout(
                state.matchTimer
            );


            if (
                score
            ) {

                score.textContent =
                    `${result.homeGoals} — ${result.awayGoals}`;
            }


            if (
                status
            ) {

                status.textContent =
                    "FULL TIME";
            }


            const matchResult =
                $("matchResult");


            const title =
                $("resultTitle");


            const subtitle =
                $("resultSubtitle");


            const userGoals =
                userIsHome
                    ? result.homeGoals
                    : result.awayGoals;


            const opponentGoals =
                userIsHome
                    ? result.awayGoals
                    : result.homeGoals;


            if (
                userGoals >
                opponentGoals
            ) {

                title.textContent =
                    "VICTORY";


                title.style.color =
                    "#4cf58a";


                subtitle.textContent =
                    `${career.club.name} take all three points.`;
                

                spawnConfetti();

            } else if (
                userGoals ===
                opponentGoals
            ) {

                title.textContent =
                    "DRAW";


                title.style.color =
                    "#f7ca69";


                subtitle.textContent =
                    `${career.club.name} share the points.`;

            } else {

                title.textContent =
                    "DEFEAT";


                title.style.color =
                    "#ff6175";


                subtitle.textContent =
                    `${career.club.name} leave without points.`;
            }


            if (
                matchResult
            ) {

                matchResult.style.display =
                    "block";
            }


            $("continueMatchBtn")
                ?.addEventListener(
                    "click",
                    closeMatchday
                );
        }


        nextCommentary();
    }


    function closeMatchday() {

        clearTimeout(
            state.matchTimer
        );


        const overlay =
            $("matchdayOverlay");


        if (
            overlay
        ) {

            overlay.classList.add(
                "hidden"
            );


            overlay.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        state.matchOpen =
            false;


        renderApp();
    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function spawnConfetti() {

        const overlay =
            $("matchdayOverlay");


        if (!overlay) {
            return;
        }


        for (
            let i = 0;
            i < 30;
            i++
        ) {

            const piece =
                document.createElement(
                    "span"
                );


            piece.style.position =
                "absolute";


            piece.style.zIndex =
                "3000";


            piece.style.left =
                `${randomInt(
                    10,
                    90
                )}%`;


            piece.style.top =
                "20%";


            piece.style.width =
                "5px";


            piece.style.height =
                "10px";


            piece.style.borderRadius =
                "2px";


            piece.style.background =
                i % 2 === 0
                    ? "#4cf58a"
                    : "#5d68f2";


            piece.style.transform =
                `rotate(${randomInt(
                    0,
                    360
                )}deg)`;


            piece.style.transition =
                `transform ${randomFloat(
                    1.2,
                    2.2
                )}s ease-out,
                 top ${randomFloat(
                    1.2,
                    2.2
                 )}s ease-out,
                 opacity 2s ease`;


            overlay.appendChild(
                piece
            );


            requestAnimationFrame(
                () => {

                    piece.style.top =
                        `${randomInt(
                            70,
                            110
                        )}%`;


                    piece.style.transform =
                        `translate(
                            ${randomInt(
                                -160,
                                160
                            )}px,
                            0
                        )
                        rotate(
                            ${randomInt(
                                180,
                                720
                            )}deg
                        )`;


                    piece.style.opacity =
                        "0";
                }
            );


            setTimeout(
                () =>
                    piece.remove(),
                2300
            );
        }
    }


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        bindGlobalEvents();

        updateStarterNote();

        renderSaveList();
    }


    init();

})();