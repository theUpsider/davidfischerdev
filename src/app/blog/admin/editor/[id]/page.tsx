import { notFound } from 'next/navigation'
import { requireAuth } from '@/app/actions/authActions'
import { getPostById } from '@/app/actions/blogActions'
import { PostEditorClient } from '@/components/Blog/PostEditorClient'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export const metadata = {
  title: 'Edit Post | Admin'
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  await requireAuth()

  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <PostEditorClient post={post} />
}
