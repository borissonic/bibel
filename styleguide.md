# Bible Pray App Style Guide

## Brand Identity

### App Name
**Bible Pray**

### Logo
- **Primary Icon**: Praying hands with radiating lines
- **Style**: Minimalist line art
- **Color**: Black (#000000)
- **Usage**: App icon, splash screen, header branding

## Color System

### Base Colors
- **Primary Background**: #FFFFE7 (Cream)
- **Primary Text**: #000000 (Black)
- **Secondary Text**: #FFFFFF (White)
- **Glass White**: rgba(255, 255, 255, 0.8)
- **Pure White**: #FFFFFF (for UI elements only)
- **Pure Black**: #000000

### Gradient Overlay System

#### Yellow Gradient (Bottom Layer)
- **Start Color**: #FFE4B5 (Moccasin) - 100% opacity
- **Mid Color**: #FFD700 (Gold) - 50% opacity  
- **End Color**: Transparent
- **Direction**: Radial from bottom center
- **Shape**: Half-circle gradient
- **Blend Mode**: Screen
- **Coverage**: Starts at bottom, fades out by 40% of screen height
- **Animation**: Pulses gently on user interaction

#### Blue Gradient (Top Layer)
- **Start Color**: #87CEEB (Sky Blue) - 80% opacity
- **Mid Color**: #4682B4 (Steel Blue) - 40% opacity
- **End Color**: Transparent  
- **Direction**: Linear, bottom to top
- **Blend Mode**: Multiply
- **Coverage**: Starts at bottom, fades out by 80% of screen height
- **Animation**: Shifts intensity based on scroll/swipe

### Combined Background Effect
```
Base: #FFFFE7
+ Yellow Radial Gradient (bottom, half-circle)
+ Blue Linear Gradient (bottom to top)
= Dynamic, living background
```

## Typography

### Font Family
**Plantagenet Cherokee** (All screens)

### Type Scale
- **Display**: 36px / 1.2 line height
- **Title Large**: 32px / 1.3 line height  
- **Title**: 28px / 1.3 line height
- **Headline**: 24px / 1.4 line height
- **Body Large**: 18px / 1.5 line height
- **Body**: 16px / 1.5 line height
- **Label**: 14px / 1.4 line height
- **Caption**: 12px / 1.3 line height

### Font Weights
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Buttons, labels
- **Semibold (600)**: Headers, emphasis
- **Bold (700)**: Special emphasis only

## Component Library

### Glass Cards
- **Background**: rgba(255, 255, 255, 0.8)
- **Backdrop Filter**: blur(20px)
- **Border**: 1px solid rgba(255, 255, 255, 0.5)
- **Border Radius**: 24px
- **Shadow**: 0 8px 32px rgba(0, 0, 0, 0.08)
- **Padding**: 20px
- **Animation**: Scale(0.98) on press

### Button Variants

#### Primary Glass Button
- **Background**: rgba(255, 255, 255, 0.9)
- **Text**: #000000
- **Border**: 1px solid rgba(255, 255, 255, 0.6)
- **Border Radius**: 28px
- **Padding**: 16px 32px
- **Shadow**: 0 4px 16px rgba(0, 0, 0, 0.1)

#### Secondary Dark Button  
- **Background**: #000000
- **Text**: #FFFFFF
- **Border**: none
- **Border Radius**: 28px
- **Padding**: 18px 36px
- **Shadow**: 0 6px 20px rgba(0, 0, 0, 0.2)

#### Floating Action Button
- **Background**: #000000
- **Icon Color**: #FFFFFF
- **Size**: 56px × 56px
- **Border Radius**: 28px
- **Shadow**: 0 8px 24px rgba(0, 0, 0, 0.25)

### Input Fields
- **Background**: rgba(255, 255, 255, 0.7)
- **Border**: 1px solid rgba(0, 0, 0, 0.1)
- **Border Radius**: 20px
- **Padding**: 16px 20px
- **Placeholder Color**: rgba(0, 0, 0, 0.4)
- **Focus Border**: rgba(0, 0, 0, 0.3)

### Topic/Content Cards
- **Container**: No border, image fill
- **Border Radius**: 20px
- **Image Overlay**: Linear gradient rgba(0, 0, 0, 0) to rgba(0, 0, 0, 0.6)
- **Text**: #FFFFFF
- **Text Position**: Bottom left, 16px padding
- **Min Height**: 120px

### Navigation Bar
- **Background**: Blurred glass effect
- **Height**: 80px (including safe area)
- **Icon Size**: 24px × 24px
- **Active Color**: #000000
- **Inactive Color**: rgba(0, 0, 0, 0.4)

### Tab Bar
- **Background**: rgba(255, 255, 255, 0.95)
- **Height**: 56px
- **Shadow**: 0 -2px 10px rgba(0, 0, 0, 0.05)

## Screen Layouts

### Home Screen
- Status bar overlay with gradient
- Scrollable content with parallax background
- Fixed bottom navigation

### Reading Screen
- Minimal UI, focus on content
- Floating action buttons
- Progress indicator

### Prayer/Meditation Screen  
- Center-aligned content
- Larger typography
- Dimmed background gradients

### Profile/Settings
- List-based layout
- Section headers with glass cards
- Toggle switches and selection controls

## Animation Principles

### Background Gradient Animations
- **Scroll Response**: Blue gradient intensity increases with downward scroll
- **Touch Response**: Yellow gradient pulses from touch point
- **Navigation**: Cross-fade between gradient states
- **Duration**: 300-500ms for all transitions
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

### Micro-interactions
- **Button Press**: Scale(0.96) + opacity(0.9)
- **Card Hover**: Subtle shadow increase
- **List Items**: Slide in from right on appear
- **Tab Switch**: Fade + slide transition

## Iconography

### Icon Style
- **Type**: Outlined
- **Stroke Width**: 2px
- **Corner Radius**: Rounded
- **Size Grid**: 24px × 24px base
- **Optical Adjustments**: Yes

### Core Icons
- Home: House outline
- Search: Magnifying glass
- Prayer: Praying hands
- Bible: Open book
- Profile: User circle
- Settings: Gear
- Share: Arrow up from box
- Bookmark: Bookmark outline
- Heart: Heart outline
- Calendar: Calendar grid

## Spacing System

### Base Unit: 4px

- **Micro**: 4px
- **Small**: 8px
- **Medium**: 16px
- **Large**: 24px
- **XLarge**: 32px
- **XXLarge**: 48px

### Screen Margins
- **Mobile**: 20px
- **Tablet**: 32px
- **Safe Area**: Additional system insets

## Dark Mode (Future)

### Inverted Palette
- **Background**: #1C1C1E
- **Cream Equivalent**: #2C2C2E
- **Gradients**: Reduced opacity (40%)
- **Glass Effect**: Dark with white opacity

## Accessibility

### Color Contrast
- **Regular Text**: Minimum 4.5:1
- **Large Text**: Minimum 3:1
- **Interactive Elements**: Minimum 3:1
- **Always test against gradient areas**

### Touch Targets
- **Minimum**: 44px × 44px
- **Recommended**: 48px × 48px
- **Spacing Between**: 8px minimum

### Typography
- **Dynamic Type**: Support system scaling
- **Minimum Size**: 12px
- **Line Length**: 45-75 characters

## iOS/SwiftUI Implementation

### Platform Requirements
- **Minimum iOS**: 15.0
- **Framework**: SwiftUI
- **Deployment**: iPhone only

### SwiftUI Components
- Use `Material` blur effects for glass
- Implement gradients with `LinearGradient` and `RadialGradient`
- Use `GeometryReader` for dynamic gradient positioning
- Leverage `withAnimation` for smooth transitions

## Implementation Notes

### Background Rendering
1. Base cream color (#FFFFE7) as solid background
2. Yellow gradient as CSS radial-gradient or canvas overlay
3. Blue gradient as CSS linear-gradient overlay
4. Both gradients use GPU acceleration
5. Animate gradient properties, not positions

### Performance
- Glass effects should be toggleable
- Gradients should be pre-rendered where possible
- Use CSS containment for better performance
- Lazy load images in topic cards

## Usage Examples

### SwiftUI Background Implementation
```swift
struct BiblePrayBackground: View {
    var body: some View {
        ZStack {
            // Base cream color
            Color(hex: "FFFFE7")
            
            // Yellow radial gradient
            RadialGradient(
                colors: [
                    Color(hex: "FFE4B5"),
                    Color(hex: "FFD700").opacity(0.5),
                    Color.clear
                ],
                center: .bottom,
                startRadius: 0,
                endRadius: UIScreen.main.bounds.height * 0.4
            )
            
            // Blue linear gradient
            LinearGradient(
                colors: [
                    Color(hex: "87CEEB").opacity(0.8),
                    Color(hex: "4682B4").opacity(0.4),
                    Color.clear
                ],
                startPoint: .bottom,
                endPoint: .init(x: 0.5, y: 0.2)
            )
        }
        .ignoresSafeArea()
    }
}
```

### Glass Card in SwiftUI
```swift
struct GlassCard<Content: View>: View {
    let content: Content
    
    var body: some View {
        content
            .padding(20)
            .background(.regularMaterial)
            .cornerRadius(24)
            .overlay(
                RoundedRectangle(cornerRadius: 24)
                    .strokeBorder(Color.white.opacity(0.5), lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.08), radius: 16, y: 8)
    }
}
```

## Quality Checklist

- [ ] Cream background always visible
- [ ] Gradients blend smoothly
- [ ] Text remains readable over all gradient areas
- [ ] Glass effects don't obscure content
- [ ] Animations are smooth (60fps)
- [ ] Touch targets meet minimums
- [ ] Colors pass WCAG guidelines