export default {
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured category name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'hotspots',
      type: 'array',
      title: 'Hotspots List',
      of: [{type: 'reference', to: [{type: 'hotspot'}]}],
    },
    {
      name: 'cafes',
      type: 'array',
      title: 'Cafe List',
      of: [{type: 'reference', to: [{type: 'cafe'}]}],
    },
    {
      name: 'featuredId',
      type: 'string',
      title: 'Featured Id',
    },
  ],
}
