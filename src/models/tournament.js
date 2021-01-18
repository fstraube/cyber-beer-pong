import mongoose from 'mongoose';

export const tournamentSchema = new mongoose.Schema({
	name: {
		type: String, unique: true,
	},
	teams_count: Number,
	teams: {
		type: Array, default: [],
	},
	groups_count: Number,
}, { timestamp: true });

tournamentSchema.statics.createTournament = async (data) => {
	try {
		const newTournament = new Tournament(data);
		const tournament = await newTournament.save();
		return tournament;
	}
	catch (error) {
		throw new Error(error);
	}
};

tournamentSchema.statics.updateTournament = async (name, updateData) => {
	try {
		const updatedTournament = await Tournament.updateOne(name, updateData);
		return updatedTournament;
	}
	catch (error) {
		throw new Error(error);
	}
};

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;