// helpers/colorPresets.ts

export const colorPresets = {
    EMBER: [
      { color_hex: "#FF4500", color_weight: 0.4 },
      { color_hex: "#FFA500", color_weight: 0.3 },
      { color_hex: "#FFD700", color_weight: 0.2 },
      { color_hex: "#8B0000", color_weight: 0.1 },
    ],
    FRESH: [
      { color_hex: "#00FF7F", color_weight: 0.4 },
      { color_hex: "#98FB98", color_weight: 0.3 },
      { color_hex: "#00FA9A", color_weight: 0.2 },
      { color_hex: "#3CB371", color_weight: 0.1 },
    ],
    JUNGLE: [
      { color_hex: "#228B22", color_weight: 0.4 },
      { color_hex: "#006400", color_weight: 0.3 },
      { color_hex: "#556B2F", color_weight: 0.2 },
      { color_hex: "#8FBC8F", color_weight: 0.1 },
    ],
    MAGIC: [
      { color_hex: "#8A2BE2", color_weight: 0.4 },
      { color_hex: "#4B0082", color_weight: 0.3 },
      { color_hex: "#9400D3", color_weight: 0.2 },
      { color_hex: "#DDA0DD", color_weight: 0.1 },
    ],
    MELON: [
      { color_hex: "#FFA07A", color_weight: 0.4 },
      { color_hex: "#FA8072", color_weight: 0.3 },
      { color_hex: "#FF6347", color_weight: 0.2 },
      { color_hex: "#FF4500", color_weight: 0.1 },
    ],
    MOSAIC: [
      { color_hex: "#FF7F50", color_weight: 0.2 },
      { color_hex: "#6495ED", color_weight: 0.3 },
      { color_hex: "#FFD700", color_weight: 0.2 },
      { color_hex: "#00CED1", color_weight: 0.3 },
    ],
    PASTEL: [
      { color_hex: "#FFDAB9", color_weight: 0.3 },
      { color_hex: "#E6E6FA", color_weight: 0.2 },
      { color_hex: "#FFFACD", color_weight: 0.3 },
      { color_hex: "#F5DEB3", color_weight: 0.2 },
    ],
    ULTRAMARINE: [
      { color_hex: "#4169E1", color_weight: 0.4 },
      { color_hex: "#000080", color_weight: 0.3 },
      { color_hex: "#4682B4", color_weight: 0.2 },
      { color_hex: "#5F9EA0", color_weight: 0.1 },
    ],
  };
  
  export function mapColorPalette(
    colorPalette: string | { color_hex: string; color_weight?: number }[],
  ): { members: { color_hex: string; color_weight: number }[] } | { type: string } {
    const paletteMap: { [key: string]: { color_hex: string; color_weight: number }[] } = colorPresets;
  
    if (typeof colorPalette === "string" && paletteMap[colorPalette.toUpperCase()]) {
      return { members: paletteMap[colorPalette.toUpperCase()] };
    }
  
    if (Array.isArray(colorPalette)) {
      return {
        members: colorPalette.map(({ color_hex, color_weight }) => ({
          color_hex,
          color_weight: color_weight || 1.0,
        })),
      };
    }
  
    // Return an object instead of a string to match expected types
    return { type: "AUTO" };
  }
  

  
  // mapStyleType.ts

export function mapStyleType(imageType: string): string {
    const styleMap: { [key: string]: string } = {
      "auto": "AUTO",
      "realistic": "REALISTIC",
      "3d-render": "RENDER_3D",
      "anime": "ANIME",
      "general": "GENERAL",
      "design": "DESIGN",
    };
    return styleMap[imageType] || "AUTO";
  }

  

//mapAspectRatio.ts

export function mapAspectRatio(aspectRatio: string): "ASPECT_1_1" | "ASPECT_16_9" | "ASPECT_10_16" {
    switch (aspectRatio) {
      case "1:1":
        return "ASPECT_1_1";
      case "16:9":
        return "ASPECT_16_9";
      case "9:16":
        return "ASPECT_10_16";
      default:
        return "ASPECT_1_1";
    }
  }
  