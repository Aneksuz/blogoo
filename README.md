## Blogoo

This is a small blogsite that uses markdown files to keep track of and add blogposts. Used for practice and might add more advanced funtionality later on once I am more comfortable with Next.js

### Markdown formatting

```Markdown
---
Title
Date
---
CONTENT OF THE PAGE
```

#### Title

Title is used as the title for the post. This will be displayed on the homepage as a link to the blog page. On the blog page this will be displayed as a heading.

#### Date

This will display the date that the post was posted. Will displayed as a caption for both the link on the homepage and the heading on the blog site.

#### Content

The content of the page, this applies to both pages.

This is essentially the same format as the Next.js basics tutorial (as of 2021-11-03). It worked well there and as this is sort of a my own take on the tutorial blog. Might add more data to the files at a later point but this will suffice for now.

### Notes and Observations

- **[grey-matter](https://github.com/jonschlinkert/gray-matter)**, can be used to parse metadata of an markdown file. Used to fetch title and date from posts.
- **getStaticProps()** can be used to load data on server side that can later be used on client side. Useful when loading files (Markdown blog posts in this case) and then rendering them in the HTML.
- **[slug].js** can be used to have an dynamic path, in this case, [slug].js is utilized to generate a path for each seperate blog post.
