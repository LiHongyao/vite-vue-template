declare namespace API {
  interface List<T> {
    pages: number;
    count: number;
    current: number;
    data: T[];
  }
  
  /**********************
   ** 列表页
   **********************/
  type ListProps<T = any> = {
    page: number;
    data: T;
    type: "refresh" | "load";
    isRefreshing: boolean;
    isLoading: boolean;
    isFinished: boolean;
  };

  /**********************
   ** Aliyun OSS Configs
   **********************/
  type OSSConfigProps = {
    dir: string;
    expire: string;
    host: string;
    accessKeyId: string;
    policy: string;
    signature: string;
  };
  type OSSSTSConfigProps = {
    host: string;
    region: string;
    bucket: string;
    accessKeyId: string;
    accessKeySecret: string;
    stsToken: string;
  };

  /**********************
   ** Examples
   **********************/
  type RecordItemProps = {
    amount: number;
    paymentStatus: number /** 提现状态 (0：处理中 1：成功 2：失败) */;
    withdrawTime: string;
  };
  type FriendsItemProps = {
    avatar: string;
    nickName: string;
    activeStatus: number;
  };
  type TaskResponseProps = {
    signStatus: number;
    count: number;
    amount: number;
    videoCount: number;
    residueCount: number;
    videoSubTitle: string;
    inviteSubTitle: string;
    treasureSubTitle: string;
    treasureStatus: number;
  };
  type ListItemProps = {
    title: string;
    date: string;
    count: number;
    status: number;
    failMsg: string;
  };
}
