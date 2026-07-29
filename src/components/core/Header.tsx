import { logoutAction } from "@/app/actions/auth";

export const Header = () => {
  return (
    <div
      className="px-9 py-5 bg-white flex items-center justify-between"
      style={{
        boxShadow: "0px 4px 20px -10px #00000040",
      }}
    >
      <p className="text-primary/70 text-sm ">Өглөөний мэнд захиралаа!</p>
      <form action={logoutAction}>
        <button type="submit" className="text-sm text-primary/70 hover:text-primary underline">
          Гарах
        </button>
      </form>
    </div>
  );
};
