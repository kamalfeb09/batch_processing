import { ORDER_STATUS } from "./enum";
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
    const response = await fetch(
      `${API_BASE_URL}/app/api/v1/bulk-processing/workflow/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-current-workspace": "67fc01578bf5180404924e8f",
        },
        body: JSON.stringify({
          email,
          workFlowSteps: workflowSteps.map((step) => {
            const params = {};
            if (step.tool === "IMAGE_UPSCALER") {
              params.width = parseInt(step.value.width);
              params.height = parseInt(step.value.height);
            }
            return {
              tool: step.tool,
              params: params,
            };
          }),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating workflow:", error);
    throw error;
  }
};
export const USER_CANCEL_ACTION = "ERR_CANCELED";

export const createBulkProcessingJob = async (
  imageUrls,
  workflowId,
  outputs = 4,
  setOrderStatus
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/app/api/v1/bulk-processing/jobs/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_urls: imageUrls,
          workflowId,
          outputs,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    await batchProcessingPolling(data.data.order_id, setOrderStatus);
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error creating bulk processing job:", error);
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
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMxMTBkOGY0MjQ2NTFkMzFhOWM5ZjUiLCJlbWFpbCI6ImtzNzA4NTcwQGdtYWlsLmNvbSIsInBsYXRmb3JtIjoiV0VCIiwidXNlclR5cGUiOiJVTkxJTUlURUQiLCJwYWNrYWdlSWQiOiJQQUNLQUdFX0lEX1BIT1RfQUlfV0VCIiwiaWF0IjoxNzIxOTc0MjQwfQ.Nx8W3WV43i7YwD9ZtQKWZrRuesCICapAdf9L5sKKLLgDdNZczOdGVy5ujIHQzv_gnyMdmFVlX5TGkegGvYo664Ztqqc4B2T4hETSXTT-XJKkmQ5G0LCbM9ZNGEu03-tkdIeg6QoU5mw9F8qazvEdh1P2xYZl846Yp7KiP8UCyvHwhE_kcnuTQ7XDrpcu4tjyBzUSeov-si2s2zeHQ0G_ADcAuOsSCdtsnsjqCbGWhfVDEAWOMyVrbpcXZ3636r9JNbt6GsVDvf3-_pxzrmwyGhjVM-kG8Bui2S9JarUzD8gIYNjJn30GfPJzIcqHWdRFfYPRIDLYPdzu2M0xbX2K8w`,
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

export const poll = async ({
  fn,
  validate,
  interval,
  maxAttempts,
  setOrderStatus,
  setPolling,
  passData,
}) => {
  let attempts = 0;

  console.log(
    "kamalpoll",

    setOrderStatus
  );
  //@ts-ignore
  const executePoll = async (resolve, reject) => {
    if (!navigator.onLine) {
      reject(new Error("NO_INTERNET_CONNECTION"));
    }
    const result = await fn().catch((err) => {
      if (err.message === USER_CANCEL_ACTION) {
        reject(new Error(USER_CANCEL_ACTION));
      }

      if (err.code === 222) {
        reject({
          message: err.message,
          code: err.code,
        });
      }

      reject(
        new Error(
          "An error occured while processing your image. Please try again later"
        )
      );
    });
    console.log("kamalentered");
    attempts++;

    const setOrderStatusWrapper = (statusCode, status) => {
      if (passData) {
        setOrderStatus({
          order_status_code: statusCode,
          order_status: status,
        });
      } else {
        setOrderStatus((prev) => ({
          ...prev,
          orderStatus: {
            ...prev?.orderStatus,
            order_status_code: statusCode,
            order_status: status,
          },
        }));
      }
    };

    const validationResult = validate(result, setOrderStatusWrapper);
    if (validationResult.currentOrderStatus === ORDER_STATUS.SUCCESS) {
      return resolve(result);
    } else if (validationResult.currentOrderStatus === ORDER_STATUS.ERROR) {
      if (setOrderStatus) {
        if (passData) {
          setOrderStatus({
            order_status_code: result.order_status_code,
            order_status: result.order_status,
          });
        } else {
          setOrderStatus((prev) => ({
            ...prev,
            orderStatus: {
              ...prev.orderStatus,
              order_status_code: result.order_status_code,
              order_status: result.order_status,
            },
          }));
        }
      }
      result.message = result.message
        ? result.message
        : result.order_status_code;
      result.status = result.status ? result.status : result.order_status;
      return reject({
        status: result.order_status_code,
        message: result.order_status,
      }); // Returning status code in string format - handle it using parseInt
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject({
        status: 504,
        message: "Order took too long. Please try again.",
      }); // Returning status code 504 for max_attempts_exceeded - in string format - handle it using parseInt
    } else {
      if (setPolling) {
        // Store polling ID in state for cancellation
        const timeoutId = setTimeout(executePoll, interval, resolve, reject);
        setPolling(timeoutId);
      } else {
        // orderStatus = pending and number of attempts haven't exhausted
        setTimeout(executePoll, interval, resolve, reject);
      }
    }
  };

  return new Promise(executePoll);
};
export const HISTORY_TOTAL_POLLING_TIME = 1000 * 60 * 5;

export const validateOrderStatus = (result, setOrderStatus) => {
  if (result) {
    const { order_status_code = null, order_status = null } = result;
    if (order_status_code) {
      if (order_status_code < 200) {
        // Pending State
        setOrderStatus(order_status_code, order_status);
        return { currentOrderStatus: ORDER_STATUS.PENDING, ...result };
      } else if (order_status_code === 200) {
        // Successful State
        setOrderStatus(order_status_code, order_status);
        return { currentOrderStatus: ORDER_STATUS.SUCCESS, ...result };
      } else if (order_status_code === 417) {
        setOrderStatus(order_status_code, order_status);
        return { currentOrderStatus: ORDER_STATUS.ERROR, ...result };
      } else if (order_status_code === 422) {
        setOrderStatus(order_status_code, order_status);
        return { currentOrderStatus: ORDER_STATUS.ERROR, ...result };
      } else if (order_status_code === 501) {
        setOrderStatus(order_status_code, order_status);
        return { currentOrderStatus: ORDER_STATUS.ERROR, ...result };
      } else if (order_status_code === 503) {
        setOrderStatus(order_status_code, order_status);
        return { currentOrderStatus: ORDER_STATUS.ERROR, ...result };
      } else if (order_status_code === 504) {
        setOrderStatus(order_status_code, order_status);
        return { currentOrderStatus: ORDER_STATUS.ERROR, ...result };
      } else if (order_status_code === 404) {
        setOrderStatus(order_status_code, order_status);
        return {
          currentOrderStatus: ORDER_STATUS.ERROR,
          ...result,
        };
      } else {
        // Case: order_status_code = null || order_status_code >= 500 (discussed error) || un-recognised/un-discussed status code
        setOrderStatus(order_status_code, order_status);
        return {
          currentOrderStatus: ORDER_STATUS.ERROR,
          ...result,
        };
      }
    } else {
      // when result is null or undefined
      setOrderStatus(order_status_code, order_status);
      return { currentOrderStatus: ORDER_STATUS.ERROR, result: null };
    }
  }
};
export const batchProcessingPolling = (
  orderId,
  pollingInterval = 20000,
  setOrderStatus,
  setPolling
) =>
  poll({
    fn: () => getOrderstatusByOrderId(orderId),
    validate: validateOrderStatus,
    interval: pollingInterval,
    maxAttempts: Math.ceil(HISTORY_TOTAL_POLLING_TIME / pollingInterval),
    setOrderStatus: setOrderStatus,
    setPolling: setPolling,
  });
