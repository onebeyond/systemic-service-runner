import { Systemic } from 'systemic'

type Runner<T extends Record<string, unknown>> = {
  start: (callback: (error: Error | undefined, components: T) => void) => void
  stop: () => void
}

/**
 * Starts a Systemic system
 * @param system The system to start
 * @param options Runner options (see documentation)
 */
declare function runner<T extends Record<string, unknown>>(
  system: Systemic<T>,
  options?: { restart?: { window: string }; logger?: any },
): Runner<T>

export default runner
