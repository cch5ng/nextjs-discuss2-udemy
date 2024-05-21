const paths = {
  home() {
    return '/';
  },
  topicShow(slug: string) {
    return `/topics/${slug}`;
  },
  postCreate(slug: string) {
    return `/topics/${slug}/posts/new`;
  },
  postShow(slug: string, postId: string) {
    return `/topics/${slug}/posts/${postId}`;
  },
  search(term: string) {
    return `/search?term=${term}`
  }
}

export default paths;
