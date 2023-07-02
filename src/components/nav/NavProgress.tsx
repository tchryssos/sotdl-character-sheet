import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const scroll = keyframes`
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(100%)
  }
`;

const ProgressBar = styled.div`
  height: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 200;
  background-color: ${({ theme }) => theme.colors.primary};
  animation: ${scroll} 2s infinite;
`;

export function NavProgress() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', endLoading);
    router.events.on('routeChangeError', endLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', endLoading);
      router.events.off('routeChangeError', endLoading);
    };
  }, [router, startLoading, endLoading]);

  return isLoading ? <ProgressBar /> : null;
}
