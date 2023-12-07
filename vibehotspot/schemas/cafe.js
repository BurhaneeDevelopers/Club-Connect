export default {
  name: 'cafe',
  title: 'Cafe',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Cafe Name',
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
      title: 'Hours',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Cafe',
    },
    {
      name: 'lat',
      type: 'string',
      title: 'Latitude of the Cafe',
    },
    {
      name: 'long',
      type: 'string',
      title: 'Longitude of the Cafe',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Cafe address',
      validation: (Rule) => Rule.required(),
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
  ],
}
