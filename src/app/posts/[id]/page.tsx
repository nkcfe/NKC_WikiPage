'use client';

import Button from '@/components/Button';
import LoadingModal from '@/components/modal/LoadingModal';
import { PostType } from '@/interface';
import axios from 'axios';
import { format } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useQuery } from 'react-query';

interface PostProps {
  params: { id: number };
}

const Post = (props: PostProps) => {
  const { id } = props.params;

  const router = useRouter();
  const currentPath = usePathname();

  const fetchStore = async () => {
    const { data } = await axios(`/api/posts?id=${id}`);
    return data as PostType;
  };

  const { data: post, isFetching } = useQuery({
    queryKey: ['post', id],
    queryFn: fetchStore,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <LoadingModal />;
  }

  return (
    <div className="mx-auto px-4 py-8 md:max-w-4xl">
      <div className="flex h-14 items-center justify-between gap-2">
        <Button
          variant="white"
          shape="primary"
          size="medium"
          weight="normal"
          onClick={() => router.back()}
        >
          뒤로가기
        </Button>
        <Button
          variant="blue"
          shape="primary"
          size="medium"
          weight="normal"
          onClick={() => router.push(currentPath + '/edit')}
        >
          수정하기
        </Button>
      </div>
      <div className="mt-10 flex h-full flex-col items-start justify-start gap-6">
        <div className="flex gap-2 ">
          <div className="rounded bg-gray-400 px-2 py-1 text-[0.7rem] text-white">
            {post?.category}
          </div>
          <div className="hidden text-base font-bold sm:block">
            {format(new Date(), 'yyyy년 MM월 dd일')}
          </div>
        </div>

        <div className="w-full text-3xl font-bold">{post?.title}</div>
        <div dangerouslySetInnerHTML={{ __html: post?.content ?? '' }} />
      </div>
    </div>
  );
};

export default Post;
