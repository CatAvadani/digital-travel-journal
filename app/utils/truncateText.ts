export default function truncateText(
  value: string | null | undefined,
  maxLength: number = 100
): string {
  if (!value) {
    return '';
  }
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}
