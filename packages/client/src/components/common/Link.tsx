/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'

import MuiLink from '@material-ui/core/Link'
import clsx from 'clsx'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const NextComposed = React.forwardRef(function NextComposed(props: any, ref) {
  const { as, href, ...other } = props

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

function Link(props: any): JSX.Element {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    )
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  )
}

// eslint-disable-next-line react/display-name
export default React.forwardRef((props: any, ref): any => (
  <Link {...props} innerRef={ref} />
))
