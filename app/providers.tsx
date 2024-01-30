"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <MantineProvider>{children}</MantineProvider>
    </ThemeProvider>
  );
};
