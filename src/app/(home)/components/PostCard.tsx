import type { PostType } from '@/interface';
import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, content, category, createdAt } = post;
  const router = useRouter();

  const parser = new DOMParser();
  const parsed = parser.parseFromString(content, 'text/html');
  const textContent = parsed.body.textContent || '';

  const moveHandler = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <div
      className="flex cursor-pointer flex-col items-start justify-center gap-3 py-10"
      onClick={moveHandler}
    >
      <div className="rounded bg-gray-400 px-2 py-1 text-[0.7rem] text-white">
        {category}
      </div>
      <div className="text-xl font-bold ">{title}</div>
      <div className="h-6 w-full truncate font-light text-gray-500">
        {textContent}
      </div>
      <div className="text-sm text-gray-400">
        {format(new Date(createdAt), 'yyyy년 MM월 dd일')}
      </div>
    </div>
  );
};

export default PostCard;
