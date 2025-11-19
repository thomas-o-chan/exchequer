import { MouseEventHandler } from "react";
import styles from "./button.module.css";
import Link from "next/link";

interface ButtonBaseProps {
  children: React.ReactNode;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  link: string;
  onClick?: never;
}

interface ButtonAsCTAProps extends ButtonBaseProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = ButtonAsCTAProps | ButtonAsLinkProps;

export function Button({
  children,
  link,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  const combinedClassName = className
    ? `${styles.base} ${className}`
    : `${styles.base} ${styles.regular}`;
  if (link) {
    return (
      <Link href={link} className={styles.link}>
        {getButtonComponent({
          className: combinedClassName,
          children,
          disabled,
          isFocusable: false,
        })}
      </Link>
    );
  }
  return getButtonComponent({
    className: combinedClassName,
    children,
    disabled,
    onClick,
    isFocusable: true,
  });
}

interface GetButtonComponentProps {
  className: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isFocusable?: boolean;
  children: React.ReactNode;
}

function getButtonComponent({
  className,
  disabled = false,
  onClick,
  isFocusable = true,
  children,
}: GetButtonComponentProps) {
  return (
    <button
      tabIndex={isFocusable ? 0 : -1}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
