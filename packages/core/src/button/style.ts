import { props } from './props'
import { addColorAlpha } from '../utils'
import type { ExtractPropTypes } from 'vue'
import type { UIThemesPalette } from '../themes'
import type { ButtonTypes, RecordPartial } from '../utils'

interface ButtonColorGroup {
  bg: string
  border: string
  color: string
}

export type ButtonProps = Pick<
  ExtractPropTypes<typeof props>,
  'auto' | 'disabled' | 'ghost' | 'shadow' | 'type' | 'loading'
>

function getButtonGhostColors(palette: UIThemesPalette, type: ButtonTypes) {
  const colors: RecordPartial<ButtonTypes, ButtonColorGroup> = {
    secondary: {
      bg: palette.background,
      border: palette.foreground,
      color: palette.foreground
    },
    success: {
      bg: palette.background,
      border: palette.success,
      color: palette.success
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
      color: palette.warning
    },
    error: {
      bg: palette.background,
      border: palette.error,
      color: palette.error
    }
  }
  return colors[type]
}

function getButtonGhostHoverColors(palette: UIThemesPalette, type: ButtonTypes) {
  const colors: RecordPartial<ButtonTypes, ButtonColorGroup> = {
    secondary: {
      bg: palette.foreground,
      border: palette.background,
      color: palette.background
    },
    success: {
      bg: palette.success,
      border: palette.background,
      color: 'white'
    },
    warning: {
      bg: palette.warning,
      border: palette.background,
      color: 'white'
    },
    error: {
      bg: palette.error,
      border: palette.background,
      color: 'white'
    }
  }
  const withoutLightType = type.replace('-light', '') as ButtonTypes
  return colors[withoutLightType]
}

export function getButtonHoverColors(palette: UIThemesPalette, props: ButtonProps) {
  const { type, disabled, loading, shadow, ghost } = props
  const defaultColor = getButtonColors(palette, props)
  const alphaBackground = addColorAlpha(defaultColor.bg, 0.85)
  const colors: Record<ButtonTypes, Omit<ButtonColorGroup, 'color'> & { color?: string }> = {
    default: {
      bg: palette.background,
      border: palette.foreground
    },
    secondary: {
      bg: palette.background,
      border: palette.foreground
    },
    success: {
      bg: palette.background,
      border: palette.success
    },
    warning: {
      bg: palette.background,
      border: palette.warning
    },
    error: {
      bg: palette.background,
      border: palette.error
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5
    },
    'secondary-light': {
      ...defaultColor,
      bg: alphaBackground
    },
    'success-light': {
      ...defaultColor,
      bg: alphaBackground
    },
    'warning-light': {
      ...defaultColor,
      bg: alphaBackground
    },
    'error-light': {
      ...defaultColor,
      bg: alphaBackground
    }
  }
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.accents_2,
      color: '#ccc'
    }
  if (loading)
    return {
      ...defaultColor,
      color: 'transparent'
    }
  if (shadow) return defaultColor
  const hoverColor = (ghost ? getButtonGhostHoverColors(palette, type) : colors[type]) || colors.default
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border
  }
}

export function getButtonColors(palette: UIThemesPalette, props: ButtonProps) {
  const { ghost, disabled, type: userType = 'default' } = props
  const colors: RecordPartial<ButtonTypes, ButtonColorGroup> = {
    default: {
      bg: palette.background,
      border: palette.border,
      color: palette.accents_5
    },
    secondary: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background
    },
    success: {
      bg: palette.success,
      border: palette.success,
      color: '#fff'
    },
    warning: {
      bg: palette.warning,
      border: palette.warning,
      color: '#fff'
    },
    error: {
      bg: palette.error,
      border: palette.error,
      color: '#fff'
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5
    }
  }
  if (disabled) {
    return {
      bg: palette.accents_1,
      border: palette.accents_2,
      color: '#ccc'
    }
  }
  // light type is only difference with hover's
  const type = userType.replace('-light', '') as ButtonTypes
  const defaultColor = colors.default as ButtonColorGroup
  if (ghost) return getButtonGhostColors(palette, type) || defaultColor
  return colors[type] || defaultColor
}

export function getButtonDripColor(palette: UIThemesPalette, props: ButtonProps) {
  const { type } = props
  const isLightHover = type!.endsWith('light')
  const hoverColors = getButtonHoverColors(palette, props)
  return isLightHover ? addColorAlpha(hoverColors.bg, 0.65) : addColorAlpha(palette.accents_2, 0.65)
}
