import {createMoment} from "./helpers";

/**
 * Create moment plugin
 * @return {{install(): void}}
 */
export function createCoreMoment() {
  return createMoment();
}
