export enum GroceryUnit {
	CUPS = 'cup(s)',
	FLUID_OUNCES = 'fl oz',
	OUNCES = 'oz',
	POUNDS = 'lb(s)',
	TABLESPOONS = 'tbsp',
	TEASPOONS = 'tsp',
	WHOLE = 'whole',
}

export enum GroceryStore {
	COSTCO = 'costco',
	SAFEWAY = 'safeway',
	TARGET = 'target',
}

export type GroceryItem = {
	amount: number;
	description?: string;
	name: string;
	unit: GroceryUnit;
};
