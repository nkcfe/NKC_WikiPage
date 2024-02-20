'use client';

import type { PostType } from '@/interface';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import PostCard from './components/PostCard';
import useSelect from '@/hooks/useSelect';
import Dropdown from '@/components/dropdown';
import Item from '@/components/dropdown/Item';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import LoadingModal from '@/components/modal/LoadingModal';
import { toast } from 'react-toastify';

interface HomeProps {
  searchParams?: {
    page?: string;
  };
}

const Home = ({ searchParams }: HomeProps) => {
  const page = searchParams?.page || '1';

  const { selected: category, selectHandler: categoryHandler } = useSelect({
    initialState: '모든 주제',
  });
  const { selected: year, selectHandler: yearHandler } = useSelect({
    initialState: '모든 연도',
  });
  const { selected: month, selectHandler: monthHandler } = useSelect({
    initialState: '모든 달',
  });
  const fetchPosts = async () => {
    const { data } = await axios(`/api/posts?page=${page}`, {
      params: { page: page, limit: 5, category, year, month },
    });
    return data;
  };

  const {
    data: posts,
    refetch,
    isLoading: isPostLoading,
  } = useQuery({
    queryKey: [`posts`, page],
    queryFn: fetchPosts,
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios('/api/categories/');
      return response.data;
    },
  });
  const { data: years, isLoading: isYearsLoading } = useQuery({
    queryKey: ['years'],
    queryFn: async () => {
      const response = await axios('/api/years/');
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
    if (year === '모든 연도' && month !== '모든 달') {
      toast.error('연도를 먼저 선택해주세요.');
      monthHandler('모든 달');
    }
  }, [category, year, month, refetch, monthHandler]);

  if (isCategoriesLoading || isYearsLoading || isPostLoading) {
    return <LoadingModal />;
  }

  return (
    <div>
      <div className="flex min-h-[calc(100vh-5rem)] flex-col">
        <div className="sticky top-0 flex h-28 w-screen items-center justify-center gap-4 bg-gray-100">
          <div className="text-sm">필터</div>
          <Dropdown type="filter" selected={category}>
            {['모든 주제', ...categories].map((categoryOption: string) => (
              <Item
                key={categoryOption}
                item={categoryOption}
                onClick={categoryHandler}
              />
            ))}
          </Dropdown>
          <Dropdown type="filter" selected={year}>
            {['모든 연도', ...years].map((yearOption: string) => (
              <Item key={yearOption} item={yearOption} onClick={yearHandler} />
            ))}
          </Dropdown>
          <Dropdown type="filter" selected={month}>
            {[
              '모든 달',
              ...Array.from({ length: 12 }, (_, index) => `${index + 1}월`),
            ].map((monthOption: string) => (
              <Item
                key={monthOption}
                item={monthOption}
                onClick={monthHandler}
              />
            ))}
          </Dropdown>
        </div>
        <div className="mx-auto px-4 py-8 md:max-w-4xl">
          <div className="divide-y divide-gray-100">
            {posts.data.length === 0 ? (
              <div className="h-full">게시물이 없습니다.</div>
            ) : (
              posts.data.map((post: PostType) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
        <Pagination
          total={posts?.totalPage}
          page={page as string}
          pathname="/"
        />
      </div>
    </div>
  );
};

export default Home;
