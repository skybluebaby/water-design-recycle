import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';
import { RecycleContext } from './';
import { RecycleItemProps, ItemPosition } from './index.d';

/**
 * 回收的item，若传了estimatedItemHeight占位高度，则不渲染item获取高度，直接盒子占位
 * @param props
 * @returns JSX.Element
 */

const RecycleItem: React.FC<RecycleItemProps> = (props): JSX.Element => {
  const { children, estimatedItemHeight } = props;
  const [show, setShow] = useState(!estimatedItemHeight);

  const { addItem } = useContext(RecycleContext);
  const itemRef = useRef<HTMLDivElement>(null);
  const itemSizeRef = useRef<undefined | { width: number; height: number }>();

  const setItemAppear = useCallback((flag: boolean) => {
    setShow(flag);
  }, []);

  useEffect(() => {
    const itemDom = itemRef.current;
    if (itemDom) {
      const { top, bottom, width, height } = itemDom.getBoundingClientRect();
      itemSizeRef.current = { width, height };
      addItem({ top, bottom, setItemAppear } as ItemPosition);
    }
  }, [addItem, setItemAppear]);

  // 若存在占位高度，则不需要渲染出结果
  if (estimatedItemHeight) {
    return (
      <div ref={itemRef} style={{ width: '100%', height: estimatedItemHeight }}>
        {show ? children : null}
      </div>
    );
  }

  const { width, height } = itemSizeRef.current || {};

  return (
    <div
      ref={itemRef}
      style={
        itemSizeRef.current
          ? { width: `${width}px`, height: `${height}px` }
          : {}
      }
    >
      {show ? children : null}
    </div>
  );
};

export default RecycleItem;
