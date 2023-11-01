import { CollectionConfig } from 'payload/types'
import { RichText } from '../fields/RichText'
import { slugField } from '../fields/slugField'
import { populatePublishedDate } from '../utils/populatePublishedDate'
import { populateSlugField } from '../utils/populateSlugField'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    plural: 'Pages',
    singular: 'Page',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },

  hooks: {
    afterChange: [],
    afterRead: [],
    beforeChange: [populatePublishedDate, populateSlugField],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    slugField('title'),
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'textarea',
      name: 'excerpt',
    },
    {
      type: 'text',
      name: 'blurb',
    },
    {
      type: 'richText',
      name: 'content',
      editor: RichText,
    },
  ],
}

export default Pages
