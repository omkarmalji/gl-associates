import { Link, NavLink, type LinkProps, type NavLinkProps } from "react-router-dom";

/**
 * Every in-app navigation runs through the View Transitions API so pages
 * cross-fade instead of cutting. Browsers without support fall back to an
 * ordinary instant navigation.
 */
export function PageLink(props: LinkProps) {
  return <Link viewTransition {...props} />;
}

export function PageNavLink(props: NavLinkProps) {
  return <NavLink viewTransition {...props} />;
}
