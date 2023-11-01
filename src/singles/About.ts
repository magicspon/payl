import { GlobalConfig } from 'payload/types'

const About: GlobalConfig = {
  slug: 'about',
  admin: {
    group: 'singles',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
    },
  ],
}

export default About
