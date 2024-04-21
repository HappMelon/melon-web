"use server";

import prisma from "@/lib/prisma";
import { generateInviteCode } from "../utils";
import { InvateStatus } from "../types";
const MAX_RETRIES = 10; // 设置最大重试次数
/**
 * 第一次使用，邀请码创建
 *
 * @export
 * @param {string} userId 用户id
 */
export async function createInviteCode(userId: string) {
  let inviteCode = "";
  for (let i = 0; i < MAX_RETRIES; i++) {
    inviteCode = generateInviteCode();
    try {
      await prisma.inviteCode.create({
        data: {
          userId: userId,
          code: inviteCode,
        },
      });
      return inviteCode;
    } catch (error: any) {
      if (error.code === "P2002" && error.meta.target.includes("userId")) {
        continue;
      }
      throw error;
    }
  }
}
/**
 * 邀请时获取邀请码，也可以获取用户时关联出来
 *
 * @export
 * @param {string} userId 用户id
 * @return {*}
 */
export async function getInviteCodeByUserId(userId: string) {
  return await prisma.inviteCode.findFirst({
    where: {
      userId,
    },
  });
}
/**
 * 被邀请时，根据邀请码找人
 *
 * @export
 * @param {string} code 邀请码
 * @return {*}
 */
export async function getInviteCodeByCode(code: string) {
  const inviteCode = await prisma.inviteCode.findFirst({
    where: {
      code: code,
    },
  });

  if (inviteCode) {
    return inviteCode.userId;
  } else {
    return null;
  }
}
/**
 * 创建新的邀请记录
 *
 * @export
 * @param {string} inviterId 邀请人
 * @param {string} inviteeId 被邀请人
 * @param {number} inviterReward 邀请人获取奖励数
 * @param {number} inviteeReward 被邀请人获取奖励数
 */
export async function createInvitation(
  inviterId: string,
  inviteeId: string,
  inviterReward: number = 0,
  inviteeReward: number = 0,
) {
  return await prisma.invitation.create({
    data: {
      inviterId: inviterId,
      inviteeId: inviteeId,
      status: InvateStatus.InProgress,
      inviterReward: inviterReward,
      inviteeReward: inviteeReward,
      inviterRewardIssued: false,
      inviteeRewardIssued: false,
    },
  });
}

export async function updateInvitation(id: string, status: InvateStatus) {
  await prisma.invitation.update({
    where: {
      id: id,
    },
    data: {
      status: status,
      inviterRewardIssued: true,
      inviteeRewardIssued: true,
    },
  });
}

export async function inviteLeaderboards() {
  return await prisma.invitation.groupBy({
    by: ["inviterId"],
    where: {
      status: InvateStatus.Completed,
    },
    _sum: {
      inviterReward: true,
    },
    orderBy: {
      _sum: {
        inviterReward: "desc",
      },
    },
    take: 20,
  });
}

export async function getUserNamesAndImages(userIds: string[]) {
  return await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
}

export async function getInvitationByInvitee(inviteeId: string) {
  return await prisma.invitation.findFirst({
    where: {
      inviteeId: inviteeId,
      status: InvateStatus.InProgress,
    },
  });
}

export async function getInvitation(id: string) {
  return await prisma.invitation.findUnique({
    where: {
      id: id,
    },
  });
}

/**
 * 获取系统配置
 *
 * @export
 * @return {*}
 */
export async function getAppConfig() {
  return await prisma.appConfig.findFirst();
}

/**
 *使用事务 悲观锁并发处理积分
 *
 * @export
 * @param {string} userId
 * @return {*}
 */
export async function updateUserPoints(
  inviterUserId: string,
  inviterReward: number,
  inviteeUserId: string,
  inviteeReward: number,
) {
  return await prisma.$transaction(async (prisma) => {
    // 邀请人积分更新
    let inviterUserPoints = await prisma.point.findUnique({
      where: { userId: inviterUserId },
    });
    if (!inviterUserPoints) {
      inviterUserPoints = await prisma.point.create({
        data: { userId: inviterUserId, points: inviterReward },
      });
    } else {
      inviterUserPoints = await prisma.point.update({
        where: { userId: inviterUserId },
        data: { points: { increment: inviterReward } },
      });
    }
    // 被邀请人积分更新
    let inviteeUserPoints = await prisma.point.findUnique({
      where: { userId: inviteeUserId },
    });
    if (!inviteeUserPoints) {
      inviteeUserPoints = await prisma.point.create({
        data: { userId: inviteeUserId, points: inviteeReward },
      });
    } else {
      inviteeUserPoints = await prisma.point.update({
        where: { userId: inviteeUserId },
        data: { points: { increment: inviteeReward } },
      });
    }
    return [inviterUserPoints, inviteeUserPoints];
  });
}

export async function getPointsByUserId(userId: string) {
  return prisma.point.findUnique({ where: { userId } });
}

export async function updatePointsByUserId(userId: string, points: number) {
  await prisma.point.update({
    where: { userId: userId },
    data: { points: { decrement: points } },
  });
}
