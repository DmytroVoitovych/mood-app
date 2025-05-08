import { UploadUserFile } from "element-plus";

export type OnboardingData = {
  name: string;
  fileList: UploadUserFile[];
};

const getRawImgFile = (fileList: UploadUserFile[]) => fileList[0].raw;

export const getUserAvaterUrl = async ({ name, fileList }: OnboardingData) => {
  if (!fileList.length) return "";

  const rawFile = getRawImgFile(fileList);

  const formData = new FormData();
  formData.append("image", rawFile as File);
  formData.append("name", `avatar-for-${name || "Anonymous"}`);

  return fetch("https://mood-app-img-loader.begunec23.workers.dev/api/upload-image", {
    method: "POST",
    body: formData,
  })
    .then((url) => url.json())
    .then(({ url }: { url: string }) => url)
    .catch((err) => console.log(err));
};
