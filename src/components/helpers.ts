export const getCurrentDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const createDateList = (days: number): readonly string[] => {
  const option: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const getdayAgo = (num: number) => new Date().getTime() - 24 * 60 * 60 * +`${num}000`;

  const dateList: string[] = [];

  for (let i = days - 1; i >= 0; --i) {
    const date = i
      ? new Date(getdayAgo(i)).toLocaleDateString("en-US", option)
      : new Date().toLocaleDateString("en-US", option);

    dateList.push(date);
  }
  return dateList;
};
