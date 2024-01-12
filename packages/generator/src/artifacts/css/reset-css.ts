import { isObject } from '@pandacss/shared'
import type { Context } from '@pandacss/core'
import type { Stylesheet } from '@pandacss/core'

const css = String.raw

export function generateResetCss(ctx: Context, sheet: Stylesheet) {
  const { preflight } = ctx.config
  const scope = isObject(preflight) ? preflight.scope : undefined

  const getSelector = (selector: string) => {
    if (!scope) return selector
    if (typeof scope === 'function') return scope(selector)
    return `${scope} ${selector}`
  }

  // prettier-ignore
  const output = css`
  ${getSelector('*')} {
    margin: 0;
    padding: 0;
    font: inherit;
  }

  ${getSelector('*')},
  ${getSelector('*::before')},
  ${getSelector('*::after')} {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: var(--global-color-border, currentColor);
  }

  ${getSelector('') || 'html'} {
    line-height: 1.5;
    --font-fallback: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: var(--global-font-body, var(--font-fallback));
  }

  ${getSelector('hr')} {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }

  body {
    height: 100%;
    line-height: inherit;
  }

  ${getSelector('img')} {
    border-style: none;
  }

  ${getSelector('img')},
  ${getSelector("svg")},
  ${getSelector("video")},
  ${getSelector("canvas")},
  ${getSelector("audio")},
  ${getSelector("iframe")},
  ${getSelector("embed")},
  ${getSelector("object")} {
    display: block;
    vertical-align: middle;
  }

  ${getSelector('img')},
  ${getSelector("video")} {
    max-width: 100%;
    height: auto;
  }

  ${getSelector("p")},
  ${getSelector("h1")},
  ${getSelector("h2")},
  ${getSelector("h3")},
  ${getSelector("h4")},
  ${getSelector("h5")},
  ${getSelector("h6")} {
    overflow-wrap: break-word;
  }

  ${getSelector("ol")},
  ${getSelector("ul")} {
    list-style: none;
  }

  ${getSelector("code")},
  ${getSelector("kbd")},
  ${getSelector("pre")},
  ${getSelector("samp")} {
    font-size: 1em;
  }

  ${getSelector("button")},
  ${getSelector("[type='button']")},
  ${getSelector("[type='reset']")},
  ${getSelector("[type='submit']")} {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
  }

  ${getSelector("button")},
  ${getSelector("input")},
  ${getSelector("optgroup")},
  ${getSelector("select")},
  ${getSelector("textarea")} {
    color: inherit;
  }

  ${getSelector("button")},
  ${getSelector("select")} {
    text-transform: none;
  }

  ${getSelector("table")} {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }

  ${getSelector("input::placeholder")},
  ${getSelector("textarea::placeholder")} {
    opacity: 1;
    color: var(--global-color-placeholder, #9ca3af);
  }

  ${getSelector("textarea")} {
    resize: vertical;
  }

  ${getSelector("summary")} {
    display: list-item;
  }

  ${getSelector("small")} {
    font-size: 80%;
  }

  ${getSelector("sub")},
  ${getSelector("sup")} {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  ${getSelector("sub")} {
    bottom: -0.25em;
  }

  ${getSelector("sup")} {
    top: -0.5em;
  }

  ${getSelector("dialog")} {
    padding: 0;
  }

  ${getSelector("a")} {
    color: inherit;
    text-decoration: inherit;
  }

  ${getSelector("abbr:where([title])")} {
    text-decoration: underline dotted;
  }

  ${getSelector("b")},
  ${getSelector("strong")} {
    font-weight: bolder;
  }

  ${getSelector("code")},
  ${getSelector("kbd")},
  ${getSelector("samp")},
  ${getSelector("pre")} {
    font-size: 1em;
    --font-mono-fallback: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New';
    font-family: var(--global-font-mono, var(--font-mono-fallback));
  }


  ${getSelector("input[type='text']")},
  ${getSelector("input[type='email']")},
  ${getSelector("input[type='search']")},
  ${getSelector("input[type='password']")} {
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  ${getSelector("input[type='search']")} {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  ${getSelector("::-webkit-search-decoration")},
  ${getSelector("::-webkit-search-cancel-button")} {
    -webkit-appearance: none;
  }

  ${getSelector("::-webkit-file-upload-button")} {
    -webkit-appearance: button;
    font: inherit;
  }

  ${getSelector("input[type='number']::-webkit-inner-spin-button")},
  ${getSelector("input[type='number']::-webkit-outer-spin-button")} {
    height: auto;
  }

  ${getSelector("input[type='number']")}{
    -moz-appearance: textfield;
  }

  ${getSelector(":-moz-ui-invalid")} {
    box-shadow: none;
  }

  ${getSelector(":-moz-focusring")} {
    outline: auto;
  }
`

  sheet.layers.reset.append(output)
  void ctx.hooks.callHook('generator:css', 'reset.css', '')
}
