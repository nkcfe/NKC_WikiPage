'use client';

import React, { useEffect, useRef, useState } from 'react';
import Tiptap from './editor';
import { format } from 'date-fns';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';
import ReactSelect from 'react-select/creatable';
import { CSSObjectWithLabel, SingleValue } from 'react-select';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Focus from '@tiptap/extension-focus';
import { toast } from 'react-toastify';
import LoadingModal from '@/components/modal/LoadingModal';

const Write = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  

  const [category, setCategory] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios('/api/categories');
      return response.data;
    },
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
    onFocus: () => {},

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
      const res = await axios.post('/api/posts', { title, content, category });

      if (res.status === 200) {
        toast.success('게시물 등록에 성공했습니다.');
        router.replace(`/posts/${res?.data?.id}`);
      } else {
        toast.error('게시물 등록에 실패했습니다.');
      }
    } catch (e) {
      toast.error('게시물 등록에 실패했습니다.');
    }
  };

  useEffect(() => setIsMounted(true), []);

  if (isLoading) {
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
          onClick={() => router.push('/')}
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
          저장
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
          />
        )}

        <Input
          ref={titleRef}
          placeholder="제목을 입력해주세요."
          className="w-full p-2 text-xl"
        />
        <Tiptap editor={editor} />
      </div>
    </div>
  );
};

export default Write;

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
