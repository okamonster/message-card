"use client";

import { Button } from "@mantine/core";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { ButtonProps } from "@mantine/core";

type Props = ComponentPropsWithoutRef<typeof Link> &
  Omit<ButtonProps, "component">;

export const LinkButton = ({ ...props }: Props): React.ReactNode => {
  return <Button component={Link} {...props} />;
};
