module.exports = {
  siteMetadata: {
    title: `WELCOME TO MY-ISLAM`,
    description: `Litle website that give you local prayer time, and for the rest of the day.`,
    author: `@Suraj Abubakar`,
    siteUrl: `https://www.MY-ISLAM.hmounir.com`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-static-folders',
      options: {
        folders: ['./static'],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-styled-components-dark-mode`,
      options: {
        light: {
          secondaryColor: '#FFFAFA',
          primaryColor: '#06c2e3',
          textColor: '#071f2d',
          onBackgroundTextColor: '#FFFAFA',
          backgroundTextColor: '#1E2A31',
        },
        dark: {
          secondaryColor: '#022120',
          primaryColor: '#06c2e3',
          textColor: '#FFFAFA',
          onBackgroundTextColor: '#FFFAFA',
          backgroundTextColor: '#000000',
        },
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `UA-157838187-3`,
        head: false,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MY-ISLAM`,
        short_name: `MY-ISLAM`,
        description: `Awesome website that give you local prayer time, and for the rest of the day.`,
        lang: `en`,
        display: `standalone`,
        start_url: `/`,
        background_color: `#45C569`,
        theme_color: `#45C569`,
        icon: `src/images/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
