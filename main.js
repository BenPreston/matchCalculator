console.log(data);

// obviously this needs to be replaced with dynamic capture
const homeTeam = "Chelsea LFC";
const awayTeam = "Manchester City WFC";

// DATA STORAGE

// Logs the detail of what each player has done
// Has a limitation in my view in that for example unsuccessful passes don't seem to be recorded.
// Also probably should have factored in the follows_dribble from shooting
const playerEventTally = {};

const shots = [];
const types = [];

// Creates events with players like the player event tally
const calcEventWithPlayer = (event) => {
  // Don't need both of these long term
  if (event.type.name === "Error") shots.push(event);
  types.push(event.type.name);
  // Delete two above

  if (event.player && event.player.name && event.type && event.type.name) {
    const player = event["player"]["name"];
    const type = event["type"]["name"];

    if (!playerEventTally[player]) playerEventTally[player] = {};
    if (!playerEventTally[player]["team"])
      playerEventTally[player]["team"] = event["team"]["name"];
    if (!playerEventTally["position"])
      playerEventTally[player]["position"] = event["position"]["name"];

    playerEventTally[player][type] >= 0
      ? (playerEventTally[player][type] += 1)
      : (playerEventTally[player][type] = 1);
  }
};

const addToEventTally = (
  typeOfEvent,
  player,
  secondLevelTitle,
  secondLevelSelector
) => {
  if (
    typeOfEvent[secondLevelSelector] &&
    typeOfEvent[secondLevelSelector]["name"]
  ) {
    playerEventTally[player][secondLevelTitle][secondLevelSelector][
      typeOfEvent[secondLevelSelector].name
    ]
      ? (playerEventTally[player][secondLevelTitle][secondLevelSelector][
          typeOfEvent[secondLevelSelector].name
        ] += 1)
      : (playerEventTally[player][secondLevelTitle][secondLevelSelector][
          typeOfEvent[secondLevelSelector].name
        ] = 1);
  }
};

// This function creates and second tier fields (e.g shot, pass detail) and then calls the addToEventTally function to add them
const calcSecondTierData = (
  event,
  typeOfDetail,
  typeOfEventValue,
  SecondTierValues,
  distanceOrScoreSum
) => {
  if (event.player && event.player.name && event[typeOfEventValue]) {
    const player = event["player"]["name"];
    const typeOfEvent = event[typeOfEventValue];

    if (!playerEventTally[player][typeOfDetail])
      playerEventTally[player][typeOfDetail] = SecondTierValues;

    const lenOf2ndTierVals = Object.keys(SecondTierValues).length;

    for (let i = 0; i < lenOf2ndTierVals; i++) {
      addToEventTally(
        typeOfEvent,
        player,
        typeOfDetail,
        Object.keys(SecondTierValues)[i]
      );
    }

    if (typeOfEvent[distanceOrScoreSum]) {
      playerEventTally[player][typeOfDetail][`total_${distanceOrScoreSum}`]
        ? (playerEventTally[player][typeOfDetail][
            `total_${distanceOrScoreSum}`
          ] += typeOfEvent[distanceOrScoreSum])
        : (playerEventTally[player][typeOfDetail][
            `total_${distanceOrScoreSum}`
          ] = typeOfEvent[distanceOrScoreSum]);
    }
  }
};

const makeMatchData = () => {
  data.map((event) => {
    const type = event["type"]["name"];

    calcEventWithPlayer(event);
    calcSecondTierData(
      event,
      "pass_detail",
      "pass",
      {
        body_part: {},
        height: {},
        recipient: {},
      },
      "length"
    );

    calcSecondTierData(
      event,
      "shot_detail",
      "shot",
      {
        body_part: {},
        outcome: {},
        technique: {},
      },
      "statsbomb_xg"
    );
  });
};

makeMatchData();

console.log(playerEventTally);

console.log(shots);
console.log(new Set(types));
