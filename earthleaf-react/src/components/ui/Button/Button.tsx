import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../../lib/classNames';
import { isRouteHref } from '../../../lib/href';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'outline' | 'light';
export type ButtonSize = 'default' | 'small';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// Every `.btn` in the source is an <a> (hash link or external URL); this
// stays polymorphic so a future actual <button type="submit"> use isn't
// blocked. A `href` pointing at an in-app route renders a react-router
// <Link> instead of an <a> so it doesn't full-page-reload — the decision
// lives in lib/href.ts, shared with Nav and Footer.
type ButtonAsLink = ButtonOwnProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };
type ButtonAsButton = ButtonOwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** `.btn` / `.btn-small` / `.btn-outline` / `.btn-light` from the source, as one component. */
export default function Button(props: ButtonProps) {
  const { variant = 'solid', size = 'default', className, children, href, ...rest } = props;

  const classes = classNames(
    styles.btn,
    variant === 'outline' && styles.outline,
    variant === 'light' && styles.light,
    size === 'small' && styles.small,
    className,
  );

  if (href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (isRouteHref(href)) {
      return (
        <Link className={classes} to={href} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
