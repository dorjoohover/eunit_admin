import { getReportResult } from "@/services/report.service";
import { money } from "@/lib/constant";
import { dateFormatter, formatUnit } from "@/lib/utils";
import { DownloadPdfButton } from "./DownloadPdfButton";

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-muted-foreground font-light">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default async function ReportResultPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        id parameter байхгүй байна (жишээ нь ?id=4).
      </div>
    );
  }

  let data;
  try {
    data = await getReportResult(id);
  } catch {
    data = undefined;
  }

  if (!data?.service) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        №{id} лавлагаа олдсонгүй.
      </div>
    );
  }

  const { service, result } = data;
  const user = service.user;
  const location = service.location;
  const address = location
    ? [
        location.city,
        location.district,
        location.khoroo ? `${location.khoroo}-р хороо` : null,
        location.town,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  const total = (result?.result ?? 0) * (service.area ?? 0);

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-primary uppercase">Лавлагаа</h1>
          <p className="text-sm text-muted-foreground">
            Зах зээлийн үнэ цэний лавлагаа — №{id}
          </p>
        </div>
        {service.createdAt && (
          <p className="text-sm font-semibold">
            {dateFormatter(service.createdAt)}
          </p>
        )}
      </div>

      <section className="mb-8">
        <h2 className="font-semibold text-primary mb-3">Ерөнхий мэдээлэл</h2>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Row
            label="Овог нэр"
            value={
              [service.lastname ?? user?.lastname, service.firstname ?? user?.firstname]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          <Row label="Цахим хаяг" value={user?.email} />
          <Row label="Утасны дугаар" value={user?.phone} />
          <Row label="Талбай" value={service.area ? formatUnit(service.area, "м.кв") : undefined} />
        </div>
        <Row label="Байршил" value={address || undefined} />
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-primary mb-3">Тооцоолол</h2>
        <div className="space-y-2 text-sm">
          <p>
            Сонгосон хотхоны м.кв үнэ цэн:{" "}
            <span className="font-semibold text-blue">
              ₮{money(`${result?.min ?? 0}`)} - ₮{money(`${result?.max ?? 0}`)}
            </span>
          </p>
          <p>
            Сонгосон сууцны м.кв тохиромжит үнэ:{" "}
            <span className="font-semibold">₮{money(`${result?.result ?? 0}`)}</span>
          </p>
          <p>
            Нийт үнэ ({service.area ?? 0} м.кв):{" "}
            <span className="font-semibold">₮{money(`${total}`)}</span>
          </p>
        </div>
      </section>

      <div className="flex justify-center border-t pt-6">
        <DownloadPdfButton id={id} />
      </div>
    </div>
  );
}
