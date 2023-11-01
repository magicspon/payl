import path from 'path'

import nestedDocs from '@payloadcms/plugin-nested-docs'
import seo from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
// import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Home from './singles/Home'
import Seo from './globals/Seo'
import About from './singles/About'
import Pages from './collections/Pages'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  collections: [Pages, Users],
  globals: [Home, About, Seo],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },

  plugins: [
    nestedDocs({
      collections: ['pages'],
      // @ts-ignore this is fine
      generateLabel: (_, doc) => doc?.title ?? '',
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seo({
      globals: ['about'],
      collections: ['pages'],
      // @ts-ignore this is fine
      generateTitle: ({ doc }) => `Hello | ${doc?.title?.value}`,
      generateDescription: ({ doc }) => {
        // @ts-ignore this is fine
        return doc?.excerpt?.value ?? ''
      },
      generateURL: ({ doc }) => {
        // const d = doc

        return ''
      },
      tabbedUI: false,
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
