import { useEffect } from "react";
import type { BusinessUnit } from "../data/mockProducts";

export const BU_MAP: Record<string, BusinessUnit> = {
  // Poultry
  "Poultry": "Poultry Farm Equipment",
  "Poultry Facilities": "Poultry Farm Equipment",
  "Poultry Farm Equipment": "Poultry Farm Equipment",
  "Bio-Secure Housing": "Poultry Farm Equipment",

  // Hatcheries
  "Hatcheries": "Hatchery",
  "Hatchery": "Hatchery",
  "Hatchery Construction": "Hatchery",
  "Incubation Systems": "Hatchery",

  // Feedmills
  "Feedmills": "Feedmill",
  "Feedmill": "Feedmill",
  "Feedmill Systems": "Feedmill",
  "Automated Batching": "Feedmill",

  // Solar
  "Solar": "Solar Systems",
  "Solar Energy": "Solar Systems",
  "Solar Systems": "Solar Systems",
  "Solar Energy Integration": "Solar Systems",
  "Clean PV Integration": "Solar Systems",
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
      const bu: BusinessUnit = BU_MAP[spec] ?? "Poultry Farm Equipment";
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

