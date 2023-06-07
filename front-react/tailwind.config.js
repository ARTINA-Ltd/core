module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  
    theme: {
      fontFamily: {
        'b1': ['KalamehThin', 'system-ui'],
        'b2': ['KalamehExtraLight', 'system-ui'],
        'b3': ['KalamehLight', 'system-ui'],
        'b4': ['KalamehRegular', 'system-ui'],
        'b5': ['KalamehMedium', 'system-ui'],
        'b6': ['KalamehSemiBold', 'system-ui'],
        'b7': ['KalamehBold', 'system-ui'],
        'b8': ['KalamehExtraBold', 'system-ui'],
        'b9': ['KalamehBlack', 'system-ui'],
        
        
      },
      screens: {
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '767px'},

        'mdrev': {'min': '768px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '500px'},
        // => @media (max-width: 639px) { ... }
      },
  },
}
