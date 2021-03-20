import ProfileGallery from '../components/profile/ProfileGallery'
import ProfileFollowers from '../components/profile/ProfileFollowers'


export const sections = [
  {
    endpoint: 'gallery',
    label: 'Gallery',
    component: ProfileGallery,
    icon: 'fas fa-images',
  },
  {
    endpoint: 'followers',
    label: 'Followers',
    component: ProfileFollowers,
    icon: 'fas fa-users',
  },
]