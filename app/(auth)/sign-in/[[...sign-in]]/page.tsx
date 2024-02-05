import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="justify-center items-center flex mx-auto">
      <SignIn />
    </div>
  );
}