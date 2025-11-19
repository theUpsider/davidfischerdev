import { requireAuth } from '@/app/actions/authActions'
import { PostEditorClient } from '@/components/Blog/PostEditorClient'

export const metadata = {
  title: 'Create Post | Admin',
}

export default async function CreatePostPage() {
  await requireAuth()

  return <PostEditorClient />
}
