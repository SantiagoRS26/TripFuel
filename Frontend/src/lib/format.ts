export function formatCOP(value: number): string {
  const rounded = Math.round(value);
  return `$${rounded.toLocaleString("es-CO")}`;
}
