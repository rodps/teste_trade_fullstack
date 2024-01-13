export default function InputErrorHelper({ error }: { error: string }) {
  return <small className="text-red-500">{error}</small>;
}
