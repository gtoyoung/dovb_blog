import { ContentApi } from "services/contentful";
import { BlogPost } from "type/contentful.types";
import { BlogDetail } from "components/blog/blogDetail";

const api = new ContentApi();

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const slug: string = params.slug;

  const fetchData: BlogPost = await api.fetchBlogById(slug);

  return <BlogDetail>{fetchData}</BlogDetail>;
}
