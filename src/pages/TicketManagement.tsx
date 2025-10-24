import Layout from "../components/layout/Layout";

export default function TicketManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8">Ticket Management</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">
              No tickets yet. Create your first ticket!
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
}
