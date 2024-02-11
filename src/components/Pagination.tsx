import Button from './Button';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  total?: number;
  page: string;
  pathname: string;
}

export default function Pagination(props: PaginationProps) {
  const { total, page, pathname } = props;

  const router = useRouter();

  return (
    <div className="mb-10 mt-auto flex items-center justify-center gap-20">
      <Button
        variant="gray"
        shape="full"
        onClick={() => router.push(`${pathname}?page=${parseInt(page) - 1}`)}
        disabled={parseInt(page) === 1}
      >
        <RiArrowDropLeftLine size={40} />
      </Button>
      <div>{`${page} / ${total}`}</div>
      <Button
        variant="gray"
        shape="full"
        onClick={() => router.push(`${pathname}?page=${parseInt(page) + 1}`)}
        disabled={parseInt(page) === total}
      >
        <RiArrowDropRightLine size={40} />
      </Button>
    </div>
  );
}
