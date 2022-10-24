import { ItemPosition, ItemParams, Throttle } from './index.d';

/**
 * 一段时间内执行一次回调函数
 * @param callback 回调函数
 * @param wait 节流时间（unit: ms）
 * @returns void
 */
export const throttle: Throttle = (callback, wait) => {
  let timeoutId: number | undefined = undefined;
  return (...args) => {
    if (timeoutId) {
      return;
    }
    timeoutId = window?.setTimeout(() => {
      callback(...args);
      timeoutId = undefined;
    }, wait);
  };
};

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

  if (scrollDistance >= leftBlock && scrollDistance <= rightBlock) {
    setItemAppear(true);
  } else {
    setItemAppear(false);
  }
};
