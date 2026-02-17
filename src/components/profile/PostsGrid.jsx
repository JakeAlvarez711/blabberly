import PostGrid from "../PostGrid/PostGrid";

export default function PostsGrid({ posts, loading, onSelectPost, emptyText = "No posts yet." }) {
  if (loading) {
    return <div style={styles.loading}>Loading posts...</div>;
  }

  return (
    <div style={styles.container}>
      <PostGrid
        posts={posts}
        emptyText={emptyText}
        onSelectPost={onSelectPost}
        tileBackground="#F5F5F5"
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "0 24px",
  },
  loading: {
    padding: "24px",
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
};
