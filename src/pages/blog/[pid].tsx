import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next';

const Post = (props:any) => {
  const router = useRouter();
  const { pid } = router.query;
   const { sid } = router.query;

  return <p>Post: {pid} {sid}</p>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const arr: string[] = ['1','2','3']
    const paths = arr.map((pid) => {
        return {
            params: { pid },
        }
    })
    return { paths }
}

export const getStaticProps: GetStaticProps = async (context) => {
    // This is where the error occurs
    const { pid } = context.params // Property 'slug' does not exist on type 'ParsedUrlQuery | undefined'
    return pid;
}

export default Post;
