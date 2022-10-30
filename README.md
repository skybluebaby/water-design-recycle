## 综述

在可视区窗口的环境下，当在可视区上下一屏的区间外的元素将会自动回收，随着滚动将会及时回显。

## 使用

```tsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
// 可通过以下方法导入
import { Recycle, RecycleItem } from 'water-design-recycle';
// import Recycle from 'water-design-recycle';
// const { RecycleItem } = Recycle;

const getData = (index = 1) => {
  return new Array(index)
    .fill(new Array(10).fill(1).map((node, index) => index))
    .reduce((current, item) => {
      return [...current, ...item];
    }, []);
};

const App: React.FC = () => {
  const [list, setList] = useState<number[]>(getData());

  React.useEffect(() => {
    const handleScroll = () => {
      const distantBottom = Math.abs(
        document.documentElement.offsetHeight -
          document.documentElement.clientHeight -
          window.scrollY
      );

      if (distantBottom < 1) {
        // 触底
        setList((prev) => [...prev, ...getData()]);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Recycle>
      {list.map((item, index) => (
        <RecycleItem key={index} style={{ height: 350, marginBottom: '20px' }}>
          <div style={{ height: 350, backgroundColor: 'skyblue' }}>{index}</div>
        </RecycleItem>
      ))}
    </Recycle>
  );
};
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

## Recycle API

| 参数           | 说明     | 类型     | 默认值 | 版本 |
| :------------- | :------- | :------- | :----- | :--- |
| `throttleTime` | 节流时间 | `number` | 60     |      |

## RecycleItem API

| 参数                  | 说明                                                                                                                                                  | 类型                  | 默认值 | 版本 |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :----- | :--- |
| `className`           | 自定义类名                                                                                                                                            | `string`              | -      |      |
| `style`               | 自定义行内样式                                                                                                                                        | `React.CSSProperties` | -      |      |
| `itemEstimatedHeight` | 每一项的 item 占位高度，单位：px，主要是当 item 高度都一样时，可以不需要先渲染出每一项 item 后去拿高度，节省 dom 渲染计算时间，若不传则会自动去拿高度 | `number`              | -      |      |

## 注意

若是在 item 项 children 里设置 margin，由于 wrapper 拿不到包含子项和 margin 值，会导致滚动后拿到的 height 不含 margin，因此若需设置 margin，则在 RecycleItem 以样式属性传入即可。
