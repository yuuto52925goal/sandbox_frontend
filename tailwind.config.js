/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
      // Add any other paths to your templates here
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          surface: 'var(--surface)',
          'accent-primary': 'var(--accent-primary)',
          'accent-secondary': 'var(--accent-secondary)',
          'accent-tertiary': 'var(--accent-tertiary)',
          'text-primary': 'var(--text-primary)',
        },
      },
    },
    plugins: [],
  }
  