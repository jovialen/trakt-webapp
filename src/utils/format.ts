export const formatCount = (n: number): string => {
  if (n < 1e3) {
    return n.toString()
  }

  // Suffixes for numbers, separated by 1e+3
  const SUFFIX = ['k', 'M', 'B']
  let threshold = 1e3

  for (let i = 0; i < SUFFIX.length; i += 1) {
    if (n >= threshold && n < threshold * 1e3) {
      return `${(n / threshold).toFixed(1)} ${SUFFIX[i]}`
    }

    threshold *= 1e3
  }

  // At this point, we give up
  return `${n}`
}
