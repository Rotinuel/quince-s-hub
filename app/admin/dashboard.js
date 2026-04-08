import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminDashboard from './dashboard';

export default async function AdminPage() {
  return <AdminDashboard />;
}
