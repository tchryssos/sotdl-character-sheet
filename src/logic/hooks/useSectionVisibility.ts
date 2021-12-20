type VisibilityTriplet = `${number}:${string}:${boolean}`;

type VisibilityObj = {
  [key: `${number}`]: {
    [key: string]: boolean;
  };
};

const visKey = 'sectionVisibility';

export const useSectionVisibility = () => {
  const sectionVisibityString = localStorage.getItem(visKey) || '';

  let visibilityObject: VisibilityObj = {};

  if (sectionVisibityString) {
    const visibilityTriplets = sectionVisibityString.split(' ') as
      | VisibilityTriplet[];

    visibilityObject = visibilityTriplets.reduce((acc, curr) => {
      const [id, sectionTitle, isVisible] = curr.split(':') as [
        `${number}`,
        string,
        `${boolean}`
      ];

      acc[id] = { ...acc[id], [sectionTitle]: isVisible === 'true' };

      return acc;
    }, {} as VisibilityObj);
  }

  const setSectionVisibility = (
    id: number,
    title: string,
    isVisible: boolean
  ) => {
    localStorage.setItem(
      visKey,
      `${id}:${title}${isVisible} ${sectionVisibityString}`
    );
  };

  return { visibilityObject, setSectionVisibility };
};
