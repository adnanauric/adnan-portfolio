# Design Tokens Reference

## Color Palette

| Name | Hex | Usage |
|:---|:---|:---|
| Background Primary | `#0a192f` | Page background |
| Background Secondary | `#112240` | Cards, panels, modals |
| Background Tertiary | `#233554` | Borders, hover states |
| Text Primary | `#ccd6f6` | Headings, important text |
| Text Secondary | `#8892b0` | Body text, descriptions |
| Text Bright | `#e6f1ff` | Maximum emphasis text |
| Accent | `#64ffda` | Links, buttons, highlights |
| Accent Tint | `rgba(100, 255, 218, 0.1)` | Hover backgrounds |

## Typography

| Token | Value | Usage |
|:---|:---|:---|
| Sans Font | Inter | Headings, body text |
| Mono Font | JetBrains Mono | Code, numbers, labels |
| Hero Size | clamp(2.5rem, 6vw, 4.5rem) | Hero name |
| Heading Size | 2rem | Section headings |
| Body Size | 1rem | Paragraphs |
| Small Size | 0.875rem | Labels, tags |

## Spacing Scale

| Token | Value |
|:---|:---|
| `--space-xs` | 0.25rem |
| `--space-sm` | 0.5rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2rem |
| `--space-2xl` | 3rem |
| `--space-3xl` | 4rem |
| `--space-4xl` | 6rem |

## How to Change Colors
Edit `src/styles/global.css` → `:root` block. All components reference these variables, so changing one value updates the entire site.
