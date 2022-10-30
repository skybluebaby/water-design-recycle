import React from 'react';
import { RecycleContext } from './';
import { IRecycleItemProps } from './index.d';

// 回收的item，若传了itemEstimatedHeight占位高度，则不渲染item获取高度，直接盒子占位
const RecycleItem: React.FC<IRecycleItemProps> = (props) => {
  const { children, itemEstimatedHeight, style, className, ...rest } = props;
  const [show, setShow] = React.useState(!itemEstimatedHeight);

  const { addItem } = React.useContext(RecycleContext);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const itemSizeRef = React.useRef<
    undefined | { width: number; height: number }
  >();

  const setItemAppear = React.useCallback((flag: boolean) => {
    setShow(flag);
  }, []);

  React.useEffect(() => {
    const itemDom = itemRef.current;
    if (itemDom) {
      const { top, bottom, width, height } = itemDom.getBoundingClientRect();
      itemSizeRef.current = { width, height };
      addItem({ top, bottom, setItemAppear });
    }
  }, [addItem, setItemAppear]);

  // 若存在占位高度，则不需要渲染出结果
  if (itemEstimatedHeight) {
    return (
      <div
        ref={itemRef}
        className={className}
        style={{ ...style, height: `${itemEstimatedHeight}px` }}
        {...rest}
      >
        {show ? children : null}
      </div>
    );
  }

  const itemSize = itemSizeRef.current;
  const { width, height } = itemSize || {};

  return (
    <div
      ref={itemRef}
      className={className}
      style={
        itemSize
          ? { ...style, width: `${width}px`, height: `${height}px` }
          : style
      }
      {...rest}
    >
      {show ? children : null}
    </div>
  );
};

export default RecycleItem;
