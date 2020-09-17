console.log(data);

// obviously this needs to be replaced with dynamic capture
const homeTeam = "Chelsea LFC";
const awayTeam = "Manchester City WFC";

// Data stored here

// 1. When event happened and who had it to detemine flow of the game
const homeTeamMins = {};
const awayTeamMins = {};

const calcTeamMins = (team, homeOrAway) => {};

// Patern Data to determine where play comes from
const homeTeamPlayPatt = {};
const awayTeamPlayPatt = {};

const calcPlayPattern = (team, homeOrAway, eventType, playPattern) => {
  if (team === homeOrAway) {
    eventType[playPattern] >= 0
      ? eventType[playPattern]++
      : (eventType[playPattern] = 1);
  }
};

const makeMatchData = () => {
  data.map((event) => {
    const team = event["possession_team"]["name"];

    const minutes = event["minute"];
    const playPattern = event["play_pattern"]["name"];

    // Minutes calculator
    calcPlayPattern(team, homeTeam, homeTeamMins, minutes);
    calcPlayPattern(team, awayTeam, awayTeamMins, minutes);

    calcPlayPattern(team, homeTeam, homeTeamPlayPatt, playPattern);
    calcPlayPattern(team, awayTeam, awayTeamPlayPatt, playPattern);
  });
};

makeMatchData();

console.log(homeTeamMins);
console.log(awayTeamMins);

// console.log(homeTeamPlayPatt);
// console.log(awayTeamPlayPatt);

//
