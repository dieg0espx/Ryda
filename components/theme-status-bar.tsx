"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export default function ThemeStatusBar() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Update the status bar style based on the theme
    const statusBarStyle = resolvedTheme === 'dark' ? 'white' : 'black'
    
    // Find and update the existing meta tag
    let metaTag = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
    
    if (metaTag) {
      metaTag.setAttribute('content', statusBarStyle)
    } else {
      // Create the meta tag if it doesn't exist
      metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'apple-mobile-web-app-status-bar-style')
      metaTag.setAttribute('content', statusBarStyle)
      document.head.appendChild(metaTag)
    }

    // Also update the theme-color meta tag
    const themeColor = resolvedTheme === 'dark' ? '#000000' : '#ffffff'
    let themeColorMeta = document.querySelector('meta[name="theme-color"]')
    
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themeColor)
    } else {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.setAttribute('name', 'theme-color')
      themeColorMeta.setAttribute('content', themeColor)
      document.head.appendChild(themeColorMeta)
    }
  }, [resolvedTheme])

  return null
} 