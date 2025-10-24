import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Footer from "../components/layout/Footer";
import WaveBackground from "../components/ui/WaveBackground";
import DecorativeCircle from "../components/ui/DecorativeCircle";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section - Full width background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ticketly
              <span className="text-blue-600 block text-2xl md:text-3xl">
                Ticket Management Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 mx-auto max-w-3xl">
              Streamline your workflow with our powerful, intuitive ticket
              management system. Track, organize, and resolve issues
              efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Link to="/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <DecorativeCircle
          size="lg"
          color="bg-blue-400"
          opacity={0.1}
          className="top-20 -right-32"
        />
        <DecorativeCircle
          size="md"
          color="bg-indigo-400"
          opacity={0.15}
          className="bottom-40 -left-24"
        />

        {/* Wave Background */}
        <WaveBackground color="#3B82F6" />
      </section>

      {/* Features Section - Full width background */}
      <section className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Simple, powerful, and designed for modern teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Easy Tracking
                </h3>
                <p className="text-gray-600">
                  Keep track of all your tickets in one place. Update status,
                  add notes, and monitor progress effortlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Built for speed and efficiency. Create, edit, and manage
                  tickets with just a few clicks.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Smart Analytics
                </h3>
                <p className="text-gray-600">
                  Get insights into your team's performance with comprehensive
                  dashboards and reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Full width background */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl max-w-5xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of teams already using our platform to manage
                their tickets efficiently.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/auth/signup">Start Free Today</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
