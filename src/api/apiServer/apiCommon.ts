import request from "@/api/apiConfig";

export async function getJSSDKConfigs<T>(url: string) {
  return request<T>({
    url: "/api/common/jssdkConfigs",
    method: "POST",
    data: { url },
  });
}
