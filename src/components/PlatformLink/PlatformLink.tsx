import { useAtomValue } from 'jotai'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { isAndroidAtom } from '../../atoms/platformAtoms'

interface PlatformLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  iosHref: string
  androidHref: string
  children?: ReactNode
}

/**
 * Platform-aware link component that adapts URLs based on user's device.
 *
 * Automatically detects Android vs iOS/desktop and renders appropriate app store links.
 * Useful for linking to mobile apps with different stores for each platform.
 *
 * @example
 * ```tsx
 * <PlatformLink
 *   iosHref="https://apps.apple.com/app/myapp"
 *   androidHref="https://play.google.com/store/apps/details?id=com.myapp"
 * >
 *   Download App
 * </PlatformLink>
 * ```
 */
export const PlatformLink = ({ iosHref, androidHref, children, ...props }: PlatformLinkProps) => {
  const isAndroid = useAtomValue(isAndroidAtom)
  const href = isAndroid ? androidHref : iosHref

  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
