import { rewardForSession } from "@/src/data/shopItems";
import type { GardenState, StudySession } from "@/src/types";

export function stardustForMinutes(minutes: number) {
  return Math.max(5, Math.round(minutes * 2.4));
}
export function completeSessionReward(
  session: StudySession,
  garden: GardenState,
) {
  const reward = rewardForSession(
    session.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0),
    session.plannedMinutes,
  );
  const earned = stardustForMinutes(
    session.actualMinutes || session.plannedMinutes,
  );
  if (session.demo) return { garden, reward, earned };
  const existing = garden.inventory.find((item) => item.rewardId === reward.id);
  const inventory = existing
    ? garden.inventory.map((item) =>
        item.rewardId === reward.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    : [
        ...garden.inventory,
        { rewardId: reward.id, quantity: 1, equipped: false },
      ];
  const stardust = garden.stardust + earned;
  const level =
    stardust >= 600
      ? 5
      : stardust >= 350
        ? 4
        : stardust >= 180
          ? 3
          : stardust >= 70
            ? 2
            : 1;
  return {
    garden: {
      ...garden,
      stardust,
      level,
      inventory,
      pendingRewardId: reward.id,
    },
    reward,
    earned,
  };
}

export function purchaseReward(
  garden: GardenState,
  rewardId: string,
  cost: number,
) {
  if (garden.stardust < cost) return garden;
  if (garden.inventory.some((item) => item.rewardId === rewardId))
    return garden;
  return {
    ...garden,
    stardust: garden.stardust - cost,
    inventory: [
      ...garden.inventory,
      { rewardId, quantity: 1, equipped: false },
    ],
  };
}
