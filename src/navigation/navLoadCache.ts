import type { NavTreeItem } from './types';

const resultCache = new Map<string, readonly NavTreeItem[]>();
const inflightCache = new Map<string, Promise<readonly NavTreeItem[]>>();

export function navLoadCacheKey(source: string, maxDepth?: number): string {
  return `${source}::${maxDepth ?? 'default'}`;
}

export function readCachedNavItems(key: string): readonly NavTreeItem[] | undefined {
  return resultCache.get(key);
}

export function cacheNavItems(key: string, items: readonly NavTreeItem[]): void {
  resultCache.set(key, items);
}

export function runCachedNavLoad(
  key: string,
  load: () => Promise<readonly NavTreeItem[]>
): Promise<readonly NavTreeItem[]> {
  const cached = resultCache.get(key);
  if (cached) return Promise.resolve(cached);

  let inflight = inflightCache.get(key);
  if (!inflight) {
    inflight = load().then((items) => {
      resultCache.set(key, items);
      return items;
    }).finally(() => {
      inflightCache.delete(key);
    });
    inflightCache.set(key, inflight);
  }
  return inflight;
}
