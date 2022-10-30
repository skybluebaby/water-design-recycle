import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Recycle from '../src';
import RecycleItem from '../src/Item';

const getData = (index = 1) => {
  return new Array(index)
    .fill(new Array(5).fill(1).map((node, index) => index))
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
