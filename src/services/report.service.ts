import { apiService } from "./api.service";
import { UserType } from "@/types";

export type ReportLocationType = {
  city?: string;
  district?: string;
  khoroo?: string;
  town?: string;
  lat?: number;
  lng?: number;
};

export type ReportResultType = {
  service: {
    min?: number;
    max?: number;
    avg?: number;
    area?: number;
    createdAt?: string;
    no?: string;
    floor?: number;
    room?: number;
    usage?: number;
    lastname?: string;
    firstname?: string;
    user?: UserType;
    location?: ReportLocationType;
    result?: number;
  };
  result: {
    min?: number;
    max?: number;
    result?: number;
  };
};

// core: GET /request/service/:id (RequestController.findOne) —
// admin эрхтэй хэрэглэгч бол өмчлөгчөөс үл хамааран ямар ч request-ийг
// харах боломжтой (core-ийн role шалгалт "role != Admin && id != owner"
// тул role=10 үед автоматаар нэвтэрнэ).
//
// apiService.getOne-ийн бодит runtime хариу нь core-ийн
// { succeed, payload }-ийн payload-ийг шууд буцаадаг (processResponse
// дотор эрт "return" хийдэг тул баримталсан ApiResponseType<T> төрөл
// буруу — res.data гэж хандвал undefined гарна), тул шууд T гэж үзнэ.
export async function getReportResult(id: string) {
  const res = (await apiService.getOne<ReportResultType>("request/service", {
    id,
  })) as unknown as ReportResultType;
  return res;
}
