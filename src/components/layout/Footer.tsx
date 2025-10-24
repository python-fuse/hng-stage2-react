export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>&copy; 2025 Ticketly. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Built with ❤️ by{" "}
            <a
              href="http://ucodes.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ucodes
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
