import { defineField, defineType } from 'sanity';

export const nonStartup = defineType({
	name: 'nonStartup',
	title: 'Non Startup',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
		}),
		defineField({
			name: 'author',
			type: 'reference',
			to: { type: 'author' },
		}),
		defineField({
			name: 'views',
			type: 'number',
		}),
		defineField({
			name: 'description',
			type: 'text',
		}),
		defineField({
			name: 'category',
			type: 'string',
			validation: (Rule) =>
				Rule.required().min(1).max(60).error('Please enter a category'),
		}),
		defineField({
			name: 'image',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'pitch',
			type: 'markdown',
		}),
	],
});
