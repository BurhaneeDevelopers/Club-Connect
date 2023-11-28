export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
    },
    {
      name: 'openingTime',
      type: 'string',
      title: 'Hours:',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Restaurant',
    },
    {
      name: 'lat',
      type: 'string',
      title: 'Latitude of the restaurant',
    },
    {
      name: 'long',
      type: 'string',
      title: 'Longitude of the restaurant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
    },
    {
      name: 'city',
      type: 'string',
      title: 'City of the Restaurant',
    },
    {
      name: 'state',
      type: 'string',
      title: 'State of the Restaurant',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter Rating from 1 to 5',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please enter a value between 1 to 5'),
    },
    {
      name: 'type',
      type: 'reference',
      title: 'Category',
      to: [{type: 'category'}],
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },
  ],
}
