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
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'openingTime',
      type: 'string',
      title: 'Opening Time and Closing Time',
    },
    {
      name: 'ownerProfileImage',
      type: 'image',
      title: 'Profile Image of the Cafe Owner',
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
      title: 'Latitude of the Cafe',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Cafe address',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
