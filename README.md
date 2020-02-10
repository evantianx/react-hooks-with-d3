## Using React Hooks with D3

### `Join`

> [selection.join(enter[, update][, exit])](https://github.com/d3/d3-selection/blob/master/README.md#selection_join)

```js
// 获取 svg 以及数据
const svg = select(svgRef)
const data = [2, 4, 6, 8, 10]
```
```js
svg.selectAll('svg')
  .data(data)
  .join('circle')  // map 所有 data 为 circle
  .attr('r', value => value)
```

```js
svg.selectAll('svg')
  .data(data)
  .join(
    enter => enter.append('circle'),
    update => uopdate.attr('class', 'updated'),
    exit => exit.remove() // d3 默认处理这一条
  )
```

### `scale`

> [d3-scale](https://github.com/d3/d3-scale)

### ResizeObserver

```bash
# install types
yarn add -D @types/resize-observer-browser
```

Also we need to declare this type in `tsconfig.json`: 

```json
{
  "compilerOptions": {
    "types": ["resize-observer-browser"]
  }
}
```

> Currently, `ResizeObserver` seems not work at SVG element, so we need to wrap
> the SVG with a `div` element and observe this `div` to get dimensions