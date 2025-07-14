// src/styles/styled.d.ts
import "styled-components";
import { lightTheme } from "./theme"; // verifique o caminho relativo, pode ser '../styles/theme' dependendo da estrutura

type ThemeType = typeof lightTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
