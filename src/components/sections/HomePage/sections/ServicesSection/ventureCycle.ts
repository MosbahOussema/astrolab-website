export type VentureStage = 1 | 2 | 3 | 4 | 5 | 6 | 7

export const VENTURE_STEP_MS = 500
export const VENTURE_FINAL_HOLD_MS = 3000

export function nextVentureStage(stage: VentureStage): VentureStage {
  return stage === 7 ? 2 : ((stage + 1) as VentureStage)
}

export function ventureStageDelay(stage: VentureStage): number {
  return stage === 7 ? VENTURE_FINAL_HOLD_MS : VENTURE_STEP_MS
}
