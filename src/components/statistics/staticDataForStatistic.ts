import {
  DecreaseIco,
  HappyIco,
  HappyWhiteIco,
  IncreaseIco,
  NeutralIco,
  NeutralWhiteIco,
  SadIco,
  SadWhiteIco,
  SameIco,
  VeryHappyIco,
  VeryHappyWhiteIco,
  VerySadIco,
  VerySadWhiteIco,
} from "~/assets/iconImport";

const mood: Record<string, { text: string; imgSvg: string; imageWhite: string; bgVar: string }> = {
  "2": {
    text: "Very Happy",
    imgSvg: VeryHappyIco,
    imageWhite: VeryHappyWhiteIco,
    bgVar: "var(--amber-300)",
  },
  "1": { text: "Happy", imgSvg: HappyIco, imageWhite: HappyWhiteIco, bgVar: "var(--green-300)" },
  "0": {
    text: "Neutral",
    imgSvg: NeutralIco,
    imageWhite: NeutralWhiteIco,
    bgVar: "var(--blue-300)",
  },
  "-1": { text: "Sad", imgSvg: SadIco, imageWhite: SadWhiteIco, bgVar: "var(--indigo-200)" },
  "-2": {
    text: "Very Sad",
    imgSvg: VerySadIco,
    imageWhite: VerySadWhiteIco,
    bgVar: "var(--red-300)",
  },
};

const sleep = {
  "1": { percent: 23, text: "0-2 hours" },
  "3.5": { percent: 43, text: "3-4 hours" },
  "5.5": { percent: 63, text: "5-6 hours" },
  "7.5": { percent: 83, text: "7-8 hours" },
  "9": { percent: 102, text: "9+ hours" },
};

const trend = {
  same: {
    text: "Same as the previous 5 check-ins",
    ico: SameIco,
  },
  increase: {
    text: "Increase from the previous 5 check-ins",
    ico: IncreaseIco,
  },
  decrease: {
    text: "Decrease from the previous 5 check-ins",
    ico: DecreaseIco,
  },
};

export { mood, sleep, trend };
