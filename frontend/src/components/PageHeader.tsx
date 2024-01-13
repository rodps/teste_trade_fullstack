export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <h1 className="mb-1">{title}</h1>
      <p className="text-600 mb-5">{subtitle}</p>
    </>
  );
}
