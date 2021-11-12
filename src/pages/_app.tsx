import { css, Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import type { AppProps /* , AppContext */ } from 'next/app';
import { useEffect, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { ColorMode, Theme, themes } from '~/constants/theme';
import { AuthContext } from '~/logic/contexts/authContext';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';
import { ThemeContext } from '~/logic/contexts/themeContext';
import { User } from '~/typings/auth';
import { BreakpointSize } from '~/typings/theme';
import { pxToRem } from '~/utils/styles';

const marPadZero = css`
  margin: 0;
  padding: 0;
`;

const baseStyle = css`
  height: 100%;
  width: 100%;
  ${marPadZero};
`;

const createGlobalStyles = (theme: Theme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Uchen&display=swap');
  html {
    background-color: ${theme.colors.background};
    ${baseStyle};
  }
  body {
    ${baseStyle};
    position: relative;
    box-sizing: border-box;
    font-family: ${theme.fontFamily.normal};
    color: ${theme.colors.text};
  }
  #app,
  #__next {
    ${baseStyle};
  }
  div,
  input,
  select,
  textarea {
    box-sizing: border-box;
  }
  input,
  select,
  textarea {
    font-family: ${theme.fontFamily.normal};
    background-color: ${theme.colors.accentLight};
    color: ${theme.colors.text};
    border-radius: ${pxToRem(4)};
    border-width: ${theme.border.borderWidth[1]};
    :disabled {
      background-color: ${theme.colors.smudge};
    }
  }
  p,
  h1,
  h2,
  h3,
  pre,
  figure {
    ${marPadZero};
  }
`;

const GlobalWrapper = styled(FlexBox)`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
`;

const emptyUser = { isAuthenticated: false };

const Page: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [windowBreakpoints, setWindowBreakpoints] = useState<BreakpointSize[]>([
    'xxs',
  ]);
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const theme = themes[colorMode];
  const [user, setUser] = useState<User>(emptyUser);

  useEffect(() => {
    Object.keys(theme.breakpointValues).forEach((key, i, arr) => {
      const queryAdjective = key === 'xss' ? 'max' : 'min';
      const query = window.matchMedia(
        `(${queryAdjective}-width: ${
          theme.breakpointValues[key as BreakpointSize]
        }px)`
      );
      if (query.matches) {
        setWindowBreakpoints(arr.slice(0, i + 1) as BreakpointSize[]);
      }
      query.addEventListener('change', (e) => {
        setWindowBreakpoints(
          arr.slice(0, e.matches ? i + 1 : i) as BreakpointSize[]
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ user, setUser }}>
          <BreakpointsContext.Provider value={windowBreakpoints}>
            <GlobalWrapper>
              <Global styles={createGlobalStyles(theme)} />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </GlobalWrapper>
          </BreakpointsContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line import/no-default-export
export default Page;
