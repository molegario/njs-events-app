const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'olegario-nextjs-projects-bucket.s3.ca-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ]
  }

}
 
module.exports = nextConfig