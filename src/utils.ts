import { ItemPosition } from './index.d';

// 视口高度
export const viewportHeight =
  window.innerHeight || document.documentElement.clientHeight;

export const changeItemBlock = (item: ItemPosition, scrollDistance: number) => {
  const leftBlock = scrollDistance - (2 * viewportHeight - item.top);
  item.leftBlock = leftBlock < 0 ? 0 : leftBlock;
  item.rightBlock = scrollDistance + viewportHeight + item.bottom;
};

/**
 * 检查是否展示item，若展示，则直接展示
 * @param item item的位置信息
 * @param scrollDistance 滚动距离
 */
export const checkShowItem = (item: ItemPosition, scrollDistance: number) => {
  const { setItemAppear, leftBlock, rightBlock } = item;
  if (scrollDistance >= leftBlock! && scrollDistance <= rightBlock!) {
    setItemAppear(true);
  } else {
    setItemAppear(false);
  }
};
