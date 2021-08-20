import { Placement } from './props'

export type DrawerTransformItem = {
  initial: string
  hidden: string
  visible: string
}

const getDrawerTransfrom = (placement: Placement) => {
  const styles: Record<Placement, DrawerTransformItem> = {
    top: {
      initial: 'translate3d(0, -100%, 0)',
      hidden: 'translate3d(0, -100%, 0)',
      visible: 'translate3d(0, 0, 0)',
    },
    left: {
      initial: 'translate3d(-100%, 0, 0)',
      hidden: 'translate3d(-100%, 0, 0)',
      visible: 'translate3d(0, 0, 0)',
    },
    bottom: {
      initial: 'translate3d(0, 100%, 0)',
      hidden: 'translate3d(0, 100%, 0)',
      visible: 'translate3d(0, 0, 0)',
    },
    right: {
      initial: 'translate3d(100%, 0, 0)',
      hidden: 'translate3d(100%, 0, 0)',
      visible: 'translate3d(0, 0, 0)',
    },
  }
  return styles[placement]
}
