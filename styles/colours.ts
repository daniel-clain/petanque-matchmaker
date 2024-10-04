export const baseColours = {
  blue: '#8dd0fa55',
  red: '#88d1ffaa',
}
export const presetColors = {
  button: {
    base: baseColours.red,
    pressed: adjustSaturation(baseColours.blue, 50),
    disbled: adjustSaturation(baseColours.blue, -4),
  },
}

console.log('presetColors', presetColors.button.pressed)
/**
 * Adjusts the saturation of a hex color based on the input number.
 * @param {string} hex - The 6-character hex color (e.g., '#ff0000').
 * @param {number} num - The number to adjust saturation (positive for more saturation, negative for less).
 * @returns {string} - The adjusted hex color in the format '#RRGGBB'.
 */
function adjustSaturation(hex: string, num: number): string {
  // Function to convert hex to HSL
  const hexToHsl = (h: string) => {
    let r = parseInt(h.slice(1, 3), 16) / 255
    let g = parseInt(h.slice(3, 5), 16) / 255
    let b = parseInt(h.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2 // Calculate lightness
    let hsl = { h: 0, s: 0, l }

    if (max === min) {
      hsl.h = 0 // achromatic
    } else {
      const d = max - min
      hsl.s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          hsl.h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          hsl.h = (b - r) / d + 2
          break
        case b:
          hsl.h = (r - g) / d + 4
          break
      }
      hsl.h /= 6 // Normalize to [0, 1]
    }
    return hsl
  }

  // Function to convert HSL back to hex
  const hslToHex = (h: number, s: number, l: number): string => {
    let r: number, g: number, b: number
    if (s === 0) {
      r = g = b = l // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    // Ensure output is in 6-character hex format
    return `#${(
      (1 << 24) +
      (Math.round(r * 255) << 16) +
      (Math.round(g * 255) << 8) +
      Math.round(b * 255)
    )
      .toString(16)
      .padStart(6, '0')
      .slice(-6)}` // Ensure it is always 6 characters
  }

  // Convert hex to HSL
  const hsl = hexToHsl(hex)

  // Adjust saturation significantly by scaling the effect
  const saturationChange = Math.max(-1, Math.min(1, num * 0.5)) // Clamp between -1 and 1; adjust for sensitivity
  hsl.s = Math.min(Math.max(hsl.s + saturationChange, 0), 1) // Clamp between 0 and 1

  // Convert back to hex and return
  return hslToHex(hsl.h, hsl.s, hsl.l)
}
