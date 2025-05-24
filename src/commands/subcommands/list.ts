/* eslint-disable unicorn/consistent-function-scoping */
import type { ChatInputCommandInteraction, InteractionResponse } from 'discord.js';
import { SlashCommandSubcommandBuilder } from 'discord.js';
import { RecordType } from '../../models/records.js';

export const listCommand = (recordType: RecordType): SlashCommandSubcommandBuilder =>
	new SlashCommandSubcommandBuilder().setName('list').setDescription(`List current ${recordType}s`);

export const listFunction = async (
	recordType: RecordType,
	interaction: ChatInputCommandInteraction,
): Promise<InteractionResponse<boolean>> => {
	switch (recordType) {
		case RecordType.GROCERY_LIST:
			return interaction.reply(`List ${recordType}`);
		default:
			return interaction.reply('ERROR: Not a valid record');
	}
};
