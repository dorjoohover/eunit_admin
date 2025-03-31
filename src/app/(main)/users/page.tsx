import { UserTable } from "@/components/tables/users";
import { getUsers } from "@/services/user.service";
import { SearchParamsType } from "@/types";
import { FunctionComponent } from "react";
interface UserPageProps {
  searchParams: SearchParamsType;
}
const UsersPage: FunctionComponent<UserPageProps> = async ({
  searchParams,
}) => {
  const filter = await searchParams;

  const usersData = await getUsers({ ...filter });
  console.log(usersData);
  return (
    <>
      <UserTable
        users={usersData.data}
        totalPage={usersData.totalPage}
        currentPage={usersData.currentPage}
        total={usersData.total}
      />
    </>
  );
};

export default UsersPage;
