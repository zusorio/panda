import { capitalize, dashCase, mapObject, uncapitalize } from '@pandacss/shared'
import type { Dict, UserConfig } from '@pandacss/types'

const helpers = { map: mapObject }

export const getPatternEngine = (config: UserConfig) => {
  const patterns = config.patterns ?? {}
  const getConfig = (name: string) => patterns[name]
  const transform = (name: string, data: Dict) => {
    return getConfig(name)?.transform?.(data, helpers) ?? {}
  }

  const getNames = (name: string) => {
    const upperName = capitalize(name)
    return {
      name,
      upperName,
      dashName: dashCase(name),
      styleFnName: `get${upperName}Style`,
      jsxName: getConfig(name)?.jsx ?? upperName,
    }
  }

  const details = Object.entries(patterns).map(([name, pattern]) => ({
    ...getNames(name),
    props: Object.keys(pattern?.properties ?? {}),
    blocklistType: pattern?.blocklist ? `| '${pattern.blocklist.join("' | '")}'` : '',
    config: pattern,
  }))

  const nodes = Object.entries(patterns).map(([name, pattern]) => ({
    type: 'pattern' as const,
    name: pattern.jsx ?? capitalize(name),
    props: Object.keys(pattern.properties ?? {}),
    baseName: name,
  }))

  const getFnName = (jsx: string) => nodes.find((node) => node.name === jsx)?.baseName ?? uncapitalize(jsx)
  const isEmpty = () => Object.keys(patterns).length === 0

  return {
    getConfig,
    transform,
    getNames,
    details,
    nodes,
    getFnName,
    isEmpty,
  }
}

export type JsxPatternNode = {
  type: 'pattern'
  name: string
  props: string[]
  baseName: string
}
