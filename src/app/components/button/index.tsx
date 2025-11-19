import { MouseEventHandler } from 'react';
import styles from './button.module.css';
import Link from 'next/link';

interface ButtonBaseProps {
  children: React.ReactNode;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  link: string;
}

interface ButtonAsCTAProps extends ButtonBaseProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = ButtonAsCTAProps | ButtonAsLinkProps;

export default function Button({
  children,
  link,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  const combinedClassName =
    className ? `${styles.base} ${className}` :
    `${styles.base} ${styles.regular}`;
  const button = (
    <button className={combinedClassName} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
  if (link) {
    return <Link href={link}>{button}</Link>;
  }
  return button;
}
