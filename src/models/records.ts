import type { GroceryItem, GroceryStore } from './grocery.js';

export enum RecordType {
	EVENT = 'event',
	GROCERY_LIST = 'grocery list',
	RECIPE = 'recipe',
}

type BaseRecord<TRecordType = RecordType> = {
	name: string;
	type: TRecordType;
};

type GroceryListRecord = {
	groceries: GroceryItem[];
	store: GroceryStore;
};

type RecipeRecord = {
	cookTime: number;
	ingredients: string[];
	instructions: string;
};

type EventRecord = {
	date: Date;
	guestCount: number;
};

export type RecordObject<TRecordType = RecordType> = TRecordType extends RecordType.GROCERY_LIST
	? BaseRecord<TRecordType> & GroceryListRecord
	: TRecordType extends RecordType.RECIPE
		? BaseRecord<TRecordType> & RecipeRecord
		: TRecordType extends RecordType.EVENT
			? BaseRecord<TRecordType> & EventRecord
			: never;
