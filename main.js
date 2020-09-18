console.log(data);

// obviously this needs to be replaced with dynamic capture
const homeTeam = "Chelsea LFC";
const awayTeam = "Manchester City WFC";

// DATA STORAGE

// Logs the detail of what each player has done
// Has a limitation in my view in that for example unsuccessful passes don't seem to be recorded
const playerEventTally = {};

const shots = [];

// Can be used to calculate a specific match event. May not be useful as evolved the modle
const calcMatchEvent = (team, homeOrAway, eventType, playPattern) => {
  if (team === homeOrAway) {
    eventType[playPattern] >= 0
      ? eventType[playPattern]++
      : (eventType[playPattern] = 1);
  }
};

// Creates events with players like the player event tally
const calcEventWithPlayer = (event) => {
  if (event.type.name === "Shot") shots.push(event);

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

// Creates pass (and ideally other detail) based on each player
const calcPlayerPassDetail = (event) => {
  if (event.player && event.player.name && event.pass) {
    const player = event["player"]["name"];
    const pass = event["pass"];

    if (!playerEventTally[player]["pass_detail"])
      playerEventTally[player]["pass_detail"] = {
        body_part: {},
        height: {},
        recipient: {},
        total_length: 0,
      };

    if (pass["body_part"] && pass["body_part"]["name"]) {
      playerEventTally[player]["pass_detail"]["body_part"][pass.body_part.name]
        ? (playerEventTally[player]["pass_detail"]["body_part"][
            pass.body_part.name
          ] += 1)
        : (playerEventTally[player]["pass_detail"]["body_part"][
            pass.body_part.name
          ] = 1);
    }

    if (pass["height"] && pass["height"]["name"]) {
      playerEventTally[player]["pass_detail"]["height"][pass.height.name]
        ? (playerEventTally[player]["pass_detail"]["height"][
            pass.height.name
          ] += 1)
        : (playerEventTally[player]["pass_detail"]["height"][
            pass.height.name
          ] = 1);
    }

    if (pass["recipient"] && pass["recipient"]["name"]) {
      playerEventTally[player]["pass_detail"]["recipient"][pass.recipient.name]
        ? (playerEventTally[player]["pass_detail"]["recipient"][
            pass.recipient.name
          ] += 1)
        : (playerEventTally[player]["pass_detail"]["recipient"][
            pass.recipient.name
          ] = 1);
    }

    if (pass["length"]) {
      playerEventTally[player]["pass_detail"]["total_length"] += pass["length"];
    }
  }
};

const makeMatchData = () => {
  data.map((event) => {
    const type = event["type"]["name"];

    calcEventWithPlayer(event);
    calcPlayerPassDetail(event);
  });
};

makeMatchData();

console.log(playerEventTally);

console.log(shots[0].shot);
