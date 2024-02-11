'use client';

import Tiptap from '@/app/write/editor';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { CSSObjectWithLabel, SingleValue } from 'react-select';
import ReactSelect from 'react-select/creatable';
import Focus from '@tiptap/extension-focus';
import { PostType } from '@/interface';
import { useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingModal from '@/components/modal/LoadingModal';

interface PostProps {
  params: { id: number };
}

const Edit = (props: PostProps) => {
  const { id } = props.params;
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [category, setCategory] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const fetchStore = async () => {
    const { data } = await axios(`/api/posts?id=${id}`);
    return data as PostType;
  };

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios('/api/categories');
      return response.data;
    },
  });

  const { data: post, isFetching } = useQuery({
    queryKey: ['post', id],
    queryFn: fetchStore,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '텍스트를 선택해 에디터를 사용해보세요.',
        showOnlyCurrent: false,
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  });

  const handleSubmit = async () => {
    const title = titleRef.current?.value;
    const content = editor?.getHTML();
    const isContentEmpty = editor?.isEmpty;

    if (!category) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }

    if (!title) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (isContentEmpty) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    try {
      const res = await axios.put(`/api/posts`, {
        ...post,
        title: title,
        content: content,
        category: category,
      });

      if (res.status === 200) {
        toast.success('게시물 수정에 성공했습니다.');
        router.replace(`/posts/${res?.data?.id}`);
      } else {
        toast.error('게시물 수정에 실패했습니다.');
      }
    } catch (e) {
      toast.error('게시물 수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (post && editor && editor.isEmpty) {
      editor.commands.setContent(post.content);
      setCategory(post.category);
    }
  }, [editor, post]);

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
          취소
        </Button>
        <Button
          variant="blue"
          shape="primary"
          size="medium"
          weight="normal"
          onClick={handleSubmit}
        >
          수정
        </Button>
      </div>
      <div className="mt-4 flex h-full flex-col items-center justify-start gap-6">
        <div className="hidden text-base font-bold sm:block">
          {format(new Date(), 'yyyy년 MM월 dd일')}
        </div>
        {isMounted && (
          <ReactSelect
            options={(categories ?? []).map((category: string) => ({
              label: category,
              value: category,
            }))}
            placeholder="입력하여 새로운 카테고리 추가"
            isMulti={false}
            className="mr-auto"
            onChange={(
              e: SingleValue<{
                label: string;
                value: string;
              }>,
            ) => e && setCategory(e?.value)}
            styles={selectStyle}
            defaultValue={
              post && { label: post.category, value: post.category }
            }
          />
        )}

        <Input
          ref={titleRef}
          placeholder="제목을 입력해주세요."
          className="w-full p-2 text-3xl font-bold"
          defaultValue={post?.title}
        />
        <Tiptap editor={editor} content={post?.content} />
      </div>
    </div>
  );
};

export default Edit;

const selectStyle = {
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: '#E5E7EB',
    border: 'none',
    borderRadius: '0.75rem',
    color: '#fff',
    fontSize: '14px',
  }),
  placeholder: (styles: CSSObjectWithLabel) => ({
    ...styles,
    fontSize: '14px',
  }),
  input: (styles: CSSObjectWithLabel) => ({
    ...styles,

    fontSize: '14px',
  }),
};
