import React, { ElementType, ReactNode } from "react";
import cl from "classnames";

import styles from "./Typography.module.scss";

import vars from "@/shared/styles/vars.module.scss";

const baseClasses = cl(styles.base);

type TypographyProps = {
  children: ReactNode;
  variant?: Variant;
  color?: keyof typeof vars;
  component?: ElementType;
};

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-medium"
  | "small"
  | "small-medium"
  | "caption"
  | "caption-medium";

export const Typography = ({
  variant,
  color = "textPrimary",
  children,
  component = "p",
  ...props
}: TypographyProps) => {
  console.log(vars);

  // @ts-ignore
  const Component: ElementType = component;
  const isMedium = variant?.includes("medium");
  const mediumStyle = isMedium ? styles.medium : "";
  return (
    <Component
      className={cl(baseClasses, styles[`variant-${variant}`], mediumStyle)}
      style={{ color: vars[color] }}
      {...props}
    >
      {children}
    </Component>
  );
};