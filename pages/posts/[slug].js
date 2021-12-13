import { promises as fs } from "fs";
import path from "path";
import * as matter from "gray-matter";
import Image from "next/image";
import profilePic from "../../public/profile.png";
import Link from "next/Link";
import { motion } from "framer-motion";

function Post(props) {
  if (!props.exists) return null;

  const { title, date, content } = props;

  return (
    <div>
      <Link href="../../">
        <a className="nav--goback">Go back</a>
      </Link>
      <div className="profile">
        <div className="profile--pic">
          <Image src={profilePic} alt="Site icon" layout="responsive" />
        </div>

        <h1>Tobias</h1>
      </div>
      <motion.div
        className="blog--page"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div>
          <h2>{title}</h2>
        </div>
        <div className="blog--style_caption">{date}</div>
        <div>
          <p>{content}</p>
        </div>
      </motion.div>
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

  try {
    await fs.access(postPath); // Throws an error if file doesn't exist.
  } catch {
    // If we can't acces the file return an empty data set
    return {
      props: {
        exists: false,
      },
    };
  }

  const fileContents = await fs.readFile(postPath, "utf8");

  const { data, content } = matter(fileContents);
  return {
    props: {
      title: data.title,
      date: data.date,
      content: content,
      exists: true,
    },
  };
}
