import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Property Pulse v2',
  keywords: 'nextjs app, rental, property, real estate',
  description: 'find perfect property',
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
