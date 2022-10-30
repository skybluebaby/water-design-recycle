import React from 'react';
export interface ItemPosition {
  top: number;
  bottom: number;
  setItemAppear: (flag: boolean) => void;
  // 左区间
  leftBlock?: number;
  // 右区间
  rightBlock?: number;
}

export interface IRecycleProps {
  // 截流时间，默认单位为ms
  throttleTime?: number;
  children?: React.ReactNode;
}

export interface IRecycleItemProps {
  children?: React.ReactNode;
  /**
   * 占位高度
   */
  itemEstimatedHeight?: number | string;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
}

declare const RecycleItem: React.FC<IRecycleItemProps>;
declare const Recycle: React.FC<IRecycleProps> & {
  Item: React.FC<IRecycleItemProps>;
};

export { RecycleItem, Recycle };

export default Recycle;
