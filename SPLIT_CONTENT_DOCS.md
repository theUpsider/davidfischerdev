# Split Content System Documentation

## Overview

The Split Content System allows page components to define separate content for the upper and lower areas of the dynamic split view. The vertical line follows menu hover and automatically splits the page into two independent scrollable areas.

## Basic Usage

### Method 1: Using Functions (Recommended)

```tsx
import { useSplitPageWithFunctions } from '../components/useSplitPage'

const MyPage = () => {
  // Define upper content
  const renderUpperContent = () => (
    <div>
      <h1>Main Content</h1>
      <p>This appears above the dynamic line</p>
    </div>
  )

  // Define lower content
  const renderLowerContent = () => (
    <div>
      <h2>Secondary Content</h2>
      <p>This appears below the dynamic line</p>
    </div>
  )

  // Apply split content
  useSplitPageWithFunctions(renderUpperContent, renderLowerContent)

  // Return null since content is managed by the split system
  return null
}
```

### Method 2: Using Direct Content

```tsx
import { useSplitPage } from '../components/useSplitPage'

const MyPage = () => {
  const upperContent = (
    <div>
      <h1>Upper Area</h1>
    </div>
  )
  const lowerContent = (
    <div>
      <h2>Lower Area</h2>
    </div>
  )

  useSplitPage(upperContent, lowerContent)

  return null
}
```

### Method 3: Traditional Approach (Fallback)

If you don't use the split hooks, the page will render in the upper area using the traditional `<Outlet />` approach, with default content in the lower area.

```tsx
const MyPage = () => {
  return (
    <div>
      <h1>Traditional Page</h1>
      <p>This renders in the upper area by default</p>
    </div>
  )
}
```

## Features

✅ **Dynamic Split**: Line position follows menu hover  
✅ **Independent Scrolling**: Each area scrolls separately  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Smooth Animations**: 0.5s transitions  
✅ **Theme Integration**: Uses existing theme system  
✅ **Fallback Support**: Works with existing pages

## Implementation Details

### Components Created

1. **`SplitContentContext.tsx`** - Context for managing split content state
2. **`useSplitPage.tsx`** - Hooks for easy content definition
3. **`SplitContentRenderer.tsx`** - Renders the split layout

### How It Works

1. Page components use `useSplitPageWithFunctions()` to define content
2. Content is stored in React Context
3. `SplitContentRenderer` reads from context and renders appropriately
4. If no split content is defined, falls back to traditional rendering
5. The horizontal line position is controlled by menu hover state

## Examples

See the updated `Home.tsx` and `About.tsx` pages for complete examples of how to implement split content in your page components.

## Migration Guide

To convert an existing page to use split content:

1. Import the hook: `import { useSplitPageWithFunctions } from '../components/useSplitPage'`
2. Move your existing JSX into a `renderUpperContent()` function
3. Create a `renderLowerContent()` function for the lower area
4. Call `useSplitPageWithFunctions(renderUpperContent, renderLowerContent)`
5. Return `null` from your component

That's it! Your page now supports dynamic split content.
