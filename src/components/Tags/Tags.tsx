export const Tags = ({ tags }: { tags: string[] }) => (
  <div className="tags">
    {tags.map((tag) => (
      <span key={tag} className="tag">
        {tag}
      </span>
    ))}
  </div>
)
