import { MessageSquare, Lock, Users } from "lucide-react";

const AuthFeatures = () => {
  return (
   <div className="flex items-center justify-center bg-base-120 p-6 lg:p-12">
      <div className="max-w-md space-y-10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center">Why Join Us?</h2>

        {/* Features */}
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Real-time Chat</h3>
              <p className="text-base-content/60">
                Send and receive messages instantly with no delays.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Lock className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Secure Messaging</h3>
              <p className="text-base-content/60">
                Keep your conversations private with end-to-end encryption.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Grow Your Network</h3>
              <p className="text-base-content/60">
                Connect with people and build meaningful relationships.
              </p>
            </div>
          </li>
        </ul>

        {/* Community / Stats */}
        <div className="text-center pt-6 border-t border-base-300">
          <h3 className="text-xl font-bold">Join 10,000+ users</h3>
          <p className="text-base-content/60">Be part of our growing community 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default AuthFeatures;
