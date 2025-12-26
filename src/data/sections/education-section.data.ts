import type { EducationSection } from '@/types/sections/education-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { website } from '../helpers/links';

const educationSectionData = {
  config: {
    title: 'Education',
    slug: 'education',
    icon: 'fa6-solid:graduation-cap',
    visible: true,
  },
  diplomas: [
    {
      title: 'MS Data Science',
      institution: 'University of Naples Federico II',
      image: import('@/assets/logos/logo-unina.png'),
      dates: [new Date('2025.11'), null],
      description:
        'Courses: Software and Hardware, Data Visualization, Business Intelligence, Digital Marketing, Time Series Analysis & Forecasting.',
      links: [website({ url: 'https://www.unina.it/it/' })],
    },
    {
      title: 'BS Computer Science',
      institution: 'Mehran University of Engineering & Technology',
      image: import('@/assets/logos/muet-logo.png'),
      dates: [new Date('2019.12'), new Date('2023.12')],
      description:
        'Courses: Software and Hardware, Data Visualization, Business Intelligence, Digital Marketing, Time Series Analysis & Forecasting.',
      links: [website({ url: 'https://muet.edu.pk' })],
    },
  ],
} as const satisfies ReadonlyDeep<EducationSection>;

export default educationSectionData;
