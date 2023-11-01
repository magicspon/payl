import { CollectionConfig } from 'payload/types'
import { RichText } from '../fields/RichText'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    plural: 'Users',
    singular: 'user',
  },
  admin: {
    useAsTitle: 'email',
    group: 'settings',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
    },
    {
      type: 'richText',
      name: 'bio',
      editor: RichText,
    },
  ],
}

export default Users
