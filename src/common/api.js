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

export const uploadImageToS3 = async (signedUrls, files) => {
  try {
    const uploadPromises = signedUrls.map(async (signedUrl, index) => {
      const file = files[index];
      const response = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    });

    await Promise.all(uploadPromises);

    return {
      success: true,
      urls: signedUrls?.map((url) => url.split("?")[0]),
    };
  } catch (error) {
    console.error("Error uploading images:", error);
    return false;
  }
};

export const getSignedUrls = async (count) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/app/api/v1/bulk-processing/signed-urls?count=${count}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching signed URLs:", error);
    throw error;
  }
};

export const createWorkflow = async (email, workflowSteps) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app/api/v1/bulk-processing/workflow/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-current-workspace': '67fc01578bf5180404924e8f'
      },
      body: JSON.stringify({
        email,
        workFlowSteps: workflowSteps.map(step => {
          const params = {};
          if (step.tool === 'IMAGE_UPSCALER') {
            params.width = parseInt(step.value.width);
            params.height = parseInt(step.value.height);
          }
          return {
            tool: step.tool,
            params: params
          };
        })
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating workflow:', error);
    throw error;
  }
};

export const createBulkProcessingJob = async (imageUrls, workflowId, outputs = 4) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app/api/v1/bulk-processing/jobs/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_urls: imageUrls,
        workflowId,
        outputs
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating bulk processing job:', error);
    throw error;
  }
};

  export const getOrderstatusByOrderId = async (orderId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/app/api/v5/user_activity/getUserActivity?order_id=${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching signed URLs:", error);
      throw error;
    }
  };