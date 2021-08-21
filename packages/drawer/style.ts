import { Placement } from './props'

export const getDrawerTransfrom = (placement: Placement) => {
  const styles: Record<Placement, String> = {
    top: 'translate3d(0, -100%, 0)',
    bottom: 'translate3d(0, 100%, 0)',
    left: 'translate3d(-100%, -50%, 0)',
    right: 'translate3d(100%, -50%, 0)',
  }
  return styles[placement]
}
