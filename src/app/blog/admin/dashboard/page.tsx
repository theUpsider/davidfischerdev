import { requireAuth } from '@/app/actions/authActions'
import { getAllPostsAdmin } from '@/app/actions/blogActions'
import { AdminDashboardClient } from '@/components/Blog/AdminDashboardClient'

export const metadata = {
  title: 'Admin Dashboard | Blog',
}

export default async function AdminDashboard() {
  await requireAuth()
  
  const posts = await getAllPostsAdmin()

  return <AdminDashboardClient posts={posts} />
}
