import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { throttle, checkShowItem, changeItemBlock } from './utils';
import { RecycleProps, ItemPosition } from './index.d';

export const RecycleContext = React.createContext<{
  addItem: (item: ItemPosition) => void;
}>({
  addItem: () => undefined,
});

const Recycle: React.FC<RecycleProps> = (props) => {
  const { children, throttleTime = 40 } = props;
  // 滚动距离
  const [scrollDistance, setScrollDistance] = useState(0);
  // 滚动距离，解决后续的addItem取的值永远是第一个的闭包问题
  const scrollDistanceRef = useRef(0);
  // 回收器挂载是否OK了
  const recycleMountRef = useRef(false);
  // 所有的items的数据集
  const dataSetRef = useRef([]);

  // 增加item，统计item的信息，并布局可视区item
  const addItem = useCallback((item: ItemPosition) => {
    const scrollDistance = scrollDistanceRef.current;

    if (recycleMountRef.current) {
      changeItemBlock(item, scrollDistance);
      checkShowItem(item, scrollDistance);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dataSetRef.current.push(item);
  }, []);

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const distance = window.scrollY;
      setScrollDistance(distance);
      scrollDistanceRef.current = distance;
    }, throttleTime);

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.addEventListener('scroll', handleWindowScroll);
    };
  }, [throttleTime]);

  useEffect(() => {
    // 已经挂载好了
    recycleMountRef.current = true;
    // 首次挂载需要统一修正item正确的左右区间，这一步很重要
    const windowScrollY = window.scrollY;

    dataSetRef.current.forEach((item) => {
      changeItemBlock(item, windowScrollY);
      checkShowItem(item, windowScrollY);
    });
  }, []);

  // 当滚动的时候，及时更新布局信息
  useEffect(() => {
    dataSetRef.current.forEach((item) => checkShowItem(item, scrollDistance));
  }, [scrollDistance]);

  return (
    <RecycleContext.Provider value={{ addItem }}>
      {children}
    </RecycleContext.Provider>
  );
};

Recycle.defaultProps = {
  throttleTime: 64,
};

export default memo(Recycle);
