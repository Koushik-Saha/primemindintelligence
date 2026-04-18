// Composed section — re-exports each sub-section and provides a combined view.
// Import individual pieces when you want granular placement control,
// or import this file to drop all three together.

export { StatsBar }         from "./StatsBar";
export { TrustedBy }        from "./TrustedBy";
export { TechStack }        from "./TechStack";

import { StatsBar }  from "./StatsBar";
import { TrustedBy } from "./TrustedBy";
import { TechStack } from "./TechStack";

/**
 * Renders all three social-proof sub-sections in canonical order:
 * StatsBar → TrustedBy → TechStack
 */
export function SocialProofSection() {
  return (
    <>
      <StatsBar  />
      <TrustedBy />
      <TechStack />
    </>
  );
}
