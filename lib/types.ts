/**
 * status In Progress进行中 Completed 完成
 *
 * @export
 * @enum {number}
 */
export enum InvateStatus {
  InProgress = "InProgress",
  Completed = "Completed",
}

/**
 * 用于定义url传参
 */
export type Others = {
  inviteCode: string | null;
};

export type TimeTemp = {
  start: number;
  end: number;
  val: number;
};
