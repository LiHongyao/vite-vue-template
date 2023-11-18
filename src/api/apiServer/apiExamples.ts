import request from "@/api/apiConfig";

export async function records(data: { current: number; pageSize: number }) {
  return request<API.List<API.RecordItemProps>>({
    url: "/api/examples/records",
    method: "POST",
    data,
  });
}

export async function friends(data: {
  current: number;
  pageSize: number;
  queryFriendType: number /** 查询好友的类型 1, 直邀 2, 间接 */;
}) {
  return request<API.List<API.FriendsItemProps>>({
    url: "/api/examples/queryFriends",
    method: "POST",
    data,
  });
}

export async function task() {
  return request<API.TaskResponseProps>({
    url: "/api/examples/task",
    method: "POST",
  });
}

export async function goldCoins(data: { current: number; pageSize: number }) {
  return request<API.List<API.ListItemProps>>({
    url: "/api/examples/goldCoins",
    method: "POST",
    data,
  });
}
