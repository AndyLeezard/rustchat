// Generate a color from a "hash" of a string. Thanks, internet.
export function hashColor(str: string) {
  let hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }

  return `hsl(${hash % 360}, 100%, 70%)`
}
