import { MoodForm } from "~/composables/globalMoodState";

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

export const getMediane = (arr: MoodForm[], key: keyof MoodForm) => {
  if (!arr?.length) return null;
  console.log(arr.toSorted((a, b) => +a[key] - +b[key]));
  // Median formula:
  // firstly sort numbers
  // If n is odd: Median = value at position (n + 1) / 2 - 1
  const numPosition = (arr.length + 1) / 2 - 1; // only for odd
  return arr.toSorted((a, b) => +a[key] - +b[key])[numPosition][key].toString();
};
