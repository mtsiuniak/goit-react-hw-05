
export default function MovieReviewItem({
  data: {
    author,
    content,
  },
}) {

  return (
    <>
      <h2 >{author}</h2>
      <p>{content}</p>
    </>
  );
}

