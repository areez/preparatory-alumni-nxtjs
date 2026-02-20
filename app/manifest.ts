import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Preparatory Alumni Association',
    short_name: 'PAA',
    description: 'The official alumni association of Mohammadpur Preparatory School & College.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d11d1d', // PAA Red/Primary
    icons: [
      {
        src: '/assets/logo.png', // Assuming this exists, ideally need specific sizes
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}