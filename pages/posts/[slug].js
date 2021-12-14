import { promises as fs } from "fs";
import path from "path";
import * as matter from "gray-matter";
import Image from "next/image";
import profilePic from "../../public/profile.png";
import ArrowSVG from "../../public/arrow.svg";
import Link from "next/Link";
import { motion } from "framer-motion";

function Post(props) {
  if (!props.exists) return null;

  const { title, date, content } = props;

  return (
    <div>
      <Link href="../../">
        <motion.a
          className="nav--goback"
          whileHover={{
            backgroundColor: "rgba(0, 151, 243, 0.2)",
            scale: 1.4,
            transition: { duration: 0.5 },
          }}
        >
          <svg
            width="30"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807613 11.0711 0.807613 10.4853 1.3934L0.93934 10.9393ZM30 10.5L2 10.5L2 13.5L30 13.5L30 10.5Z"
              fill="#0070f3"
            />
          </svg>
        </motion.a>
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
        transition={{ type: "spring", duration: 0.5 }}
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
