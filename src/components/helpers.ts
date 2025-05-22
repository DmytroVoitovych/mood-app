export const getCurrentDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const createDateList = (days: number): readonly Record<string, string>[] => {
  const option: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const optionForFullData: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const getdayAgo = (num: number) => new Date().getTime() - 24 * 60 * 60 * +`${num}000`;

  const dateList: Record<string, string>[] = [];

  for (let i = days - 1; i >= 0; --i) {
    const date = i
      ? {
          [new Date(getdayAgo(i)).toLocaleDateString("en-US", option)]: new Date(
            getdayAgo(i),
          ).toLocaleDateString("en-US", optionForFullData),
        }
      : {
          [new Date().toLocaleDateString("en-US", option)]: new Date().toLocaleDateString(
            "en-US",
            optionForFullData,
          ),
        };

    dateList.push(date);
  }

  return dateList;
};
