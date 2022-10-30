import React from 'react';
import { throttle } from 'water-design-utils';
import Item from './Item';
import { checkShowItem, changeItemBlock } from './utils';
import { IRecycleProps, IRecycleItemProps, ItemPosition } from './index.d';

export const RecycleContext = React.createContext<{
  addItem: (item: ItemPosition) => void;
}>({
  addItem: () => void 0,
});

const Recycle: React.FC<IRecycleProps> & {
  Item?: React.FC<IRecycleItemProps>;
} = (props) => {
  const { children, throttleTime = 60 } = props;
  // 滚动距离
  const [scrollDistance, setScrollDistance] = React.useState(0);
  // 滚动距离，解决后续的addItem取的值永远是第一个的闭包问题
  const scrollDistanceRef = React.useRef(0);
  // 回收器挂载是否OK了
  const recycleMountRef = React.useRef(false);
  // 所有的items的数据集
  const dataSetRef = React.useRef([]);

  // 增加item，统计item的信息，并布局可视区item
  const addItem = React.useCallback((item: ItemPosition) => {
    const scrollDistance = scrollDistanceRef.current;

    if (recycleMountRef.current) {
      changeItemBlock(item, scrollDistance);
      checkShowItem(item, scrollDistance);
    }
    (dataSetRef.current as ItemPosition[]).push(item);
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
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
  React.useEffect(() => {
    dataSetRef.current.forEach((item) => checkShowItem(item, scrollDistance));
  }, [scrollDistance]);

  return (
    <RecycleContext.Provider value={{ addItem }}>
      {children}
    </RecycleContext.Provider>
  );
};

Recycle.Item = Item;

const RecycleItem = Item;

export { Recycle, RecycleItem };

export default Recycle;
