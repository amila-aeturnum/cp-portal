import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;
   const { sid } = router.query;

  return <p>Post: {pid} {sid}</p>;
};

export default Post;
