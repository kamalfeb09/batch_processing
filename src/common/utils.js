import { PHOT_AI_TOOLS } from "./enum";

export const API_BASE_URL = import.meta.env.VITE_API_URL_DEV;

export const CURRENT_SCREEN = {
  LOGIN_SCREEN: "LOGIN_SCREEN",
  UPLOAD_SCREEN: "UPLOAD_SCREEN",
  BULK_PROCESS_SCREEN: "BULK_PROCESS_SCREEN",
};
export const BATCH_PROCESS_TOOLS = [
  {
    id: "BACKGROUND_REMOVER",
    name: "Background Remover",
    description: "Remove the background of an image",
    video:
      "https://strapi-wasabi-bucket-prod-cdn.phot.ai/bg_remover_new_82e568d1f5.mp4",
    tool: PHOT_AI_TOOLS.BACKGROUND_REMOVER,
  },
  {
    id: "BACKGROUND_REPLACER",
    name: "Background Replacer",
    description: "Replace the background of an image",
    video:
      "https://strapiassets.s3.us-east-2.wasabisys.com/bg_replacer_e7a543cc69.mp4",
    tool: PHOT_AI_TOOLS.BACKGROUND_REPLACER,
  },
  {
    id: "IMAGE_ENHANCER",
    name: "Image Enhancer",
    description: "Enhance the quality of an image",
    video:
      "https://strapi-wasabi-bucket-prod-cdn.phot.ai/photo_enhancer_924b2637c8.mp4",
    tool: PHOT_AI_TOOLS.AI_PHOTO_ENHANCER,
  },
  {
    id: "IMAGE_UPSCALER",
    name: "Image Upscaler",
    description: "Upscale the size of an image",
    video:
      "https://strapiassets.s3.us-east-2.wasabisys.com/image_Upscaler_9be710d40a.mp4?isPopular=false",
    tool: PHOT_AI_TOOLS.IMAGE_UPSCALER,
  },
  {
    id: "AI_EXTENDER",
    name: "AI Extender",
    description: "Extend the size of an image",
    video:
      "https://strapiassets.s3.us-east-2.wasabisys.com/Uncrop_image_a25eab0ca1.mp4?isPopular=false",
    tool: PHOT_AI_TOOLS.AI_EXTENDER,
  },
  {
    id: "PRODUCT_SHADOW",
    name: "Product Shadow",
    description: "Add a shadow to a product",
    isImage: true,
    video:
      "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    tool: PHOT_AI_TOOLS.PRODUCT_SHADOW,
  },
  {
    id: "BACKGROUND_BLUR",
    name: "Background Blur",
    description: "Blur the background of an image",
    video:
      "https://strapi-wasabi-bucket-prod-cdn.phot.ai/bg_blur_507cf3e2d4.mp4?isPopular=false",
    tool: PHOT_AI_TOOLS.BLUR_BACKGROUND,
  },
  {
    id: "IMAGE_LIGHT_FIX",
    name: "Image Light Fix",
    description: "Fix the lighting of an image",
    video:
      "https://strapi-wasabi-bucket-prod-cdn.phot.ai/image_light_fix_d45f9be810.mp4?isPopular=false",
    tool: PHOT_AI_TOOLS.IMAGE_LIGHT_FIX,
  },
];
