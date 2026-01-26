/**
 * Page-specific data configuration
 * Separates content from structure for better maintainability
 */

const PAGE_DATA = {
  home: {
    hero: {
      badge: 'Premium Digital Agency',
      title: 'Growing <br>Digital Futures.',
      description: 'We blend code and creativity to engineer the future of web experiences.',
      backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
      buttons: [
        {
          href: 'contact_us.html',
          text: 'Start a Project →',
          style: 'padding: 16px 32px; border-radius: 14px;'
        },
        {
          href: 'case_studies.html',
          text: 'View Case Studies',
          style: 'background: rgba(255,255,255,0.05); box-shadow: none; border: 1px solid var(--card-border);'
        }
      ]
    },
    stats: [
      {
        icon: '🚀',
        label: 'PROJECTS SHIPPED',
        value: '5+',
        subtext: '+12% YoY',
        type: 'progress'
      },
      {
        icon: '🔄',
        label: 'UPTIME GUARANTEE',
        value: '99.9%',
        type: 'uptime'
      }
    ],
    services: [
      {
        icon: '&lt;/&gt;',
        title: 'Custom Software',
        description: 'Tailored engineering for complex problems.',
        iconColor: '#3b82f6'
      },
      {
        icon: '☁️',
        title: 'Cloud Infra',
        description: 'Scalable, secure, and resilient architecture.',
        iconColor: '#a855f7'
      },
      {
        icon: '📱',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile solutions.',
        iconColor: '#3b82f6'
      },
      {
        icon: '🎨',
        title: 'Graphic Design',
        description: 'Immersive experiences that convert.',
        iconColor: '#10b981'
      }
    ],
    culture: {
      title: 'Our Culture',
      description: 'Built on transparency, fueled by caffeine, and driven by innovation.',
      buttonText: 'Join the Team',
      images: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=60'
      ]
    },
    cta: {
      title: 'Ready to Innovate?',
      description: "Let's build something extraordinary together.",
      placeholder: 'Enter your email',
      buttonText: 'Get Started'
    },
    trustedBy: {
      label: 'TRUSTED BY',
      companies: ['Acme Corp', 'GlobalTech', 'Nebula', 'FoxRun', 'Circle.io', 'Vertigo']
    },
    innovators: {
      innovators: [
        {
          name: 'Priyanka Fulwari',
          role: 'Co-founder',
          linkedin: 'https://www.linkedin.com/in/priyanka-fulwari/',
          image: 'https://media.licdn.com/dms/image/v2/D5603AQFC-rb5rn9eKA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728546399479?e=1770854400&v=beta&t=w3QES5W0Xyl_OXCeeTvbt5fhLawpdhTmT0J8Vk5sP60' // Example: 'https://media.licdn.com/dms/image/...'
        },
        {
          name: 'Jaypalsinh Barad',
          role: 'Co-founder',
          linkedin: 'https://www.linkedin.com/in/jdbarad/',
          image: 'https://media.licdn.com/dms/image/v2/D4D03AQF9CDcJNf4mMA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1692151906095?e=1770854400&v=beta&t=WWuDwpJr49_dvyVgphmjWkYlri0XCwFKtKjEzznpARw' // Example: 'https://media.licdn.com/dms/image/...'
        }
      ]
    }
  }
};

