import { InlineConfig } from 'vite'
import { CWD, VITE_RESOLVE_EXTENSIONS, UMD_PATH } from '../../shared/constant'

export const useDevConfig = (): InlineConfig => {
  return {
    root: CWD,
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
      alias: {},
    },
    server: {
      port: 5000,
    },
  }
}

export const useSiteConfig = () => {}

export const useUMDconfig = () => {}
