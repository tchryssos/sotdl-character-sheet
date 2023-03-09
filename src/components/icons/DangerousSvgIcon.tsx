/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import DOMPurify from 'dompurify';
import { SVGProps, useEffect, useState } from 'react';

async function fetchAndParseSVG(url: string): Promise<string> {
  const response = await fetch(url);
  const svgText = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(
    DOMPurify.sanitize(svgText),
    'image/svg+xml'
  );
  const svgElement = doc.querySelector('svg');

  if (!svgElement) {
    throw new Error('No SVG element found in SVG file');
  }

  return svgElement.innerHTML;
}

const FilledSvg = styled.svg`
  shape-rendering: crispEdges;
  * {
    fill: ${({ theme }) => theme.colors.text};
  }
`;

interface DangerousSvgIconProps extends SVGProps<SVGSVGElement> {
  url: string;
}

export function DangerousSvgIcon({ url, ...rest }: DangerousSvgIconProps) {
  const [parsedSvg, setParsedSvg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSvg() {
      try {
        const svgContent = await fetchAndParseSVG(url);
        setParsedSvg(svgContent);
      } catch (error) {
        setParsedSvg(null);
      }
    }

    fetchSvg();
  }, [url]);

  return parsedSvg ? (
    <FilledSvg {...rest} dangerouslySetInnerHTML={{ __html: parsedSvg }} />
  ) : null;
}
