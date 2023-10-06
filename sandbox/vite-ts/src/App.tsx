import { cva } from '../styled-system/css'
import { center } from '../styled-system/patterns'

const button = cva({
  base: {
    borderRadius: 'md',
    px: '4',
  },
  variants: {
    visual: {
      solid: {
        bg: { base: 'colorPalette.500', _dark: 'colorPalette.300' },
        color: { base: 'white', _dark: 'gray.800' },
      },
      outline: {
        border: '1px solid',
        color: { base: 'colorPalette.600', _dark: 'colorPalette.200' },
      },
    },
  },
})

export default () => {
  return (
    <div className={center({ colorPalette: 'yellow', h: 'full', gap: '4' })}>
      <button className={button({ visual: 'solid' })}>Button</button>
      <button className={button({ visual: 'outline' })}>Button</button>
    </div>
  )
}
