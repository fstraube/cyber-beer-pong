import models from './../models/index.js';
const { Team, Match } = models;

import answers from './../answers/index.js';
const { answerError, embedAnswer } = answers;

import roundRobin from 'roundrobin';

export default {
	name: 'round-robin',
	aliasses: ['rr'],
	description: 'Create rounds for every group A | B',
	execute: async (message) => {

		const groupA = await Team.find({ group: 'A' });
		const groupB = await Team.find({ group: 'B' });

		const teamsA = groupA.map(team => team.name);
		const teamsB = groupB.map(team => team.name);

		const roundsA = roundRobin(teamsA.length, teamsA);
		const roundsB = roundRobin(teamsA.length, teamsB);


		roundsA.forEach(round => round.forEach((match, index) => Match.create({
			group: 'A',
			round: index + 1,
			homeTeam: match[0],
			awayTeam: match[1],
		})));

		roundsB.forEach((round, index) => round.forEach((match) => Match.create({
			group: 'B',
			round: index + 1,
			homeTeam: match[0],
			awayTeam: match[1],
		})));

		try {
			await message.channel.send(embedAnswer('rounds', { group: 'A', rounds: roundsA }));
			await message.channel.send(embedAnswer('rounds', { group: 'B', rounds: roundsB }));
		}
		catch (error) {
			return message.reply(answerError('roundRobin', error));
		}
	},
};