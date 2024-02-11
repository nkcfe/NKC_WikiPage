import type { IconType } from 'react-icons';

export interface PostType {
  category: string;
  content: string;
  createdAt: string;
  id: number;
  title: string;
}

export interface EditorItemsType {
  icon: IconType;
  onClick: () => void;
  className: string;
  title?: string;
}
