export default {
  name: 'hotspot',
  title: 'Hotspot',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Hotspot Name',
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
      title: 'Image of the Hotspot',
    },
    {
      name: 'lat',
      type: 'string',
      title: 'Latitude of the Hotspot',
    },
    {
      name: 'long',
      type: 'string',
      title: 'Longitude of the Hotspot',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Hotspot address',
    },
    {
      name: 'city',
      type: 'string',
      title: 'City of the Hotspot',
    },
    {
      name: 'state',
      type: 'string',
      title: 'State of the Hotspot',
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
