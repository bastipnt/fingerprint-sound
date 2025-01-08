import { FPAreas, FPCompareItem, FPStoreItem } from "./types";

class FPStore {
  comparisonMap = new Map<FPAreas, FPCompareItem[]>();

  saveFP(fingerprintMap: Map<FPAreas, FPStoreItem[]>) {
    this.compareFP(fingerprintMap);

    fingerprintMap.forEach((items, key) => {
      localStorage.setItem(key, JSON.stringify(items));
    });
  }

  clearFP() {
    localStorage.clear();
  }

  private compareFP(newFingerprintMap: Map<FPAreas, FPStoreItem[]>) {
    newFingerprintMap.forEach((newItems, key) => {
      const rawOldItems = localStorage.getItem(key);
      if (typeof rawOldItems !== "string") return;
      const oldItems = JSON.parse(rawOldItems) as FPStoreItem[];
      if (!Array.isArray(oldItems)) return;

      const remappedNewItems: FPCompareItem[] = newItems.map(
        ({ label, hash }) => ({
          label,
          newHash: hash,
          oldHash:
            oldItems.find((oldItem) => oldItem.label === label)?.hash || null,
        })
      );

      oldItems.forEach(({ label, hash }) => {
        if (
          remappedNewItems.findIndex(
            (remappedItem) => remappedItem.label === label
          ) !== -1
        )
          return;

        remappedNewItems.push({ label, oldHash: hash, newHash: null });
      });

      this.comparisonMap.set(key, remappedNewItems);
    });
  }

  get listOfNotSameKeys(): string[] | undefined {
    if (this.comparisonMap.size === 0) return;

    const differentKeys: string[] = [];

    this.comparisonMap.forEach((items, key) => {
      items.forEach(({ oldHash, newHash, label }) => {
        if (oldHash === newHash) return;

        differentKeys.push(`${key}.${label}`);
      });
    });

    return differentKeys;
  }

  get samenessRate(): number | undefined {
    if (this.comparisonMap.size === 0) return;

    let numOfSameHashes = 0;
    let numOfDifferentHashes = 0;

    this.comparisonMap.forEach((items) => {
      items.forEach(({ oldHash, newHash }) => {
        if (oldHash === newHash) numOfSameHashes += 1;
        else numOfDifferentHashes += 1;
      });
    });

    const totalNumOfHashes = numOfDifferentHashes + numOfSameHashes;

    return numOfSameHashes / totalNumOfHashes;
  }
}

export default FPStore;
