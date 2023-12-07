export function generateRandomColor(): string {
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256,
  )}, ${Math.floor(Math.random() * 256)}, ${Math.random().toFixed(2)})`;
  return randomColor;
}
