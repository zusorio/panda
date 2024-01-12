---
'@pandacss/generator': minor
'@pandacss/types': minor
---

Add callback `preflight` scope. This lets you transform preflight styles' selectors to a any format of your choice

```js
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // ...
  preflight: {
    scope: (selector) => `${selector}.my-scope`,
  },
})
```

Generated reset will look like this:

```css
ol.my-scope,
ul.my-scope {
  list-style: none;
}

code.my-scope,
kbd.my-scope,
pre.my-scope,
samp.my-scope {
  font-size: 1em;
}
```
