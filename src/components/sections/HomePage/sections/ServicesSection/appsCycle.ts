export type AppsStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export const APPS_STEP_MS = 500
export const APPS_HOLD_MS = 2000

export function nextAppsStage(stage: AppsStage): AppsStage {
  return stage === 14 ? 10 : ((stage + 1) as AppsStage)
}

export function appsStageDelay(stage: AppsStage): number {
  return stage === 10 || stage === 14 ? APPS_HOLD_MS : APPS_STEP_MS
}
