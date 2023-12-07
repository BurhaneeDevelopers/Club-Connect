export default {
  name: 'lounge',
  title: 'Lounge',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Lounge Name',
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
      title: 'Image of the Lounge',
    },
    {
      name: 'lat',
      type: 'string',
      title: 'Latitude of the Lounge',
    },
    {
      name: 'long',
      type: 'string',
      title: 'Longitude of the Lounge',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Lounge address',
    },
    {
      name: 'city',
      type: 'string',
      title: 'City of the Lounge',
    },
    {
      name: 'state',
      type: 'string',
      title: 'State of the Lounge',
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
  ],
}
