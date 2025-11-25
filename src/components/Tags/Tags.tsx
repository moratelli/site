import { memo } from 'react'

export const Tags = memo(({ tags }: { tags: string[] }) => (
  <div className="tags">
    {tags.map((tag) => (
      <span key={tag} className="tag">
        {tag}
      </span>
    ))}
  </div>
))

Tags.displayName = 'Tags'
