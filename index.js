const { people, teams } = require("./data");
const fs = require("fs");
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sliceIntoChunks(people, teams) {
  const team = {};
  const teamsCount = teams.length;
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const floored = Math.floor(i % teamsCount);
    const their_team = teams[floored];

    if (their_team in team) {
      team[their_team].push(person);
    } else {
      team[their_team] = [person];
    }
  }
  return team;
}

const shuffled = shuffleArray(people);
const chunks = sliceIntoChunks(shuffled, teams);
fs.writeFileSync("sovtech-world-cup-draw.json", JSON.stringify(chunks));
