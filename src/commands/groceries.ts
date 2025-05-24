/* eslint-disable unicorn/no-unused-properties */
import type { ChatInputCommandInteraction, InteractionResponse } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import type { GroceryItem } from '../models/grocery.js';
import { GroceryUnit } from '../models/grocery.js';
import { RecordType } from '../models/records.js';
import { createCommand, createFunction } from './subcommands/create.js';
import { listCommand, listFunction } from './subcommands/index.js';
import type { Command } from './index.js';

export const addCommand: SlashCommandSubcommandBuilder = new SlashCommandSubcommandBuilder()
	.setName('add')
	.setDescription(`Add an item to a grocery list`)
	.addStringOption((option) =>
		option.setName('listName').setDescription('Name of the list you wish to add to').setRequired(true),
	)
	.addStringOption((option) =>
		option.setName('itemName').setDescription('Name of the item you wish to add').setRequired(true),
	)
	.addNumberOption((option) =>
		option.setName('itemAmount').setDescription('Amount of the item you wish to add').setRequired(true),
	);

export const addFunction = async (interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> => {
	const listName = interaction.options.getString('listName', true);
	const item: GroceryItem = {
		name: interaction.options.getString('itemName', true),
		amount: interaction.options.getNumber('itemAmount', true),
		unit: GroceryUnit.POUNDS,
	};
	return interaction.reply(`added ${item.name} to ${listName}`);
};

export default {
	data: new SlashCommandBuilder()
		.setName('groceries')
		.setDescription('People be shopping (for food).')
		.addSubcommand(listCommand(RecordType.GROCERY_LIST))
		.addSubcommand(createCommand(RecordType.GROCERY_LIST))
		.addSubcommand(addCommand)
		.toJSON(),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand(false);
		switch (subcommand) {
			case 'list':
				await listFunction(RecordType.GROCERY_LIST, interaction);
				break;
			case 'create':
				await createFunction(RecordType.GROCERY_LIST, interaction);
				break;
			case 'add':
				await addFunction(interaction);
				break;
			default:
				break;
		}
	},
} satisfies Command;
