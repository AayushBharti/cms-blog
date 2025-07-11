import { groq } from "next-sanity";

// GROQ to get all posts
export const allPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  author->{ name, image },
  categories[]->{ title, slug }
}
`;

// GROQ to get all category slugs
export const allCategorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current)][]{
    title,
    description,
    "slug": slug.current
  }
`;

// GROQ to get posts under a given category title
export const postsByCategoryQuery = groq`
  *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    author->{ name, image },
    categories[]->{ title, slug }
  }
`;

// GROQ to get a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    body,
    author->{
      name,
      image{
        asset->{
          url
        }
      }
    },
    categories[]->{
      title,
      slug
    }
  }
`;
