import { mockInstagramFeedPosts } from '../../src/content/instagramFeed'

export function getMockInstagramFeed() {
  return {
    mode: 'mock' as const,
    posts: mockInstagramFeedPosts,
  }
}
