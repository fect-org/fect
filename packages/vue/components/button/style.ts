import type { ButtonTypes, RecordPartial } from '../utils'

interface ButtonColorGroup {
  bg: string
  border: string
  color: string
}

export const queryGhostColor = (type: ButtonTypes) => {
  const colors: RecordPartial<ButtonTypes, ButtonColorGroup> = {
    success: {
      bg: 'var(--button-success-color)',
      border: 'var(--button-default-color)',
      color: '#fff'
    },
    warning: {
      bg: 'var(--button-warning-color)',
      border: 'var(--button-default-color)',
      color: '#fff'
    },
    error: {
      bg: 'var(--button-error-color)',
      border: 'var(--button-default-color)',
      color: '#fff'
    },
    secondary: {
      bg: 'var(--lite-default)',
      border: 'var(--dark-default)',
      color: '#fff'
    }
  }
  return colors[type]
}

export const queryHoverColor = (type: ButtonTypes, ghost: boolean) => {
  const colors: Record<ButtonTypes, ButtonColorGroup> = {
    default: {
      bg: 'var(--button-default-color)',
      border: 'var(--primary-foreground)',
      color: 'var(--primary-foreground)'
    },
    success: {
      bg: 'var(--button-default-color)',
      border: 'var(--button-success-color)',
      color: 'var(--button-success-color)'
    },
    warning: {
      bg: 'var(--button-default-color)',
      border: 'var(--button-warning-color)',
      color: 'var(--button-warning-color)'
    },
    error: {
      bg: 'var(--button-default-color)',
      border: 'var(--button-error-color)',
      color: 'var(--button-error-color)'
    },
    secondary: {
      bg: 'var(--lite-default)',
      border: 'var(--dark-default)',
      color: 'var(--primary-foreground)'
    }
  }
  return (ghost ? queryGhostColor(type) : colors[type]) || colors.default
}
