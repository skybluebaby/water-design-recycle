import React from 'react';
export type Throttle = (
  callback: (...arg: any[]) => void,
  wait: number
) => (...arg: any[]) => void;

export interface RecycleProps {
  // 截流时间，默认单位为ms
  throttleTime?: number;
  children?: React.ReactNode;
}

export interface ItemParams {
  top: number;
  bottom: number;
  setItemAppear: (flag: boolean) => void;
}

export interface ItemPosition extends ItemParams {
  // 左区间
  leftBlock: number;
  // 右区间
  rightBlock: number;
}

interface RecycleItemProps {
  children?: React.ReactNode;
  /**
   * 占位高度
   */
  estimatedItemHeight?: number | string;
}
