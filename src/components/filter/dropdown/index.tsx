import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Item from './Item';
import { cn } from '@/utils/style';
import { motion } from 'framer-motion';

interface DropdownProps {
  data: string[];
}

const Dropdown = (props: DropdownProps) => {
  const { data } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('전체');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const selectHandler = (item: string) => {
    setSelected(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'relative flex h-8 w-36 cursor-pointer items-center justify-between bg-white px-4 transition',
        isOpen ? 'rounded-t-lg shadow-2xl' : 'rounded-lg',
      )}
      onClick={toggleHandler}
    >
      <div className="text-sm">{selected}</div>
      <MdOutlineKeyboardArrowDown />
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 top-8 flex h-auto w-36 flex-col items-start justify-center gap-2 rounded-b-lg bg-white p-2 shadow-2xl"
        >
          <Item item="전체" onClick={() => selectHandler('전체')} />
          {data.map((item) => (
            <Item key={item} item={item} onClick={selectHandler} />
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Dropdown;
