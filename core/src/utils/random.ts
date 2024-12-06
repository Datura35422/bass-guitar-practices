/** 获取随机 index */
export function getRandomIndex(arrLen: number) {
  return Math.floor(Math.random() * arrLen);
}

/** 生成随机结果 */
export function generateRandomResult(
  arr: (string | number)[],
  len: number,
  isUniq = false
) {
  const arrLen = arr.length;
  const resultSet = new Set<string | number>();
  const result = new Array(len).fill(arr[0]).map(() => {
    let randomIndex = getRandomIndex(arrLen);
    let item = arr[randomIndex];
    // 如果开启了生成唯一值
    while (resultSet.has(item) && isUniq) {
      randomIndex = getRandomIndex(arrLen);
      item = arr[randomIndex];
    }
    resultSet.add(item);
    return item;
  });
  return result;
}

/** 打乱数组 */
export function shuffleArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
