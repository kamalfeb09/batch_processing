import { API_BASE_URL } from "./utils";

export const getBucketImageUrlFromFile = async (
  file,
  type = "default",
  bucketPathType,
  options = {
    sceneId: undefined,
    userDesignId: undefined,
    abortSignal: undefined,
  }
) => {
  const arr = file?.name.split(".");
  let ext = arr[arr.length - 1];

  if (type === "png") {
    ext = type;
  }

  if (ext === "svgPNG") {
    ext = "png";
  }

  // If bucketType exist, then it should upload to private bucket
  try {
    const res = await fetch(
      `${API_BASE_URL}/app/api/v2/signedURL?tool=BACKGROUND_REMOVER&ext=` + ext,
      {
        signal: options?.abortSignal,
      }
    );
    const data = await res.json();
    const uploadURL = data.uploadUrl;

    const res2 = await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type":
          ext === "psd"
            ? "application/x-photoshop"
            : ext === "svg"
            ? "image/svg+xml"
            : `image/${ext}`,
      },
      body: file,
      signal: options?.abortSignal,
    });
    if (res2.ok) {
      return uploadURL.split("?")[0];
    }
  } catch (err) {
    if (err.name !== "AbortError") {
      throw new Error(err);
    }
  }
};


export const getSignedUrls = async (count) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/app/api/v1/bulk-processing/signed-urls?count=${count}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching signed URLs:', error);
    throw error;
  }
}; 
