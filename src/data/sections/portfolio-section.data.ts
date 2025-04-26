import type { PortfolioSection } from '@/types/sections/portfolio-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { demo, github, mockups, website } from '../helpers/links';
import { css, html, javascript, nextJs, php, prettier, react, sql, strapi, tailwindCss } from '../helpers/skills';

const portfolioSectionData = {
  config: {
    title: 'Projects',
    slug: 'projects',
    icon: 'fa6-solid:rocket',
    visible: true,
    screenshots: {
      title: 'Screenshots',
      icon: 'fa6-solid:images',
    },
  },
  projects: [
    {
      name: 'Kava Up LLC Website',
      image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2024-02'), new Date('2024-03')],
      details: [
        { label: 'Team size', value: '3 person' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'Kava Up LLC' },
        { label: 'Category', value: ['Company Website'] },
      ],
      pdfDetails: [{ label: 'Demo', value: 'https://kavaup.io/', url: 'https://kavaup.io/' }],
      screenshots: [{ src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' }],
      description:
        'I created a company website for Kava Up LLC, a company that specializes in providing high-quality products and services.',
      tagsList: {
        title: 'Technologies',
        tags: [nextJs(), react(), tailwindCss(), strapi(), prettier()],
      },
      links: [website({ url: 'https://kavaup.io/' })],
    },
    {
      name: 'Melo Music Player',
      image: import('@/assets/portfolio/project-2.jpeg'),
      dates: [new Date('2022-11'), new Date('2022-11')],
      details: [
        { label: 'Team size', value: 'Me' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'Fiverr Client' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [
        { label: 'Demo', value: 'https://melo-music.orgfree.com/', url: 'https://melo-music.orgfree.com/' },
        {
          label: 'Repository',
          value: 'https://github.com/vishaltalreja01/melomusicplayer',
          url: 'https://github.com/vishaltalreja01/melomusicplayer',
        },
      ],
      description:
        'Ut ultricies tortor at sodales aliquam. Vivamus metus ante, fringilla nec ligula in, suscipit rhoncus mauris. Praesent hendrerit velit odio, at accumsan urna faucibus convallis.',
      tagsList: {
        title: 'Technologies',
        tags: [html(), css(), javascript()],
      },
      links: [
        website({ url: 'https://melo-music.orgfree.com/' }),
        github({ url: 'https://github.com/vishaltalreja01/melomusicplayer' }),
      ],
    },
    {
      name: 'UHQ Logs (E-Commerce Website)',
      image: import('@/assets/portfolio/project-3.jpeg'),
      dates: [new Date('2023-01'), new Date('2023-02')],
      details: [
        { label: 'Team size', value: 'Me' },
        { label: 'My role', value: ['Full Stack Developer'] },
        { label: 'Company', value: 'Fiverr Client' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [
        { label: 'Demo', value: 'https://uhqlogs.orgfree.com/', url: 'https://uhqlogs.orgfree.com/' },
        {
          label: 'Repository',
          value: 'https://github.com/vishaltalreja01/UHQLogs-E-Commerce-Website',
          url: 'https://github.com/vishaltalreja01/UHQLogs-E-Commerce-Website',
        },
      ],
      screenshots: [{ src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' }],
      description:
        'Created a scalable e-commerce platform with 100+ products, implementing secure payment integrations with Coinbase.',
      tagsList: {
        title: 'Technologies',
        tags: [php(), html(), css(), javascript(), sql()],
      },
      links: [
        website({ url: 'https://uhqlogs.orgfree.com/' }),
        github({ url: 'https://github.com/vishaltalreja01/UHQLogs-E-Commerce-Website' }),
      ],
    },
  ],
} as const satisfies ReadonlyDeep<PortfolioSection>;

export default portfolioSectionData;
