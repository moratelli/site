import { useAtomValue } from 'jotai'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { isAndroidAtom } from '../../atoms/platformAtoms'

interface PlatformLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  iosHref: string
  androidHref: string
  children?: ReactNode
}

export const PlatformLink = ({ iosHref, androidHref, children, ...props }: PlatformLinkProps) => {
  const isAndroid = useAtomValue(isAndroidAtom)
  const href = isAndroid ? androidHref : iosHref

  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
