'use client';

import { BubbleMenu, Editor, EditorContent, FloatingMenu } from '@tiptap/react';
import { useEffect, useState } from 'react';
import Menu from './Menu';
import VerticalMenu from './VerticalMenu';

interface TiptapProps {
  editor: Editor | null;
  content?: string;
}

const Tiptap = (props: TiptapProps) => {
  const { editor } = props;
  const [isEditable] = useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <>
      <div className="min-h-full w-full">
        <EditorContent editor={editor} />
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <Menu editor={editor} />
          </BubbleMenu>
        )}
        {editor && (
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <VerticalMenu editor={editor} />
          </FloatingMenu>
        )}
      </div>
    </>
  );
};

export default Tiptap;
