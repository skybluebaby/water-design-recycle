import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Recycle from '../src/';
import RecycleItem from '../src/Item';

const root = createRoot(document.getElementById('root')!);

const getData = (index = 1) => {
  return new Array(index)
    .fill(new Array(16).fill(1).map((node, index) => index))
    .reduce((current, item) => {
      return [...current, ...item];
    }, []);
};

const App: React.FC = () => {
  const [list, setList] = useState<number[]>(getData());

  const handleAddList = () => {
    setList((prev) => [...prev, ...getData()]);
  };
  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '50px',
          width: '100px',
          height: '100px',
          backgroundColor: 'aqua',
        }}
        onClick={handleAddList}
      >
        add
      </div>
      <Recycle>
        <div>
          {list.map((item, index) => {
            return (
              <RecycleItem key={index} estimatedItemHeight={370}>
                <div
                  key={index}
                  className="list-item"
                  style={{
                    width: '100%',
                    height: '350px',
                    backgroundColor: 'skyblue',
                    marginBottom: '20px',
                  }}
                >
                  {index}
                </div>
              </RecycleItem>
            );
          })}
        </div>
      </Recycle>
    </>
  );
};

root.render(<App />);
