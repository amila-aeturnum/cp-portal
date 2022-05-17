import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { sid } = router.query;

  return (
    <p>
      Post: {pid} {sid}
    </p>
  );
};

interface Ibooks {
  category:string;
}

const booksArray: Array<Ibooks> = [
  {
    category: "test1"
  },
  {
    category: "test"
  },
];
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = booksArray.map((book) => ({
    params: { pid: book.category },
  }));

  return { paths, fallback: false };
};



export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const category = params?.pid;

    //const item = booksArray.find((data) => data.category === category);

    return { props: { category } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
export default Post;
