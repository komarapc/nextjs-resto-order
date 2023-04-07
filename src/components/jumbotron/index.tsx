export default function Jumbotron({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "orange" | "emerald" | "red";
}) {
  if (variant === "orange") {
    return (
      <>
        <div className="w-full h-80 bg-orange-500">
          <div className="container h-full mx-auto flex flex-col justify-center p-5 md:p-0 gap-5">
            {children}
          </div>
        </div>
      </>
    );
  }

  if (variant === "red") {
    <>
      <div className="w-full h-80 bg-red-500">
        <div className="container h-full mx-auto flex flex-col justify-center p-5 md:p-0 gap-5">
          {children}
        </div>
      </div>
    </>;
  }

  if (variant === "emerald") {
    <>
      <div className="w-full h-80 bg-emerald-500">
        <div className="container h-full mx-auto flex flex-col justify-center p-5 md:p-0 gap-5">
          {children}
        </div>
      </div>
    </>;
  }
  return (
    <>
      <div className="w-full h-80 bg-emerald-500">
        <div className="container h-full mx-auto flex flex-col justify-center p-5 md:p-0 gap-5">
          {children}
        </div>
      </div>
    </>
  );
}

export function JumbotronTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-6xl font-light text-white">{children}</h1>
    </>
  );
}

export function JumbotronSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="text-2xl font-light text-white">{children}</p>
    </>
  );
}
