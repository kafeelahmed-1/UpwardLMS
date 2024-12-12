/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
     colors:
     {
      primary:'#182542',
      secondary:'#D2D5DA',
      success:'#3C7E44',
      successLight:'#4CA1540D',
      successBorder:'#4CA1544D',
      warning:'#F5D565',
      warningLight:'#F2C14B4D',
      warningBorder:'#F2C14B0D',
      error:'#CA3A31',
      errorLight:'#CA3A310D',
      errorBorder:'#CA3A314D',
      info:'#3662E3',
      infoLight:'#3662E30D',
      infoBorder:'#3662E34D',
      default:'#F3F4F6',
      textPrimary:'#121826',
      textSecondary:'#6C727F',
      textTertiary:'#9DA3AE',
      link:'#4E80EE',
      disabled:'#F3F4F6',
      accentGray30:'#4D55624D',
      accentGray:'#4D5562',
      successChip:'#4CA154',
      warningChip:'#CC7C2E',
  
     },
     fontSize:
     {
      'xs':'12px'
     }
    },
  },
  plugins: [],
}
/* 
'rgba(var(--color-success) , <alpha-value>)' */