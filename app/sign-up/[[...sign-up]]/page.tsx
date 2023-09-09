import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-4">
      <div
        className="relative rounded-[10px]"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50"
          style={{
            pointerEvents: "none",
            filter: "blur(4px)",
            borderRadius: "10px",
          }}
        ></div>
        <div className="relative z-10">
          <SignUp redirectUrl={"/sign-in"} />
        </div>
      </div>
    </div>
  );
}
