import Layout from "../components/layout/Layout";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8">Ticketly Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Total Tickets</h3>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Open Tickets</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Resolved Tickets</h3>
              <p className="text-3xl font-bold text-gray-600">0</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
