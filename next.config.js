/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 
      'lh3.googleusercontent.com',
      'cdn.sanity.io',
      'localhost',
      'eesegbfsmcaaegodmaqt.supabase.co',
      'lowtech.ai',
      'dev.lowtech.ai',
      'pbs.twimg.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/apply',
        destination: 'https://fa30pr36w08.typeform.com/to/ZlCxzJnK',
        permanent: false,
      },
      {
        source: '/fellowship',
        destination: 'https://jackobrien.notion.site/AI-Researcher-Summer-Fellowship-non-technical-73cc164566094d4cb2870ba925620811',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/signin',
        permanent: true,
      },
      {
        source: '/blog/author',
        destination: '/blog/authors',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
