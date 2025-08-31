import { Zap, Smartphone, Globe } from "lucide-react";

const AuthHighlights = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Real-time chat updates with smooth performance.",
    },
    {
      icon: Smartphone,
      title: "Cross-Device Access",
      desc: "Use PingMe on mobile, tablet, or desktop easily.",
    },
    {
      icon: Globe,
      title: "Stay Connected",
      desc: "Chat anywhere in the world without limits.",
    },
  ];

  return (
    <>
      {/* Desktop (Right Side) */}
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-10">
        <div className="max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Welcome Back 👋</h2>
            <p className="text-base-content/60">
              Sign in to continue your conversations and stay connected with PingMe.
            </p>
          </div>

          <ul className="space-y-4">
            {features.map((f, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <f.icon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-base-content/60">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile (Below Form, compact layout) */}
      <div className="lg:hidden space-y-4 text-center mt-6">
        <h2 className="text-lg font-bold">Why PingMe?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-base-200"
            >
              <f.icon className="size-6 text-primary" />
              <h3 className="font-medium">{f.title}</h3>
              <p className="text-xs text-base-content/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthHighlights;
