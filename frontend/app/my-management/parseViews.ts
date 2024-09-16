export const parseViews = (views: number): string => {
  //   if (views < 1000) return (views.toString());
  if (views < 1000000) return `${(views / 1000).toFixed(2)}K`;
  if (views < 1000000000) return `${(views / 1000000).toFixed(2)}M`;
  if (views < 1000000000000) return `${(views / 1000000000).toFixed(2)}B`;
  if (views < 1000000000000000) return `${(views / 1000000000000).toFixed(2)}T`;
  return views.toString();
};
