// Content Management System for Chamankar Group Website

export const getDefaultContent = () => {
  return {
    hero: {
      title: 'Building Dreams, Creating Landmarks',
      subtitle: 'A trusted name in construction for over 25 years',
      description: 'M/s CHAMANKAR GROUP is a reputed & trusted name in the construction industry. Over the years, we have been the pioneering force behind the rapidly changing skyline of Mumbai, with developments that span the residential, retail, commercial & Government sectors.'
    },
    whyChoose: [
      {
        id: 1,
        icon: '🏆',
        title: '25+ Years',
        description: 'Of Excellence in Construction'
      },
      {
        id: 2,
        icon: '🏗️',
        title: 'Quality',
        description: 'World-class Infrastructure'
      },
      {
        id: 3,
        icon: '✨',
        title: 'Innovation',
        description: 'Setting New Trends'
      },
      {
        id: 4,
        icon: '🤝',
        title: 'Trust',
        description: 'Reputed & Reliable'
      }
    ],
    about: {
      intro: 'M/s CHAMANKAR GROUP is a reputed & trusted name in the construction industry since more than 25 years. Over the years, the company has been the pioneering force behind the rapidly changing skyline of Mumbai, with developments that span the residential, retail, commercial & Government sectors.',
      vision: {
        title: 'Our Vision',
        paragraphs: [
          'Aspiring for world class living standards and contemporary work places come within reach of all. We at CHAMANKAR GROUP expand horizons, link people and organizations, set up new trends, and continually enhance the values entrusted to our care.',
          'Our aim is setting up of comfortable and luxurious dwelling spheres that impeccably match world class infrastructures. We aspire to create establishments that give our customers the joy of owning a paradise.',
          'Our true satisfaction comes through a million smiles of our customers we have generated over the years. The benchmarks set by Chamankar Group in residential as well as commercial estate development have been extraordinary, and we continually aspire to beat our own standards, raising them to a new level.',
          'We create infrastructure which is a perfect blend of beauty and strength. At the core the idea still remains to provide a world class experience to our ever valued customers.'
        ]
      },
      values: [
        {
          id: 1,
          icon: '🎯',
          title: 'Excellence',
          description: 'Committed to delivering exceptional quality in every project we undertake.'
        },
        {
          id: 2,
          icon: '💡',
          title: 'Innovation',
          description: 'Pioneering new trends and expanding horizons in construction.'
        },
        {
          id: 3,
          icon: '🤝',
          title: 'Trust',
          description: 'Building lasting relationships based on reliability and integrity.'
        },
        {
          id: 4,
          icon: '😊',
          title: 'Customer Satisfaction',
          description: 'Your happiness is our true success measure.'
        }
      ],
      expertise: [
        {
          id: 1,
          icon: '🏘️',
          title: 'Residential',
          description: 'Creating luxurious living spaces that become perfect homes for families.'
        },
        {
          id: 2,
          icon: '🏢',
          title: 'Commercial',
          description: 'Developing modern workspaces that inspire productivity and success.'
        },
        {
          id: 3,
          icon: '🏛️',
          title: 'Government',
          description: 'Delivering prestigious government projects with architectural excellence.'
        }
      ]
    }
  }
}

export const loadContent = () => {
  const stored = localStorage.getItem('chamankarContent')
  if (stored) {
    return JSON.parse(stored)
  } else {
    const defaultContent = getDefaultContent()
    localStorage.setItem('chamankarContent', JSON.stringify(defaultContent))
    return defaultContent
  }
}

export const saveContent = (content) => {
  localStorage.setItem('chamankarContent', JSON.stringify(content))
}
