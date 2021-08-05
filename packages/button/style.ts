import { ButtonTypes, NormalSizes } from '../utils/theme/propTypes'

type ButtonColorGroup = {
  bg: string
  border: string
  color: string
}

export const queryButtonColor = (type: ButtonTypes) => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    success: {
      bg: 'var(--success-default)',
      border: 'var(--primary-background)',
      color: '#fff',
    },
    warning: {
      bg: 'var(--warning-default)',
      border: 'var(--primary-background)',
      color: '#fff',
    },
    error: {
      bg: 'var(--error-default)',
      border: 'var(--primary-background)',
      color: '#fff',
    },
  }
  return colors[type]
}

export const queryGhostColor = (type: ButtonTypes) => {}

export const queryHoverColor = (type: ButtonTypes, ghost: boolean) => {
  const colors: { [key in ButtonTypes]: ButtonColorGroup } = {
    default: {
      bg: 'var(--primary-background)',
      border: 'var(--primary-foreground)',
      color: 'var(--primary-foreground)',
    },
    success: {
      bg: 'var(--primary-background)',
      border: 'var(--success-default)',
      color: 'var(--success-default)',
    },
    warning: {
      bg: 'var(--primary-background)',
      border: 'var(--warning-default)',
      color: 'var(--warning-default)',
    },
    error: {
      bg: 'var(--primary-background)',
      border: 'var(--error-default)',
      color: 'var(--error-default)',
    },
  }
  return (ghost ? queryGhostColor(type) : colors[type]) || colors.default
}
