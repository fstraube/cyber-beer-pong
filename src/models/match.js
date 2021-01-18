import mongoose from 'mongoose';

export const matchSchema = new mongoose.Schema({
	group: String,
	round: Number,
	home_team: String,
	away_team: String,
	cups: Number,
	winner: String,
	wabs: Number,
	loser: String,
	labs: Number,
}, { unique: true, timestamp: true });

matchSchema.statics.create = async (data) => {
	try {
		const newMatch = new Match(data);
		const match = newMatch.save();
		return match;
	}
	catch (error) {
		throw new Error(error);
	}
};

const Match = mongoose.model('Match', matchSchema);

export default Match;