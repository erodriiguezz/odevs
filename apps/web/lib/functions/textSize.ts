const sizeMap: Record<string, number> = {
  'text-xs': 16,
  'text-sm': 20,
  'text-base': 24,
  'text-lg': 28,
  'text-xl': 28,
  'text-2xl': 32,
  'text-3xl': 36,
  'text-4xl': 40,
  'text-5xl': 48,
  'text-6xl': 60,
  'text-7xl': 72,
  'text-8xl': 96,
  'text-9xl': 128,
};

export default (tailwindClass: string) => {
  const arbitraryMatch = tailwindClass.match(/text-\[(\d+\.?\d*)(px|rem|em)\]/);
  
  return arbitraryMatch ? parseFloat(arbitraryMatch[1])*(arbitraryMatch[2] === 'px' ? 1 : 16) : sizeMap[tailwindClass] || 16;
}