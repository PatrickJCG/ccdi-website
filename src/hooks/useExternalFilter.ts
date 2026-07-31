import { useEffect } from "react";
import type { BusinessUnit } from "../data/mockProducts";

const LEGACY_MAP: Record<string, BusinessUnit> = {
  "Poultry Facilities": "Poultry Farm Equipment",
  "Hatchery Construction": "Hatchery",
  "Feedmill Systems": "Feedmill",
  "Solar Energy Integration": "Solar Systems",
};

/**
 * Listens for custom "filter-species" / "filter-function" events dispatched
 * by other parts of the app (e.g., home-page quick links) and calls the
 * provided callback with the resolved BusinessUnit.
 */
export function useExternalFilter(onFilter: (bu: BusinessUnit) => void) {
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const spec = (e as CustomEvent<string>).detail;
      const bu: BusinessUnit = LEGACY_MAP[spec] ?? "Poultry Farm Equipment";
      onFilter(bu);
    };

    window.addEventListener("filter-species", handleFilter);
    window.addEventListener("filter-function", handleFilter);

    return () => {
      window.removeEventListener("filter-species", handleFilter);
      window.removeEventListener("filter-function", handleFilter);
    };
  }, [onFilter]);
}
