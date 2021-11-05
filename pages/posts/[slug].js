import { promises as fs } from "fs";
import path from "path";
import * as matter from "gray-matter";

function Post(props) {
  if (!props.exists) return null;

  const { title, date, content } = props;

  return (
    <div>
      <div>{title}</div>
      <div>{date}</div>
      <div>{content}</div>
    </div>
  );
}

export default Post;

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "test" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const postPath = path.join(process.cwd(), "data", slug + ".md");

  let postData = null;

  // If File exists
  if (await fs.access(postPath)) {
    const fileContents = await fs.readFile(postPath, "utf8");

    const data = matter(fileContents);
    postData = {
      title: data.data.title,
      date: data.data.date,
      content: data.content,
    };
  }

  if (postData) {
    return {
      props: {
        title: postData.title,
        date: postData.date,
        content: postData.content,
        exists: true,
      },
    };
  }
  return {
    props: {
      exists: false,
    },
  };
}
