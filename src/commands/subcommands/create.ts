/* eslint-disable unicorn/consistent-function-scoping */
import type { ChatInputCommandInteraction, InteractionResponse } from 'discord.js';
import { SlashCommandSubcommandBuilder } from 'discord.js';
import { RecordType } from '../../models/records.js';

export const createCommand = (recordType: RecordType): SlashCommandSubcommandBuilder =>
	new SlashCommandSubcommandBuilder().setName('create').setDescription(`Create a ${recordType}`);

export const createFunction = async (
	recordType: RecordType,
	interaction: ChatInputCommandInteraction,
): Promise<InteractionResponse<boolean>> => {
	switch (recordType) {
		case RecordType.GROCERY_LIST:
			return interaction.reply(`Created a ${recordType}`);
		default:
			return interaction.reply('ERROR: Not a valid record');
	}
};
