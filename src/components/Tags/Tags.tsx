import { memo } from 'react'

interface TagsProps {
  tags: string[]
}

/**
 * Displays a list of tags/keywords with consistent styling.
 *
 * Used across milestone components to show technologies, skills, or categories.
 */
export const Tags = memo(({ tags }: TagsProps) => (
  <div className="tags">
    {tags.map((tag) => (
      <span key={tag} className="tag">
        {tag}
      </span>
    ))}
  </div>
))

Tags.displayName = 'Tags'
