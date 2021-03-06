import { promises as fs } from "fs";
import path from "path";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import profilePic from "../public/profile.png";
import * as matter from "gray-matter";
import { motion } from "framer-motion";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blogoo - Tobias' personal blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <motion.div
          className="profile"
          initial={{ opacity: 0, translateY: -100, scale: 0.9 }}
          animate={{ opacity: 1, translateY: 0, scale: 1.0 }}
          transition={{ type: "spring", duration: 0.75 }}
        >
          <div className="profile--pic">
            <Image src={profilePic} alt="Site icon" layout="responsive" />
          </div>

          <h1>Tobias</h1>
        </motion.div>
        <div className="static-text">
          <div className="static-text--content">
            <p>
              Hello, my names is <b>Tobias</b>. I am an UX Designer and Front
              End Developer. This is the first thing I’ve developed with
              Next.js.I am looking forward to developing more applications but
              for now, enjoy this blog! Find more soon on my{" "}
              <a href="https://github.com/Aneksuz" target="_blank">
                Github
              </a>
            </p>

            <h2>Blog</h2>
          </div>

          {posts.map((post) => {
            return (
              <div className="blog--style">
                <p>
                  <Link
                    href={`/posts/${encodeURIComponent(
                      post.filename.slice(0, -3)
                    )}`}
                  >
                    <a>{post.title}</a>
                  </Link>
                </p>
                <p className="blog--style_caption">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), "data");
  const filenames = await fs.readdir(postsDir);

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = await fs.readFile(filePath, "utf8");

    const postData = matter(fileContents);

    return {
      filename,
      title: postData.data.title,
      date: postData.data.date,
      content: postData.content,
    };
  });

  return {
    props: {
      posts: await Promise.all(posts),
    },
  };
}
