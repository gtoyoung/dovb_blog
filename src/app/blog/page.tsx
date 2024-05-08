import { ContentApi } from "services/contentful";
import { BlogPost } from "type/contentful.types";
import BlogMain from "../../../components/blog/blogMain";

const api = new ContentApi();

export default async function BlogPage() {
  const fetchData: BlogPost[] = await api.fetchBlogRecentEntries();

  return <BlogMain>{fetchData}</BlogMain>;
}
